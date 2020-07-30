const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postScheme = new Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    content: {
        type: String,
        default: '',
    },
    postPhoto: {
        type: String,
        default: '',
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    comments: [{
        id_user_comment: {
            type: mongoose.Schema.Types.ObjectId,
        },
        comment: {
            type: String,
        },
        firstName:{
          type:String
        },
        lastName:{
          type:String
        },
        avatarPhoto: {
        type: String,
        },
        date:{
          type: String,
        }

    }],
    date: {
      type:Date,
    },
});
const Post = mongoose.model("post", postScheme);
module.exports = Post;
