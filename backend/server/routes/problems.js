var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate');
var passport = require('passport');
User = require('../models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

router.get('/', authenticate.verifyUser, function(req,res,next) {
    var username = req.headers.username;
    User.findOne({username: username}).then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user.problems);
    }, (err) => next(err))
    .catch((err) => {
        next(err);
    })
})

module.exports = router;