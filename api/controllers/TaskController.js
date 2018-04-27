const mongoose = require('mongoose'),
    Task = require('../models/Task')

exports.get_tasks_by_team = function (req, res) {
    Task.find({ team_id: req.params.teamId }, function(err, tasks) {
        if (err) res.send(err)
        else res.json(tasks)
    })
}

exports.get_tasks_by_user = function (req, res) {
    const userid = req.userid
    console.log("user id: " + userid)
    Task.find({ assignee_id: userid}, function(err, tasks) {
        if (err) res.send(err)
        else res.json(tasks)
    })
}

exports.create_a_task = function (req, res) {
    const new_task = new Task(req.body)
    new_task.save(function (err, task) {
        if (err) res.send(err)
        else res.json(task)
    });
}

exports.update_a_task = function (req, res) {
     Task.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, task) {
         if (err) res.send(err)
         else res.json(task)
     })
}

exports.delete_a_task = function (req, res) {
    Post.findByIdAndRemove({ _id: req.params.id }, function (err, task) {
        if (err) res.send(err)
        else res.json(task)
    })
}