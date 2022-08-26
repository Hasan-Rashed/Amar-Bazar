const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const jwt_decode = require('jwt-decode')


/* This is a middleware function that checks if the user is authenticated. */
exports.isAuthenticatedUser = catchAsyncErrors( async(req, res, next) => {
    

/* Destructuring the token from the cookies. */
    const { token } = req.cookies;

    /* If there is no token, then the user is not authenticated. */
    if(!token) {
        return next(new ErrorHandler('Please Login to access this resource.', 401));
    }

    /* Decoding the token. */
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    
    /* Decoding the token. using jwt_decode library */
    // const decodedData = jwt_decode(token);


    /* Finding the user in the database using the id that was decoded from the token. */
    req.user = await User.findById(decodedData.id);
    

    /* Calling the next callback function. */
    next();
});



