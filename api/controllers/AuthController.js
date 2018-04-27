const User = require('../models/User'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    config = require('../../config'),
    mongoose = require('mongoose')

exports.register_a_new_user = function (req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8)
    const new_user = new User({
        name : req.body.name,
        username: req.body.username,
        email : req.body.email,
        password : hashedPassword
    })
    new_user.save(function (err, user) {
        if (err) return res.status(500).json(err)
        res.json({ success: true, message: "User " + req.body.name + " successfully created" })
    });
}

exports.get_user_from_token = function (req, res) {
    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).json({ success: false, message: "There was a problem finding the user" })
        if (!user) return res.status(404).json({ success: false, message: "User not found" })
        res.json(user)
    })
}

exports.login_an_existing_user = function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).json({ success: false, message: 'Error on the server.' })
        if (!user) return res.status(404).json({ success: false, message: 'No user found.' })
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).json({ success: false, message: 'Password is not valid' });
        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.json({ success: true, token: token, expires_in: 86400 });
    })
}

exports.logout_a_user = function (req, res) {
    res.json({ success: true, token: null })
}