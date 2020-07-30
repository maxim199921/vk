const jwt = require('jsonwebtoken');
const privateKey = 'hello';

class HelperServices {

    generateTokens(id) {
        const token = jwt.sign({ foo: 'bar' }, privateKey, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ foo: 'bar', id_user: id},
            privateKey, { expiresIn: '2d' });
        return {
            token: token,
            refreshToken: refreshToken
        };
    }

    generateDataRefreshToken(id, refreshToken) {
        return {
            id_user: id,
            refreshToken: refreshToken
        };
    }

    generateReturnTokentsData(tokens, data) {
        return {
            returnTokens: tokens,
            data: data
        };
    }
}

module.exports = new HelperServices();