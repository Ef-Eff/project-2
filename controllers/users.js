const User = require('../models/user');
const Meetup = require('../models/meetup');
const Promise = require('bluebird');

function indexRoute(req, res, next ) {

  User
    .find()
    .exec()
    .then((users) => res.render('users/index', { users }))
    .catch(next);
}

function profileRoute(req, res, next) {

  Promise.props({
    hosting: Meetup.find({ host: req.user.id }).exec(),
    attending: Meetup.find({ attendees: req.user.id }).exec()
  })
  .then((result) => {
    res.render('users/profile', result);
  })
  .catch(next);
}

function showRoute(req, res, next) {

  User
    .findById(req.params.id)
    .exec()
    .then((user) => res.render('users/show', { user }))
    .catch(next);
}




module.exports = {
  index: indexRoute,
  show: showRoute,
  profile: profileRoute
};
