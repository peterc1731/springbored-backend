const mongoose = require('mongoose'),
    Team = require('../models/Team')


exports.create_a_team = function (req, res) {
    const new_team = new Team(req.body)
    new_team.save(function (err, team) {
        if (err) res.send(err)
        else res.json(team)
    });
}

exports.add_user_to_team = function (req, res) {
    Team.find( { _id: req.params.teamId }, function(err, team) {
        team.members.push(req.body.userId)
        Team.findOneAndUpdate({ _id: req.params.teamId }, team, { new: true }, function (err, team) {
            if (err) res.send(err)
            else res.json(team)
        })
    })
}

exports.delete_user_from_team = function (req, res) {
    Team.find( { _id: req.params.teamId }, function(err, team) {
        const index = team.members.indexOf(req.body.userId)
        if (index > -1) {
            team.members.splice(index, 1)
        }
        Team.findOneAndUpdate({ _id: req.params.teamId }, team, { new: true }, function (err, team) {
            if (err) res.send(err)
            else res.json(team)
        })
    })
}

exports.update_a_team = function (req, res) {
     Team.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, team) {
         if (err) res.send(err)
         else res.json(team)
     })
}

exports.delete_a_team = function (req, res) {
    Post.findByIdAndRemove({ _id: req.params.id }, function (err, team) {
        if (err) res.send(err)
        else res.json(team)
    })
}