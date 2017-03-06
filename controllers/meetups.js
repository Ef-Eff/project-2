// login > see games > make booking
// Host responds to gamer
// status of booking: pending, accepted, rejected
// createBooking, indexBooking, acceptBooking, rejectBooking


const Meetup = require('../models/meetup');

function indexRoute(req, res, next) {

  Meetup
    .find()
    .exec()
    .then((meetups) => res.render('meetups/index', { meetups }))
    .catch(next);
}

module.exports = {
  index: indexRoute
};
