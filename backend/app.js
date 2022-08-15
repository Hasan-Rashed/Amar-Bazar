const express = require('express');
const app = express();

app.use(express.json());

// Route Imports
const product = require('./routes/productRoute');

/* Telling the app to use the product route. */
app.use('/api/v1', product);


// exporting app module to use on server.js
module.exports = app;