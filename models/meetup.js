
const mongoose = require('mongoose');
const User = require('../models/user');

const meetupSchema = new mongoose.Schema({
  host: { type: mongoose.Schema.ObjectId, ref: 'User' },
  name: { type: String },
  date: { type: Date, default: Date.now },
  image: { type: String, trim: true },
  description: { type: String },
  food: { type: String },
  requirements: { type: String },
  gamers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  location: { type: String }
}, {
  timestamps: true
});

meetupSchema.pre('save', function addBookingToUser(next) {
  User
    .findById(this.host)
    .exec()
    .then((user) => {
      user.meetups.push(this.id);
      return user.save();
    })
    .then(next)
    .catch(next);
});

module.exports = mongoose.model('Meetup', meetupSchema);
