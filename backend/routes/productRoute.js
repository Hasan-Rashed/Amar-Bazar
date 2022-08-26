const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const { isAuthenticatedUser } = require('../middleware/auth');



/* Creating a router object. */
const router = express.Router();


/* Creating a route for the get request. */
router.route('/products').get(getAllProducts);



/* Creating a route for the post request. */
router.route('/product/new').post(isAuthenticatedUser, createProduct); // isAuthenticatedUser is to check whether he is admin or not



/* Creating a route for the put and delete request. */
router.route('/product/:id').put(isAuthenticatedUser, updateProduct).delete(isAuthenticatedUser, deleteProduct).get(getProductDetails); // update, delete, productDetails url or api same


module.exports = router;