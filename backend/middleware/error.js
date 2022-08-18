const ErrorHandler = require('../utils/errorhandler');


/* This is a middleware function that is used to handle errors. */
module.exports = (err, req, res, next) => {
    
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';


    // Wrong MongoDB ID error
    if(err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;

        // calling error handler
        err = new ErrorHandler(message, 404);
    }
    

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};