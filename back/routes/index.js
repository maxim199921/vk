const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const refreshTokenController = require('../controller/refreshTokenController');

router.get('/', function(req, res) {
  res.send('render index page');
});

router
    .post('/refreshtoken',function(req, res) {
        if (req.body.token) {
            userController.refreshToken(req, res);
        } else res.status(403).send('error with value');
    });

router
    .post('/auth', function(req, res) {
      if (req.body.email&&req.body.password) {
        userController.loginUser(req, res);
      } else res.status(406).send('error with value');
    })
  .post('/checkEmail' , userController.checkEmail)
    .post('/registration', function(req, res) {
      if (req.body.email&&req.body.firstName&&req.body.lastName&&
          req.body.password&&req.body.age&&req.body.country) {
        userController.saveNewUser(req, res);
      } else res.status(406).send('error with value');
    });

router
    .get('/token', refreshTokenController.getAllData)
    .get('/token/:id', refreshTokenController.getOneData)
    .delete('/token/:id', refreshTokenController.deleteUser)
    .post('/token', function(req, res) {
      if (req.body.id_user&&req.body.refreshToken) {
        refreshTokenController.saveNewUser(req, res);
      } else res.status(406).send('error with value');
    })
    .put('/token', function(req, res) {
      if (req.body.id_user&&req.body.refreshToken) {
        refreshTokenController.updateUser(req, res);
      } else res.status(406).send('error with value');
    });

module.exports = router;
