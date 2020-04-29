const mongoose = require('mongoose');

//########################################################################################
//this is for defining what information is required to make a new user
//########################################################################################

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2
    },
    lastName: {
        type: String,
        required: true,
        min: 3
    },
    username: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        min: 10
    },
    password: {
        type: String,
        required: true,
        lenght: 8,
        char: 1,
        num: 1,
        cap: 1
    }
});

module.exports = mongoose.model('User', userSchema);