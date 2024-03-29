const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary');


/* This is a listener that listens for uncaught exceptions. (console logging without quote) */
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Uncaught Exception');

    process.exit(1);
})



// config
/* Loading the config.env file. */
dotenv.config({path: 'backend/config/config.env'});


// connecting to Database
connectDatabase();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



/* Listening to the port that is specified in the config.env file. */
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})




// Unhandled Promise Rejection
/* This is a listener that listens for unhandled promise rejections. */
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');

    server.close(() => {
        process.exit(1);
    });
});