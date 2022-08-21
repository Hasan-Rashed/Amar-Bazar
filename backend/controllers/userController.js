const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');



// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {


    /* Creating a new user with the name, email, and password from the request body. */
    const {name, email, password} = req.body;



    /* Creating a new user with the name, email, and password from the request body. */
    const user = await User.create({
        name, email, password, // from req.body
        avatar: {
            public_id: 'This is a sample id',
            url: 'profilePicUrl'
        }
    });

    
    
    /* Sending a response to the client with a status code of 201 and a json object with a success
    property and a user property. */
    res.status(201).json({
        success: true,
        user
    })
})