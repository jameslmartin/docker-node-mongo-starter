var express = require('express');
var router = express.Router();

var userController = require('../controllers/User.js');

// routes POST to the save function
router.post('/', function(req, res, next) {
    var userInfo = req.body;
    userController.save(userInfo, req.db)
      .then(function(userId) {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 201;
          res.end(JSON.stringify({id: userId}));
      })
      .catch(function(err) {
          console.log('Error creating new user');
          console.log(err);
          res.statusCode = 500;
          res.send(err);
      });
});

// routes GET to the find by ID function
router.get('/:id', function(req, res, next) {
    var userId = req.params.id;
    // use name to find database record
    userController.findById(userId, req.db)
    .then(function(userInfo) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(userInfo));
    })
    .catch(function(err) {
        console.log('Error getting user by id');
        console.log(err);
        res.statusCode = 500;
        res.send(err);
    });
});

module.exports = router;
