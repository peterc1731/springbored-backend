const express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    routes = require('./api/routes/routes'),
    bodyParser = require('body-parser'),
    app = express(),
    port = process.env.APP_PORT || 3001,
    mongoUrl = process.env.APP_DB_URL || 'mongodb://localhost/social-network'
    

mongoose.Promise = global.Promise
mongoose.connect(mongoUrl)
    .then(() => {
        
        app.use(cors())
        
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
            
        routes(app)
        
        app.listen(port)
        
        console.log('springbored server started on: ' + port)
    })
    .catch((err) => {
        console.log("Error: Unable to start server.")
        console.log(err)
    })
