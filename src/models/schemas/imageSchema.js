const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
    {
        name: { type: String },
        path: { type: String },
        size: { type: String },
        uploadDate: { type: Date },
        _user: { type: mongoose.Types.ObjectId },
    },
    { timestamps: true }
);

// //fire a function after doc saved to db
// userSchema.post('save', function (next) {
//     console.log(this, 'this');
//     next();
// });

//fire a function before doc saved to db
// userSchema.pre("save", function (next) {
//     console.log(this, 'this');
//     next();
// });

module.exports = imageSchema;
