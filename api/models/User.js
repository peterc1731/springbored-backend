const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'The name must not be empty'
    },
    username: {
        type: String,
        required: 'The username must not be empty',
        unique: true
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
    avatar: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})
mongoose.model('User', UserSchema)

module.exports = mongoose.model('User')
