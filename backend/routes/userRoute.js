const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');


/* Creating a router object. */
const router = express.Router();



/* Creating a route for the register page. */
router.route('/register').post(registerUser);


router.route('/login').post(loginUser);


module.exports = router;