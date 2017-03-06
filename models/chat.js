const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  gamer: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  meetup: { type: mongoose.Schema.ObjectId, ref: 'Meetup', required: true },
  status: { type: String, enum: ['pending','accepted','rejected'], default: 'pending' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Chat', bookingSchema);
