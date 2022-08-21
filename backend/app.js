const express = require('express');
const app = express();

const errorMiddleware = require('./middleware/error')

app.use(express.json());

// Route Imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');


/* Telling the app to use the product route. */
app.use('/api/v1', product);


/* Telling the app to use the user route. */
app.use('/api/v1', user);


/* Error Handling Middleware */
app.use(errorMiddleware);



// exporting app module to use on server.js
module.exports = app;