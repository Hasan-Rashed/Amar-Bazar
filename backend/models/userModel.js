const mongoose = require('mongoose');
const validator = require('validator');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxLength: [30, 'Name cannot be longer than 30 characters'],
        minLength: [4, 'Name cannot be shorter than 4 characters']
    },
    
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        unique: true,
        validate: [validator.isEmail, 'Please provide an email address']
    },

    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: [8, 'Password cannot be longer than 8 characters'],
        select: false // should not be returned in response
    },

    avatar: { // is an object cause user has only one avatar
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },

    role: {
        type: String,
        default: 'user' // default to user until make Admin
    },

    resetPasswordToken: String,

    resetPasswordExpire: Date
});


/* Exporting the model to be used in other files. */
module.exports = new mongoose.model('User', userSchema);