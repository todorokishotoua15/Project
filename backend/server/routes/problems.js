var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate');
var passport = require('passport');
User = require('../models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const problemrouter = express.Router();
problemrouter.use(bodyParser.json());

problemrouter.route('/')
.get(authenticate.verifyUser, function(req,res,next) {
    var username = req.headers.username;
    User.findOne({username: username}).then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log(user);
        res.json(user.problems);
    }, (err) => next(err))
    .catch((err) => {
        console.log(err);
    })
});
problemrouter.route('/upd')
.post((req,res) => {

    User.findOne({username: req.body.username})
    .then((user) => {
        
        var temp = user.problems;
        for (var i = 0; i < req.body.problems.length; i++) {
            var found = false;
            var curr = req.body.problems[i];
            for (var j = 0; j < temp; j++) {
                if (temp[j].rating === curr.rating && temp[j].name === curr.name && temp[j].contest === curr.contest){
                    found = true;
                }
            }
            if (!found) temp.push(req.body.problems[i]);
        }
        user.problems = temp;
        console.log(temp);
        user.save().then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            console.log(user.problems);
            res.send(user);
        })
    })
})

module.exports = problemrouter;