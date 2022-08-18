const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors')




// Create Product -- Admin
/* catchAsyncErrors A middleware function that is used to handle errors of async functions. */

exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});





// GET All Products
/* catchAsyncErrors A middleware function that is used to handle errors of async functions. */

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    
    const products = await Product.find();
    
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
        product
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