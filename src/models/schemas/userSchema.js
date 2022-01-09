const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        age: { type: Number, default: 0 },
        name: { type: String },
        phone: { type: String },
        email: { type: String, require: true },
        job: { type: String },
        gender: { type: Number },
        address: { type: String },
        _thumbnail: { type: mongoose.Types.ObjectId },
        _pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pet' }],
        password: { type: String, require: true },
        builtTime: { type: Date },
        lastLogin: { type: Date },
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

module.exports = userSchema;
