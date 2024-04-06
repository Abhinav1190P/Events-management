const mongoose = require('mongoose');

const clubAboutSchema = new mongoose.Schema({
    club_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clubs'
    },
    htmlContent: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const About = mongoose.model('About', clubAboutSchema);

module.exports = About;
