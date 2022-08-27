const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');




// Create Product -- Admin
/* catchAsyncErrors A middleware function that is used to handle errors of async functions. */

exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    /* Adding the user id to the product. */
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});





// GET All Products
/* catchAsyncErrors A middleware function that is used to handle errors of async functions. */

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    // module apifeatures is used to filter the products

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();


    
    /* Filtering the products based on the query string. */
    const apiFeature = new ApiFeatures(Product.find(), req.query) // query and queryStr parameter
    .search() // search feature function
    .filter() // filter feature function
    .pagination(resultPerPage) // pagination feature function

    const products = await apiFeature.query;
    
    res.status(200).json({
        success: true,
        products
    })
});




// GET Product details
/* catchAsyncErrors A middleware function that is used to handle errors of async functions. */

exports.getProductDetails = catchAsyncErrors(catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    // error handling
    if(!product) {
        return next(new ErrorHandler('Product not found', 404)); // next is a callback function
    }

    res.status(200).json({
        success: true,
        product,
        ProductCount
    })
}));




// Update Product -- Admin
/* catchAsyncErrors A middleware function that is used to handle errors of async functions. */

exports.updateProduct = catchAsyncErrors(async (req, res, next) => { 

    let product = await Product.findById(req.params.id);

    // error handling
    if(!product) {
        return next(new ErrorHandler('Product not found', 404)); // next is a callback function
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
});




// Delete Product -- Admin
exports.deleteProduct = async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    // error handling
    if(!product) {
        return next(new ErrorHandler('Product not found', 404)); // next is a callback function
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    })
}