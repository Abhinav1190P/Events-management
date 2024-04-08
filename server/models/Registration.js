const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    club: {
        type: String,
        required: true,
        trim: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    time: {
        type: String,
        required: true,
        trim: true
    },
    venue: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    banner: {
        type: String,
        required: true
    },
    admin_url: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth'
    },
    registered_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth'
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth'
    },
    qrCode: {
        type: String,
        required: false,
    }
}, {
    timestamps: true
})

const Register = mongoose.model('Register', registrationSchema);

module.exports = Register;