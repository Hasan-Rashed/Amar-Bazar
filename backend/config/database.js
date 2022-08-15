const mongoose = require('mongoose');



const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI)
    .then((data) => console.log(`MongoDB Connected with server: ${data.connection.host}`))
    .catch(err => console.log(err.message));
}

module.exports = connectDatabase;