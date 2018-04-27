module.exports = function(app) {
    const userController = require('../controllers/UserController'),
        authController = require('../controllers/AuthController'),
        postController = require('../controllers/PostController'),
        imageController = require('../controllers/ImageController'),
        verifyToken = require('../helpers/verifyToken')
        
    //Users
    
    app.route('/api/users')
        .get(userController.get_all_users)
        .post(userController.create_a_user)
        
    app.route('/api/users/:id')
        .get(userController.get_a_user)
        .put(userController.update_a_user)
        .delete(userController.delete_a_user)
        
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
        
        
    //Images
    
    app.route('/api/images')
        .post(imageController.create_an_image)
        
    app.route('/api/images/:id')
        .get(imageController.get_an_image)
        .put(imageController.update_an_image)
        .delete(imageController.delete_an_image)
    
};