const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
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
  banner:{
    type:String,
    required:true
  }
}, {
  timestamps: true // Optionally add this to automatically add createdAt and updatedAt fields
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
