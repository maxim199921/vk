const refreshTokenServices = require('../services/refreshTokenServices');


class UserController {
    getAllData (req, res)  {
        refreshTokenServices.getAllData()
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    getOneData (req, res)  {
        refreshTokenServices.getOneData(req.params.id)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    deleteUser (req, res)  {
        refreshTokenServices.deleteUser(req.params.id)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    saveNewUser (req, res)  {
        refreshTokenServices.saveNewUser(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    updateUser (req, res)  {
        refreshTokenServices.updateUser(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
}

module.exports = new UserController();