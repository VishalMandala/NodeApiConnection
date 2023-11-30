const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        unique:true,
        type: String
    },
    password: {
        required: true,
        type: Number
    },
    phoneNumber: {
        required: true,
        type: String
    },
    location: {
        address: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        state: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: ''
        },
        zipCode: {
            type: String,
            default: ''
        }
    }
})

module.exports = mongoose.model('User', userSchema)
