const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');

//url prefix - /api

//signup
router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => db.User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
    }))
    .then(createdUser => res.json(createdUser))
    .catch(err => {
        console.log(`ERROR IN THE POST SIGNUP`, err)
        res.json({error: err})
    });
});

// login
router.post('/login', (req, res) => {
    res.json({ message: `LOGIN POST` })
});


module.exports = router;