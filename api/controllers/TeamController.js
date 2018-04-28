const mongoose = require('mongoose'),
    Team = require('../models/Team'),
    User = require('../models/User')


exports.create_a_team = function (req, res) {
    const members = req.body.members.split(",")
    let memberIds = []
    const promises = members.map((username) => {
        return User.findOne({ username: username }, function (err, user) {
            if (!user) res.status(404).json({ success: false, message: "Could not find user", error: err })
            if (err) res.status(500).json({ success: false, message: "Could not get user id from username", error: err })
            return user
        }).then((user) => {
            memberIds.push(user._id)
        })
    })
    Promise.all(promises).then(() => {
        memberIds.push(req.userId)
        req.body.members = memberIds
        const new_team = new Team(req.body)
        new_team.save(function (err, team) {
            if (err) res.status(500).json({ success: false, message: "Could not create team", error: err })
            else res.json(team)
        });
    })
}

exports.add_user_to_team = function (req, res) {
    Team.findOne({ _id: req.params.teamId }, function(err, team) {
        team.members.push(req.body.userId)
        Team.findOneAndUpdate({ _id: req.params.teamId }, team, { new: true }, function (err, new_team) {
            if (err) res.status(500).json({ success: false, message: "Could not update team", error: err })
            else res.json(new_team)
        })
    })
}


exports.get_teams_by_user = function (req, res) {
    const userid = req.userId
    Team.find({ members: userid }, function(err, teams) {
        if (err) res.status(500).json({ success: false, message: "Could not find team", error: err })
        else res.json(teams)
    })
}


exports.get_team_by_team_id = function (req, res) {
    const teamid = req.params.teamId
    Team.findOne({ _id: teamid }, function(err, team) {
        if (err) res.status(500).json({ success: false, message: "Could get team", error: err })
        else res.json(team)
    })
}


exports.delete_user_from_team = function (req, res) {
    Team.find( { _id: req.params.teamId }, function(err, team) {
        const index = team.members.indexOf(req.body.userId)
        if (index > -1) {
            team.members.splice(index, 1)
            Team.findOneAndUpdate({ _id: req.params.teamId }, team, { new: true }, function (err, team) {
                if (err) res.status(500).json({ success: false, message: "Could not update team", error: err })
                else res.json(team)
            })
        } else res.status(404).json({ success: false, message: "This user is a not a member of the team", error: err })
    })
}

exports.update_a_team = function (req, res) {
     Team.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, team) {
         if (err) res.status(500).json({ success: false, message: "Could not update team", error: err })
         else res.json(team)
     })
}

exports.delete_a_team = function (req, res) {
    Post.findByIdAndRemove({ _id: req.params.id }, function (err, team) {
        if (err) res.status(500).json({ success: false, message: "Could not delete team", error: err })
        else res.json(team)
    })
}