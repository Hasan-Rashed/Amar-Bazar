const express = require('express');
const { getAllProducts } = require('../controllers/productController');



/* Creating a router object. */
const router = express.Router();


/* Creating a route for the get request. */
router.route('/products').get(getAllProducts);


module.exports = router;