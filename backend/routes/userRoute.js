const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword } = require('../controllers/userController');


/* Creating a router object. */
const router = express.Router();



/* Creating a route for the register page. */
router.route('/register').post(registerUser);


/* Creating a route for the login page. */
router.route('/login').post(loginUser);


/* This is a route for the forgot password page. */
router.route('/password/forgot').post(forgotPassword);


/* This is a route for the reset password page. */
router.route('/password/reset/:token').put(resetPassword);


/* Creating a route for the logout function. */
router.route('/logout').get(logout);


module.exports = router;