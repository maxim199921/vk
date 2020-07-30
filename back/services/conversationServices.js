const Conversation = require('../mongo/model/schemaConversetion');
const User = require('../mongo/model/schemaUser');
const UserModel = require('../mongo/model/userModel/userModel');
const mongoose = require("mongoose");

class ConversationServices {
    async getAllConversation() {
        return Conversation.find();
    };

    async getConversationByArray(req) {
        if (!req.body.allConversation) {
            return 'error with value';
        }
        if (req.body.allConversation.length >= 2) {
            const perPage = 6;
            let page = req.body.page || 1;
            return Conversation.find({_id: {$in: req.body.allConversation}})
                .skip((perPage * page) - perPage)
                .limit(perPage);
        }
        return Conversation.aggregate([
          { $match:
                  {
                      '_id': { $eq: mongoose.Types.ObjectId(req.body.allConversation[0]) }
                  }
          },
          { $unwind : "$messages" },
          {
            $lookup:
              {
                from: "users",
                localField: "messages.author",
                foreignField: "_id",
                as: "messages.user"
              }
          },
          {$unwind: "$messages.user"},
          {
            $project: {
              "members._id":1,
              "members.firstName":1,
              "members.lastName":1,
              "members.avatarPhoto":1,
              "members.id_user":1,
              "messages._id":1,
              "messages.author":1,
              "messages.body":1,
              "messages.user._id": 1,
              "messages.user.firstName": 1,
              "messages.user.lastName": 1,
              "messages.user.avatarPhoto": 1,
              "messages.date": 1,
            }
          },
          {
            $group :{
              _id:"$_id",
              members:{$first : "$members"},
              messages:{$push : "$messages"}
            }
          }
        ])
    };

    async getConversationByArrayAndUserId(req) {
        if (!req.body.allConversation || !req.body.id_user) {
            return 'error with value';
        }
        const conversation = await Conversation.find({
            _id: {$in: req.body.allConversation.privateChannels},
            'members.id_user': req.body.id_user._id
        });
        const users = await User.find({_id: {$in: [req.body.allConversation._id, req.body.id_user._id]}})
            .then(result => result.map(element => new UserModel(element)));
        if (conversation.length === 0) {
            const savedConversation = await new Conversation({members: users, messages: []}).save();
            await User.updateMany({_id: {$in: [req.body.allConversation._id, req.body.id_user._id]}},
                {$push: {privateChannels: savedConversation._id}}, {multi: true});
            return savedConversation;
        } else {
            await Conversation.updateOne({_id: conversation[0].id}, {members: users});
            return conversation[0];
        }
    };

    async createGroup(req) {
        if (req.body.arrayId.length <= 1) {
            return 'error with value'
        }
        const users = await User.find({_id: {$in: req.body.arrayId}}).then(users => users.map(user => new UserModel(user)));
        const idUsers = users.map(item => {
            return item.id_user;
        });
        const createdConversation = await new Conversation({members: users, messages: [] , name : req.body.name}).save();
        await User.updateMany({_id: {$in: idUsers}}, {$push: {publicChannels: createdConversation._id}}, {multi: true});
        return createdConversation._id;
    }

    async getOneConversation(id) {
        return Conversation.find({_id: id});
    };

    async deleteConversation(id) {
        return Conversation.remove({_id: id});
    };

    async saveNewConversation(req) {
        let conversation = new Conversation(req.body);
        return conversation.save();
    };

    async updateConversation(req) {
        return Conversation.updateOne({_id: req.body._id}, req.body);
    };

    async updateMember(req) {
        return Conversation.updateOne({_id: req.body._id, members: {$nin: [req.body.members]}},
            {$push: {members: req.body.members}}
        );
    };

    async deleteMember(req) {
        return Conversation.updateOne({_id: req.query._id},
            {$pull: {members: req.query.members}});
    };

    async updateMessages(req) {
        return Conversation.updateOne({_id: req.body._id},
            {$push: {messages: req.body.messages}}
        );
    };

    async updateMessagesForSocket(data) {
        await Conversation.updateOne({_id: data._id},
            {$push: {messages: data.messages}}
        );
    };

    async deleteMessagesByAuthor(req) {
        return Conversation.updateOne({_id: req.query._id},
            {$pull: {messages: {author: req.query.author}}});
    };

    async deleteMessagesByIdMessage(req) {
        return Conversation.updateOne({_id: req.query._id},
            {$pull: {messages: {_id: req.query.message_id}}});
    };
}

module.exports = new ConversationServices();
