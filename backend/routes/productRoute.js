const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');



/* Creating a router object. */
const router = express.Router();


/* Creating a route for the get request. */
router.route('/products').get(getAllProducts);



/* Creating a route for the post request. */
router.route('/product/new').post(createProduct);



/* Creating a route for the put and delete request. */
router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getProductDetails); // update, delete, productDetails url or api same


module.exports = router;