const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Fullname: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
        ]
    },
    city: String,
    state: String,
    mobile: {
        type: Number,
        trim: true,
        unique: true,
        required: true,
        match: [
            /^[0-9]{10}$/,
            'Please provide a valid mobile number'
        ]
    },
    AccountID: {
        type: String,
        trim: true,
    },
    AccountType: {
        type: String,
        trim: true,
    },
    currentBalance: {
        type: Number,
        default: 0,
    },
    imageLink: {
        type: String,
        trim: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);