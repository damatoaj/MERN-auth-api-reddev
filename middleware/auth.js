//require passport
require('dotenv').config();
const db = require('../models');
const passport = require('passport');
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//construct the strategy JWT
const options = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};
const findUser = (jwt_payload, done) => {
    db.User.findById(jwt_payload.id)
    .then(user => done(null, user))
    .catch(done)
};

const strategy = new Strategy(options, findUser);

//register the strategy so passport uses it when we call `passport.authenticate()` in our routes

//initialize passport