module.exports = function(app) {
    const authController = require('../controllers/AuthController'),
        teamController = require('../controllers/TeamController'),
        taskController = require('../controllers/TaskController'),
        verifyToken = require('../helpers/verifyToken')
        
    //Users
    
    app.route('/api/register')
        .post(authController.register_a_new_user)
        
    app.route('/api/me')
        .get(verifyToken, authController.get_user_from_token)
        
    app.route('/api/login')
        .post(authController.login_an_existing_user)
        
    app.route('/api/logout')
        .get(verifyToken, authController.logout_a_user)
        
        
    //Tasks
    
    app.route('/api/tasks/user')
        .get(verifyToken, taskController.get_tasks_by_user)
        
    app.route('/api/tasks/team/:teamId')
        .get(taskController.get_tasks_by_team)
        
    app.route('/api/tasks/')
        .post(taskController.create_a_task)
        
    app.route('/api/tasks/:taskId')
        .put(taskController.update_a_task)
        .delete(taskController.delete_a_task)
        
    //Team
    
    app.route('/api/teams/:teamId/add')
        .post(teamController.add_user_to_team)
        
    app.route('/api/teams/:teamId/remove')
        .post(teamController.delete_user_from_team)
        
    app.route('/api/teams/:teamId')
        .get(teamController.get_team_by_team_id)
        .put(teamController.update_a_team)
        .delete(teamController.delete_a_team)
        
    app.route('/api/teams')
        .post(verifyToken, teamController.create_a_team)
    
    app.route('/api/teams/user/retrieve')
        .get(verifyToken, teamController.get_teams_by_user)
};