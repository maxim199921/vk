const mongoose = require("mongoose");

const connectDb = function() {
    mongoose.connect("mongodb://localhost:27017/usersdb", { useNewUrlParser: true });
};

module.exports = connectDb;