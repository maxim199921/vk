const userService = require('../services/userServices');
const UserDataReturn = require('../mongo/model/userModel/userDataReturn');
const jwt = require('jsonwebtoken');
const privateKey = 'hello';
const fs = require("fs");


class UserController {
//for auth
    checkEmail(req,res){
      userService.checkEmail(req)
        .then(result=>{
          res.json({
            isLoginAvailable:result
          })
        })
    }
    saveNewUser(req, res)  {
        userService.saveNewUser(req)
            .then(result => {
                if (result === 'error') {
                    res.status(409).send('the user is exists');
                }
                res.status(200).json(result)
            })
            .catch(error => res.status(error).send('error'))
    }
    loginUser(req, res)  {
        userService.loginUser(req)
            .then(result => {
                if (result === 'error') {
                    res.status(409).send('error with pass or email');
                }
                res.status(200).json(result)
            })
            .catch(error => res.status(error).send('error'))
    }
    refreshToken(req, res)  {
        jwt.verify(req.body.token, privateKey, (err) => {
            if(err) {
                res.status(403).send('refreshtoken die');
            }
            userService.refreshToken(req.body.token)
                .then(result=>{
                    if (result === 'error') {
                        res.status(403).send('error with refreshtoken');
                    }
                    res.status(200).json(result)
                })
                .catch(error => res.status(error).send('error'))
        });
    }
//for auth
// upload files
    uploadAvatars (req, res)  {
        const newName = `${new Date().getTime()}${req.file.originalname}`;
        fs.readFile(req.file.path, function (err, data) {
            fs.writeFile(`public/${newName}`, data, function (err) {
                if (err) {
                    res.status(406).send('error with data')
                } else {
                    userService.updateAvatar(req.params.id, `http://localhost:3000/${newName}`)
                        .then(result => {
                            res.status(200).json(`http://localhost:3000/${newName}`)
                        })
                        .catch(error => res.status(error).send('error'))
                    }
            });
        });
    }
  uploadPhoto (req, res)  {
    const newName = `${new Date().getTime()}${req.file.originalname}`;
    fs.readFile(req.file.path, function (err, data) {
      fs.writeFile(`public/${newName}`, data, function (err) {
        if (err) {
          res.status(406).send('error with data')
        } else {
          userService.addPhoto(req.params.id, `http://localhost:3000/${newName}`)
            .then(result => {
              res.status(200).json(`http://localhost:3000/${newName}`)
            })
            .catch(error => res.status(error).send('error'))
        }
      });
    });
  }
  removePhoto(req,res) {


      userService.removePhoto(req.body.id,req.body.image)
        .then(result=>{
          res.status(200).json(result)
        }).catch(error => res.status(error).send('error'))
  }


// upload files
//for main page
    getAllData (req, res)  {
        userService.getAllData()
            .then(result => res.send(result.map(element => new UserDataReturn(element))))
            .catch(error => res.status(error).send('error'))
    }
    getOneData (req, res)  {
        userService.getOneData(req.params.id)
            .then(result => res.send(result.map(element => new UserDataReturn(element))))
            .catch(error => res.status(error).send('error'))
    }
    getInitUser (req, res)  {
        userService.getInitUser(req.body.token)
            .then(result => {
                if (result === 'error') {
                    res.status(403).send('incorrect token');
                }
                res.status(200).send(result.map(element => new UserDataReturn(element)))
            })
            .catch(error => res.status(error).send('error'))
    }
    deleteUser (req, res)  {
        userService.deleteUser(req.params.id)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    updateUser (req, res)  {
        userService.updateUser(req)
            .then(result => {
                if (result === 'error') {
                    res.status(412).send('invalidPass');
                }
                res.status(200).send(result);
            })
            .catch(error => res.status(error).send('error'))
    }
//for main page
//for update and delete arraychannels
    addPublicChannelsUser (req, res)  {
        userService.addPublicChannelsUser(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    deletePublicChannelsUser (req, res)  {
        userService.deletePublicChannelsUser(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    addPrivateChannelsUser (req, res)  {
        userService.addPrivateChannelsUser(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    deletePrivateChannelsUser (req, res)  {
        userService.deletePrivateChannelsUser(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    getFriendsByArray (req, res)  {
        userService.getFriendsByArray(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    addfriends (req, res)  {
        userService.addfriends(req)
            .then(result => {
                if (result === 'error') {
                    res.status(413).send('error with body');
                }
                res.status(200).send(result)
            })
            .catch(error => res.status(error).send('error'))
    }
    deleteFriends (req, res)  {
        userService.deleteFriends(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    getapplicationToAddFriendByArray (req, res)  {
        userService.getapplicationToAddFriendByArray(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    addApplicationToAddFriend (req, res)  {
        userService.addApplicationToAddFriend(req)
            .then(result => {
                if (result === 'error') {
                    res.status(413).send('error with body');
                }
                res.status(200).send(result)
            })
            .catch(error => res.status(error).send('error'))
    }
    getFilter (req, res)  {
        userService.getFilter(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
    deleteApplicationToAddFriend (req, res)  {
        userService.deleteApplicationToAddFriend(req)
            .then(result => res.send(result))
            .catch(error => res.status(error).send('error'))
    }
//for update and delete arraychannels
}

module.exports = new UserController();
