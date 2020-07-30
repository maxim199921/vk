const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const multer = require('multer');
const upload = multer({ dest: './tmp' });

const checkEmail = /^\w+@\w+\.\w+$/;

router
    .get('/user', userController.getAllData)
    .get('/user/:id', userController.getOneData)
    .post('/initUser', userController.getInitUser)
    .post('/user/friends', userController.getFriendsByArray)
    .post('/user/applicationToAddFriend', userController.getapplicationToAddFriendByArray)
    .post('/uploadAvatars/:id', upload.single("file"), function (req, res) {
        if (req.file) {
            userController.uploadAvatars(req, res);
        } else res.status(406).send('error with data');
    })
  .post('/uploadPhoto/:id', upload.single("file"), function (req, res) {
    if (req.file) {
      userController.uploadPhoto(req, res);
    } else res.status(406).send('error with data');
  })
    .delete('/user/publicChannels', userController.deletePublicChannelsUser)
    .delete('/user/privateChannels', userController.deletePrivateChannelsUser)
    .delete('/user/friends', userController.deleteFriends)
    .delete('/user/applicationToAddFriend', userController.deleteApplicationToAddFriend)
    .delete('/user/:id', userController.deleteUser)
    .put('/user', function(req, res) {
        if (req.body.email&&req.body.firstName&&req.body.lastName&&req.body.password&&req.body.oldPassword&&
            req.body.age&&req.body.country&&checkEmail.test(req.body.email)) {
            userController.updateUser(req, res);
        } else res.status(406).send('error with value');
    })
    .put('/user/removePhoto',userController.removePhoto)
    .put('/user/publicChannels', function(req, res) {
        if (req.body.publicChannels) {
            userController.addPublicChannelsUser(req, res);
        } else res.status(406).send('error with value');
    })
    .put('/user/privateChannels', function(req, res) {
        if (req.body.privateChannels) {
            userController.addPrivateChannelsUser(req, res);
        } else res.status(406).send('error with value');
    })
    .put('/user/filter', function (req, res) {
        if (req.body._id&&req.body.value) {
            userController.getFilter(req, res)
         } else res.status(406).send('error with value');
    })
    .put('/user/friends', function(req, res) {
        if (req.body.friends) {
            userController.addfriends(req, res);
        } else res.status(406).send('error with value');
    })
    .put('/user/applicationToAddFriend', function(req, res) {
        if (req.body.applicationToAddFriend) {
            userController.addApplicationToAddFriend(req, res);
        } else res.status(406).send('error with value');
    });


module.exports = router;
