const express = require('express');
const router = express.Router();
const db = require('../models');

//url prefix - /api

//signup
router.post('/signup', (req, res) => {
    db.User.create(req.body)
        .then(user => res.json(user))
        .catch(err => {
            console.log(`Error in the POST signup`, err);
            res.json({ 'error': err })
        })
});

// login
router.post('/login', (req, res) => {
    res.json({ message: `LOGIN POST` })
});


module.exports = router;