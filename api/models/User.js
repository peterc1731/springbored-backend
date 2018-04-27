const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'The name must not be empty',
        unique: true
    },
    username: {
        type: String,
        required: 'The username must not be empty'
    },
    email: {
        type: String,
        required: 'The email must not be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'The password must not be empty'
    },
    profile: {
        description: {
        type: String
    },
    avatar: {
        type: String
    },
    dob: {
        type: Date
    },
    created_date: {
        type: Date,
        default: Date.now
    },
  }
})
mongoose.model('User', UserSchema)

module.exports = mongoose.model('User')
