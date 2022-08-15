const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')


// config
/* Loading the config.env file. */
dotenv.config({path: 'backend/config/config.env'});


// connecting to Database
connectDatabase();



/* Listening to the port that is specified in the config.env file. */
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})