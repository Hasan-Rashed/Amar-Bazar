const express = require('express');
const { registerUser, loginUser, logout } = require('../controllers/userController');


/* Creating a router object. */
const router = express.Router();



/* Creating a route for the register page. */
router.route('/register').post(registerUser);


/* Creating a route for the login page. */
router.route('/login').post(loginUser);


/* Creating a route for the logout function. */
router.route('/logout').all(logout);


module.exports = router;