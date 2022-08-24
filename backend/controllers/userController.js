const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken')



// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {


    /* Creating a new user with the name, email, and password from the request body. */
    const { name, email, password } = req.body;



    /* Creating a new user with the name, email, and password from the request body. */
    const user = await User.create({
        name, email, password, // from req.body
        avatar: {
            public_id: 'This is a sample id',
            url: 'profilePicUrl'
        }
    });


    /* Sending the token to the user. */
    sendToken(user, 201, res);
});




// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    /* Destructuring the email and password from the request body. */
    const { email, password } = req.body;


    /* This is checking if the user has given both the email and password. If not, then it will return
    an error. */
    if (!email || !password) {
        return next(new ErrorHandler('Email and password are required', 400))
    }


    /* Finding a user with the email address that was passed in and then selecting the password property. */
    const user = await User.findOne({ email }).select('+password'); // property value same (email), so write only one email


    /* Checking if the user exists. If not, then it will return an error. */
    if (!user) {
        return next(new ErrorHandler('Invalid credentials', 401))
    }

    /* Comparing the password that the user has given with the password that is stored in the database. */
    const isPasswordMatched = user.comparePassword(password);

    /* Checking if the password that the user has given matches the password that is stored in the
    database. */
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid credentials', 401))
    }


    /* Sending the token to the user. */
    sendToken(user, 200, res);
});