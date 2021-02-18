const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const {createUserToken} = require('../middleware/auth');

//url prefix - /api

//signup
router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => db.User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
    }))
    .then(createdUser => res.json({ 
        token: createUserToken(req, createdUser),
        user: createdUser
     }))
    .catch(err => {
        console.log(`ERROR IN THE POST SIGNUP`, err)
        res.json({error: err})
    });
});

// login POST /api/login
router.post('/login', (req, res) => {
    //if login details are correct (req.body)
    db.User.findOne({ email: req.body.email })
    .then(user => {
        //create and send a token via createUserToken
        res.json({
            token: createUserToken(req, user),
            user: user
        });
    }).catch(err => {
        //send an error
        console.log('ERROR IN THE POST LOGIN ROUTE', err);
        res.json({
            error: err.message
        });
    });
});


module.exports = router;