const mongoose = require('mongoose');
module.exports = mongoose.model('Book', require('./schemas/bookSchema'));
