const UserServices = require('../mongo/model/schemaUser');
const RefreshToken = require('../mongo/model/schemaRefreshToken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = 'hello';
const fs = require('fs')
const helperServices = require('./helperServices');


class AuthServices {
//for auth
    async checkEmail(req){
      const authData = await await UserServices.findOne({email: req.body.email});
      if(authData){
        return false
      }else{
        return true
      }

    }
    async saveNewUser(req) {
        const authData = await UserServices.findOne({email: req.body.email});
        if (!authData) {
            req.body.password = await bcrypt.hash(req.body.password, 5);
            const user = new UserServices(req.body);
            return user.save();
        } else {
            return 'error';
        }
    };
    async loginUser(req) {
        const authData = await UserServices.find({email: req.body.email});
        if (!authData.length) {return 'error';}
        const check = await bcrypt.compare(req.body.password, authData[0].password);
        if(check /*проверка на корректность пароля и нэйма*/){
            const returnTokens = helperServices.generateTokens(authData[0]._id);
            const dataRefreshToken = helperServices.generateDataRefreshToken(authData[0]._id, returnTokens.refreshToken);
            const data = new RefreshToken(dataRefreshToken);
            const checkUserRegistration = await RefreshToken.findOne({id_user: authData[0]._id});
            if (checkUserRegistration/*если айдишник юзера с токеном есть в базе перезаписать*/) {
                data._id = checkUserRegistration._id;
                const success = await RefreshToken.updateOne({_id: data._id}, data);
                if (success){
                    delete authData.password;
                    return helperServices.generateReturnTokentsData(returnTokens, authData);
                }
            } else {
                const success = await data.save();
                if (success){
                    delete authData.password;
                    return helperServices.generateReturnTokentsData(returnTokens, authData);
                }
            }
        } else {
            return 'error';
        }
    };
    async refreshToken(req) {
        const decoded = await jwt.decode(req, {complete: true});
        if (!decoded) {return 'error';}
        const returnTokens = helperServices.generateTokens(decoded.payload.id_user);
        const dataRefreshToken = helperServices.generateDataRefreshToken(decoded.payload.id_user, returnTokens.refreshToken);
        const success = await RefreshToken.updateOne({id_user: decoded.payload.id_user}, dataRefreshToken);
        if (success){return returnTokens;}
    };
//for auth
//for upload file
    async updateAvatar(id, url) {
        return UserServices.updateOne({_id: id}, {avatarPhoto: url});
    };
  async addPhoto(id, url) {
    return UserServices.updateOne({_id: id}, {$push:{photo:url}});
  };
  async removePhoto(id, url) {
    const clen = url.split('/')[3];
    const curPath = './public' + "/" + clen;
      fs.unlink(curPath, err => {
        if (err) {
          throw Error
        }
      });

    return UserServices.updateOne({
        _id: id
      },
      {
        $pull: {photo: url}
      });

  }
//for upload file
    async getAllData() {
        return UserServices.find();
    };
    async getOneData(id) {
        return UserServices.find({_id: id});
    };
    async getInitUser(req) {
        if (!req) {
            return 'error';
        }
        const decoded = await jwt.decode(req, {complete: true});
        if (!decoded) {
            return 'error';
        }
        return UserServices.find({_id: decoded.payload.id_user});
    };
    async deleteUser(id) {
        return UserServices.remove({_id: id});
    };
    async updateUser(req) {
        const authData = await UserServices.findOne({email: req.body.email});
        const check = await bcrypt.compare(req.body.oldPassword, authData.password);
        if(check){
            delete req.body.oldPassword;
            req.body.password = await bcrypt.hash(req.body.password, 5);
            return UserServices.updateOne({_id: req.body._id}, req.body);
        } else {
            return 'error';
        }
    };
    async getFilter(req) {
        const dataCurrentUser = await UserServices.findOne({_id: req.body._id});
        const perPage = 7;
        let page = req.body.page || 1;
        const allUser = await UserServices.find({
            $or: [
                {firstName: { $regex: `^${req.body.value}`, $options: 'i' }},
                {lastName: { $regex: `^${req.body.value}`, $options: 'i' }},
                {email: { $regex: `^${req.body.value}`, $options: 'i' }},
                {country: { $regex: `^${req.body.value}`, $options: 'i' }}
            ]
        })
        .skip((perPage * page) - perPage)
        .limit(perPage);
        const filterAllUserEnd = this.filterSearchFunc(allUser, req.body._id);
        return this.addField(filterAllUserEnd,dataCurrentUser.friends);
    };

    filterSearchFunc(arr, id) {
        return arr.filter(item=>{
            if(`${item._id}` !== `${id}`){
                return item;
            }
        });
    };
    addField( filterAllUserEnd, friends){
        let x = [...filterAllUserEnd];
        filterAllUserEnd.forEach((item, index)=>{
            friends.forEach(id=>{
                if (`${id}` === `${item._id}`){
                    x[index].isFriend = true;
                }
            })
        });
        return x;
    }
//for update and delete arraychannels
    async addPublicChannelsUser(req) {
        return UserServices.updateOne({
            _id: req.body._id, publicChannels: { $nin: [req.body.publicChannels] }},
            {$push: {publicChannels: req.body.publicChannels}
        });
    };
    async deletePublicChannelsUser(req) {
        return UserServices.updateOne({
            _id: req.query._id},
            {$pull: {publicChannels: req.query.publicChannels}
        });
    };
    async addPrivateChannelsUser(req) {
        return UserServices.updateOne({
            _id: req.body._id, privateChannels: { $nin: [req.body.privateChannels] }},
            {$push: {privateChannels: req.body.privateChannels}
        });
    };
    async deletePrivateChannelsUser(req) {
        return UserServices.updateOne({
            _id: req.query._id},
            {$pull: {privateChannels: req.query.privateChannels}
        });
    };
    async getFriendsByArray(req) {
      console.log(req.body)
        if (!req.body.allFriends) {return 'error'}
        const perPage = 7;
        let page = req.body.page || 1;
        return UserServices.find({_id: {$in: req.body.allFriends}}).skip((perPage * page) - perPage)
          .limit(perPage);
    };
    async addfriends(req) {
        const addFriendToUser = await UserServices.updateOne({
            _id: req.body._id, friends: { $nin: [req.body.friends] }},
            {$push: {friends: req.body.friends}
        });
        if (addFriendToUser) {
            return UserServices.updateOne({
                _id: req.body.friends, friends: { $nin: [req.body._id] }},
                {$push: {friends: req.body._id}
            });
        }
    };
    async deleteFriends(req) {
        const deleteFiend = await UserServices.updateOne({
            _id: req.query._id},
            {$pull: {friends: req.query.friends}
        });
        if (deleteFiend) {
            return UserServices.updateOne({
                _id: req.query.friends},
                {$pull: {friends: req.query._id}
            })
        }
    };
    async getapplicationToAddFriendByArray(req) {
        if (!req.body.applicationToAddFriend) {return 'error'}
      const perPage = 7;
      let page = req.body.page || 1;
        return UserServices.find({_id: {$in: req.body.applicationToAddFriend}}).skip((perPage * page) - perPage)
          .limit(perPage);;
    };
    async addApplicationToAddFriend(req) {
        return UserServices.updateOne({
            _id: req.body._id, applicationToAddFriend: { $nin: [req.body.applicationToAddFriend] }},
            {$push: {applicationToAddFriend: req.body.applicationToAddFriend}
        });
    };
    async deleteApplicationToAddFriend(req) {
        return UserServices.updateOne({
            _id: req.query._id},
            {$pull: {applicationToAddFriend: req.query.applicationToAddFriend}
        });
    };
//for update and delete arraychannels
}

module.exports = new AuthServices();
