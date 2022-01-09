const mongoose = require('mongoose');

const imageSchema = require('./schemas/imageSchema');

module.exports.Image = mongoose.model('Image', imageSchema);
