const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String,
        required: 'The post must contain content'
    },
    user_id: {
        type: String,
        required: 'The user_id field must be populated'
    },
    username: {
        type: String,
        required: 'The username field must be populated'
    },
    avatar: {
        type: String
    },
    images: [{
        type: String
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
})
mongoose.model('Post', PostSchema)

module.exports = mongoose.model('Post')
