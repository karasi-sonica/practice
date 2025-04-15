const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Inavlid email'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
});

module.exports = mongoose.model('user', userSchema);