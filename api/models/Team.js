const mongoose = require('mongoose')
const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'A name must be included in a team'
    },
    description: {
        type: String
    },
    members: [String]
})
mongoose.model('Team', TeamSchema)

module.exports = mongoose.model('Team')