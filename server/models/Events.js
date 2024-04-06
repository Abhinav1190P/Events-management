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
  banner: {
    type: String,
    required: true
  },
  secret_key: {
    type: String,
    required: false
  },
  admin_url: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'auth'
  }
}, {
  timestamps: true
});

eventSchema.virtual('status').get(function () {
  const now = new Date();
  if (this.date > now) {
    return 'upcoming';
  } else if (this.date.toDateString() === now.toDateString()) {
    return 'happening';
  } else {
    return 'done';
  }
});

eventSchema.set('toJSON', { virtuals: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;