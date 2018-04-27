const mongoose = require('mongoose'),
    Team = require('../models/Team')


exports.create_a_team = function (req, res) {
    req.body.members = [req.userId]
    const new_team = new Team(req.body)
    new_team.save(function (err, team) {
        if (err) res.send(err)
        else res.json(team)
    });
}

exports.add_user_to_team = function (req, res) {
    Team.find( { _id: req.params.teamId }, function(err, teams) {
        teams[0].members.push(req.body.userId)
        Team.findOneAndUpdate({ _id: req.params.teamId }, teams[0], { new: true }, function (err, new_teams) {
            if (err) res.send(err)
            else res.json(new_teams[0])
        })
    })
}


exports.get_teams_by_user = function (req, res) {
    const userid = req.userId
    console.log("user id: " + userid)
    Team.find({ members: userid}, function(err, teams) {
        if (err) res.send(err)
        else res.json(teams)
    })
}


exports.get_team_by_team_id = function (req, res) {
    const teamid = req.params.teamId
    console.log("team id: " + teamid)
    Team.findOne({ _id: teamid}, function(err, team) {
        if (err) res.send(err)
        else res.json(team)
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