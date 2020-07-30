const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tokenScheme = new Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    refreshToken: {
        type: String,
        required: true,
    }
});
const Token = mongoose.model("token", tokenScheme);
module.exports = Token;