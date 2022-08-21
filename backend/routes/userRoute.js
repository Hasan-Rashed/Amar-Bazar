const express = require('express');
const { registerUser } = require('../controllers/userController');


/* Creating a router object. */
const router = express.Router();



/* Creating a route for the register page. */
router.route('/register').post(registerUser);


module.exports = router;