const mongoose  = require('mongoose');

const   mongooseConnection =   mongoose.connect(process.env.DB_STRING);

module.exports = mongoose.connection;