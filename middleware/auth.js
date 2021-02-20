//require passport
require('dotenv').config();
const db = require('../models');
const passport = require('passport');
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//construct the strategy JWT
const options = {
    secretOrKey: process.env.JWT_SECRET ,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};
const findUser = (jwt_payload, done) => {
    db.User.findById(jwt_payload.id)
    .then(user => done(null, user))
    .catch(done)
};

const strategy = new Strategy(options, findUser);

//register the strategy so passport uses it when we call `passport.authenticate()` in our routes
passport.use(strategy);

//initialize passport
passport.initialize();

//write a function that create a jwt token
const createUserToken = (req, user) => {
    //check the password from the req.body against the user
    const validPassword = bcrypt.compareSync(req.body.password, user.password); //returns a boolean

    //if we didn't get a user or the password isn't valid then throw an error
    if (!user || !validPassword) {
        const err = new Error('Invalid Credentials 😡');
        err.statusCode = 422;
        throw err 
    } else {//otherwise create and sign a new token
        return jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_SECRET,
            { expiresIn: '10m' } //TODO: extend for production
            )
    }
}

module.exports = {
    createUserToken
};