// login > see games > make booking
// Host responds to gamer
// status of booking: pending, accepted, rejected
// createBooking, indexBooking, acceptBooking, rejectBooking


const Meetup = require('../models/meetup');
const Booking = require('../models/booking');

function indexRoute(req, res, next) {

  Meetup
    .find()
    .exec()
    .then((meetups) => res.render('meetups/index', { meetups }))
    .catch(next);
}

function showRoute(req, res, next) {

  Meetup
    .findById(req.params.id)
    .populate('host')
    .exec()
    .then((meetup) => res.render('meetups/show', { meetup }))
    .catch(next);
}

function createBooking(req, res, next) {

  console.log(req.body);
  Booking
    .create({ gamer: req.user.id })
    .then(() => {
      console.log(req.user.id);
      res.redirect(`/meetups/${req.params.id}`);
    })
    .catch(next);
}

module.exports = {
  index: indexRoute,
  createBooking,
  show: showRoute
};
