const express = require('express');
const router = express.Router();
const conversationController = require('../controller/conversationController');

router
    .get('/conversation', conversationController.getAllConversation)
    .get('/conversation/:id', conversationController.getOneConversation)
    .delete('/conversation/member', conversationController.deleteMember)
    .delete('/conversation/messagesByAuthor', conversationController.deleteMessagesByAuthor)
    .delete('/conversation/messagesByIdMessage', conversationController.deleteMessagesByIdMessage)
    .delete('/conversation/:id', conversationController.deleteConversation)
    .post('/conversation', function (req, res) {
        if (req.body.members && req.body.messages) {
            conversationController.saveNewConversation(req, res);
        } else res.status(406).send('error with value');
    })
    .post('/conversation/getAll', conversationController.getConversationByArray)
    .post('/conversation/getAllByUserId', conversationController.getConversationByArrayAndUserId)
    .post('/conversation/createGroup' , conversationController.createGroup)
    .put('/conversation', function (req, res) {
        if (req.body.members && req.body.messages) {
            conversationController.updateConversation(req, res);
        } else res.status(406).send('error with value');
    })
    .put('/conversation/members', function (req, res) {
        if (req.body._id && req.body.members) {
            conversationController.updateMember(req, res);
        } else res.status(406).send('error with value');
    })
    .put('/conversation/messages', function (req, res) {
        if (req.body._id && req.body.messages) {
            conversationController.updateMessages(req, res);
        } else res.status(406).send('error with value');
    });


module.exports = router;
