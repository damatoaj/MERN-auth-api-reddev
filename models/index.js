
require('dotenv').config();
const mongoose = require('mongoose');

//connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

//console log on open
mongoose.connection.once('open', () => 
    console.log(`Connected to db: ${mongoose.connection.name} at ${mongoose.connection.host}:${mongoose.connection.port}`)
);
//console log on error
mongoose.connection.on('error', err => 
console.log(`Database connection error:  `, err))

//export
module.exports.User = require('./user');