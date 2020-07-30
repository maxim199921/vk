const RefreshToken = require('../mongo/model/schemaRefreshToken');


class RefreshTokenServices {
    async getAllData() {
        return RefreshToken.find();
    };
    async getOneData(id) {
        return RefreshToken.find({_id: id});
    };
    async deleteUser(id) {
        return RefreshToken.remove({_id: id});
    };
    async saveNewUser(req) {
        let refreshToken = new RefreshToken(req.body);
        return refreshToken.save();
    };
    async updateUser(req) {
        return RefreshToken.updateOne({_id: req.body._id}, req.body);
    };
}

module.exports = new RefreshTokenServices();