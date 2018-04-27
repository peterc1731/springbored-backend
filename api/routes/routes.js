module.exports = function(app) {
    const authController = require('../controllers/AuthController'),
        postController = require('../controllers/PostController'),
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
        
        
    //Posts
        
    app.route('/api/posts')
        .get(postController.get_all_posts)
        .post(postController.create_a_post)
        
    app.route('/api/posts/:id')
        .get(postController.get_a_post)
        .put(postController.update_a_post)
        .delete(postController.delete_a_post)
    
};