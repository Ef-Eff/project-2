const mongoose = require('mongoose');

const meetupSchema = new mongoose.Schema({
  host: { type: mongoose.Schema.ObjectId, ref: 'User' },
  name: { type: String },
  date: { type: Date, default: Date.now },
  image: { type: String },
  description: { type: String },
  food: { type: String },
  requirements: { type: String },
  attendees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  location: { type: String },
  lat: { type: String },
  lng: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Meetup', meetupSchema);
