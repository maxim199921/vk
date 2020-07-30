const Posts = require('../mongo/model/schemaPosts');
const mongoose = require("mongoose");


class PostsServices {
    async getAllPost() {
        return Posts.find();
    };

    async getOnePost(id) {
        return Posts.find({_id: id});
    };

    async getAllPostByIdUser(req,id) {
      return  Posts.aggregate([
        { $match:
            {
              'id_user': { $eq: mongoose.Types.ObjectId(req.params.id) }
            }
        },
        {
          $lookup:
            {
              from: "users",
              localField: "id_user",
              foreignField: "_id",
              as: "user"
            }
        },
        {$unwind: "$user"},
      ])
    };


    async deletePost(id) {
        return Posts.remove({_id: id});
    };

    async saveNewPost(req) {
        let posts = new Posts(req.body);
        return posts.save();
    };

    async updatePost(req) {
        return Posts.updateOne({_id: req.body._id}, req.body);
    };

    async addComment(req) {
        return Posts.updateOne({_id: req.body._id},
            {$push: {comments: req.body.comments}});
    };

    async deleteComment(req) {
        return Posts.updateOne({_id: req.query._id},
            {$pull: {comments: {_id: req.query.id_comment}}});
    };

    async addLike(req) {
        return Posts.updateOne({_id: req.body._id, likes: {$nin: [req.body.likes]}},
            {$push: {likes: req.body.likes}});
    };

    async deleteLike(req) {
        return Posts.updateOne({_id: req.query._id},
            {$pull: {likes: req.query.likes}});
    };
}

module.exports = new PostsServices();
