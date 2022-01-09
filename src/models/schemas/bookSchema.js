const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        title: { type: String },
        publishedDate: { type: Date, default: Date.now },
        price: { type: Number },
        _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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

module.exports = bookSchema;
