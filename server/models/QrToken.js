const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    registrationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register'
    },
    expirationTime: {
        type: Date,
        required: true
    }
});

tokenSchema.index({ expirationTime: 1 }, { expireAfterSeconds: 0 });


const QrToken = mongoose.model('Token', tokenSchema);

module.exports = QrToken;