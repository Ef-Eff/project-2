const mongoose = require('mongoose');
const User = require('../models/user');

const bookingSchema = new mongoose.Schema({
  host: { type: mongoose.Schema.ObjectId, ref: 'User' },
  gamer: { type: mongoose.Schema.ObjectId, ref: 'User'},
  meetup: { type: mongoose.Schema.ObjectId, ref: 'Meetup'},
  status: { type: String, enum: ['pending','accepted','rejected'], default: 'pending' }
}, {
  timestamps: true
});

bookingSchema.pre('save', function addBookingToUser(next) {
  User
    .findById(this.gamer)
    .exec()
    .then((user) => {
      user.bookings.push(this.id);
      return user.save();
    })
    .then(next)
    .catch(next);
});

module.exports = mongoose.model('Booking', bookingSchema);
