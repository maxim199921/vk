const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
const multer = require('multer');
const upload = multer({ dest: './tmp' });


router
    .get('/post', postController.getAllPost)
    .get('/post/:id', postController.getOnePost)
    .get('/allPost/:id/:page', postController.getAllPostByIdUser)
    .delete('/post/comment', postController.deleteComment)
    .delete('/post/like', postController.deletelike)
    .delete('/post/:id', postController.deletePost)
    .post('/post/avatar', upload.single("file"), function (req, res) {
    if (req.file) {
      postController.photoAvatar(req, res);
    } else res.status(406).send('error with data');
  })
    .post('/post', function (req, res) {
        if (req.body.id_user && req.body.content) {
            postController.saveNewPost(req, res);
        } else res.status(406).send('error with value');
    })
    .put('/post', function (req, res) {
        if (req.body.id_user && req.body.content) {
            postController.updatePost(req, res);
        } else res.status(406).send('error with value');
    })
    .put('/post/comment', function (req, res) {
        if (req.body._id && req.body.comments) {
            postController.addComment(req, res);
        } else res.status(406).send('error with value');
    })
    .put('/post/like', function (req, res) {
        if (req.body.likes) {
            postController.addLike(req, res);
        } else res.status(406).send('error with value');
    });


module.exports = router;
