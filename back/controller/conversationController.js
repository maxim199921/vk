const conversationServices = require('../services/conversationServices');

class ConversationController {
    getAllConversation(req, res) {
        conversationServices.getAllConversation()
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }

    getConversationByArray (req, res)  {
        conversationServices.getConversationByArray(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }

    getConversationByArrayAndUserId (req, res)  {
        conversationServices.getConversationByArrayAndUserId(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }

    getOneConversation(req, res) {
        conversationServices.getOneConversation(req.params.id)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }

    deleteConversation(req, res) {
        conversationServices.deleteConversation(req.params.id)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }

    saveNewConversation(req, res) {
        conversationServices.saveNewConversation(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    createGroup(req, res) {
         conversationServices.createGroup(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }

    updateConversation(req, res) {
        conversationServices.updateConversation(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }

    updateConversation(req, res) {
        conversationServices.updateConversation(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }

    updateMember(req, res) {
        conversationServices.updateMember(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }

    deleteMember(req, res) {
        conversationServices.deleteMember(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }

    updateMessages(req, res) {
        conversationServices.updateMessages(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }

    deleteMessagesByAuthor(req, res) {
        conversationServices.deleteMessagesByAuthor(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }

    deleteMessagesByIdMessage(req, res) {
        conversationServices.deleteMessagesByIdMessage(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
}

module.exports = new ConversationController();
