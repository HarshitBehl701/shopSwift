const mongoose  = require('mongoose');

const   mongooseConnection =   mongoose.connect(process.env.MONGO_URI);

module.exports = mongoose.connection;