const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'The title must be included.'
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: "Pending"
    },
    team_id: {
        type: String,
        required: 'The team id must be included.'
    },
    assignee_id: {
        type: String
    },
    assignee_username: {
        type: String
    },
    effort: {
        type: Number,
        default: 0
    }
    
})
mongoose.model('Task', TaskSchema)

module.exports = mongoose.model('Task')