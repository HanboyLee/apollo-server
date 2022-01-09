const mongoose = require('mongoose');

const userSchema = require('./schemas/userSchema');
//Statics
userSchema.statics.findOneMailIsExist = function (email) {
    return this.countDocuments({ email: { $eq: email } });
};
userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email: { $eq: email } });
};
module.exports.User = mongoose.model('User', userSchema);
