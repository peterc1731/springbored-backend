const mongoose = require('mongoose'),
    Post = require('../models/Post')

exports.get_all_posts = function (req, res) {
    Post.find({}, function(err, posts) {
        if (err) res.send(err)
        else res.json(posts)
    })
}

exports.create_a_post = function (req, res) {
    const new_post = new Post(req.body)
    new_post.save(function (err, post) {
        if (err) res.send(err)
        else res.json(post)
    });
}

exports.get_a_post = function (req, res) {
    Post.findById(req.params.id, function(err, post) {
        if (err) res.send(err)
        else res.json(post)
    })
}

exports.update_a_post = function (req, res) {
     Post.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, post) {
         if (err) res.send(err)
         else res.json(post)
     })
}

exports.delete_a_post = function (req, res) {
    Post.findByIdAndRemove({ _id: req.params.id }, function (err, post) {
        if (err) res.send(err)
        else res.json(post)
    })
}