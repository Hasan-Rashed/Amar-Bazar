const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails } = require('../controllers/userController');

/* This is destructuring the isAuthenticateUser and authorizeRoles functions from
the auth.js file. */
const {isAuthenticateUser, authorizeRoles, isAuthenticatedUser} = require('../middleware/auth');


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

/* This is a route for the user to get their own details. */
router.route('/me').get(isAuthenticatedUser, getUserDetails);

module.exports = router;