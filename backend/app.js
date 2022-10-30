const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');


const errorMiddleware = require('./middleware/error')

app.use(express.json());
app.use(cookieParser());

// Route Imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');


/* Telling the app to use the product route. */
app.use('/api/v1', product);


/* Telling the app to use the user route. */
app.use('/api/v1', user);

/* Telling the app to use the order route. */
app.use('/api/v1', order);

/* Error Handling Middleware */
app.use(errorMiddleware);



// exporting app module to use on server.js
module.exports = app;