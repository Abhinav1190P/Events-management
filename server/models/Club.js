const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({

    club_name: {
        type: String,
        required: true
    },
    club_images: {
        type: [String],
        validate: {
            validator: function (images) {
                return images.length <= 4;
            },
            message: 'Club images cannot exceed 4.'
        }
    },
    club_admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'auth'
    }
}, {
    timestamps: true
})

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;