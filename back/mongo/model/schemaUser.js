const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userScheme = new Schema({
    email: { type: String, required: true, unique: true},
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    photo:[
      {type:String}
    ],
    publicChannels: [{
        type: mongoose.Schema.Types.ObjectId,
        default: ''
    }],
    privateChannels: [{
        type: mongoose.Schema.Types.ObjectId,
        default: ''
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        default: ''
    }],
    applicationToAddFriend: [{
        type: mongoose.Schema.Types.ObjectId,
        default: ''
    }],
    applicationToDeleteFriend: [{
        type: mongoose.Schema.Types.ObjectId,
        default: ''
    }],
    avatarPhoto: {
        type: String,
        default: 'https://st3.depositphotos.com/6582994/14901/v/1600/depositphotos_149010267-stock-illustration-unknown-user-icon-in-trendy.jpg'
    },
    isFriend: {
        type: Boolean,
        default: false
    }
});
const User = mongoose.model("user", userScheme);
module.exports = User;
