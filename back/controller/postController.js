const postsServices = require('../services/postsServices');
const fs = require("fs");


class PostController {
    getAllPost (req, res)  {
        postsServices.getAllPost()
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    getOnePost (req, res)  {
        postsServices.getOnePost(req.params.id)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    getAllPostByIdUser (req, res)  {
      console.log(req.params);
        postsServices.getAllPostByIdUser(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    deletePost (req, res)  {
        postsServices.deletePost(req.params.id)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    saveNewPost (req, res)  {
      console.log(req.body)
        postsServices.saveNewPost(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    updatePost (req, res)  {
        postsServices.updatePost(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
  photoAvatar (req, res)  {
    const newName = `${new Date().getTime()}${req.file.originalname}`;
    fs.readFile(req.file.path, function (err, data) {
      fs.writeFile(`public/${newName}`, data, function (err) {
        if (err) {
          res.status(406).send('error with data')
        } else {
          res.json({
            url:`http://localhost:3000/${newName}`
          })
        }
      });
    });
  }
    addComment (req, res)  {
        postsServices.addComment(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    deleteComment (req, res)  {
        postsServices.deleteComment(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    addLike (req, res)  {
        postsServices.addLike(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    deletelike (req, res)  {
        postsServices.deleteLike(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
}

module.exports = new PostController();
