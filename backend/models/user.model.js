const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        // validation
        type: String, // has to be a string
        required: true, // must have a username
        unique: true, // cannot be the same as another username
        trim: true, // removes any whitespaces on the ends
        minlength: 3 // has to be at least three char long
    },
}, {
    timestamps: true, // automatically creates fields for when created & modified
});

module.exports = mongoose.model('User', userSchema);