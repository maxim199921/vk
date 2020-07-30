const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const conversationScheme = new Schema({
    members: [{
        id_user : {
         type: mongoose.Schema.Types.ObjectId,
        },
        firstName:{
          type:String,
        },
        lastName:{
          type:String
        },
        avatarPhoto:{
          type:String
        }
    }],
    messages: [{
        author: {
            type: mongoose.Schema.Types.ObjectId,
        },
      body: {
          type: String,
        },
      date:{
          type:Date,
        },
    }],
    name:{
      type:String
    },
    photoGroup:{
      type:String,
      default: 'https://st3.depositphotos.com/6582994/14901/v/1600/depositphotos_149010267-stock-illustration-unknown-user-icon-in-trendy.jpg'

    }
});
const Conversation = mongoose.model("conversation", conversationScheme);
module.exports = Conversation;
