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

function imageRoute(req, res, next) {

  if(req.file) req.body.profilePic = req.file.key;

  User
    .findOne({ email: req.user.email })
    .exec()
    .then((user) => {
      user.profilePic = req.body.profilePic;
      return user.save();
    })
    .then(() => res.redirect('/profile'))
    .catch(next);
}

function showRoute(req, res, next) {

  User
    .findById(req.params.id)
    .exec()
    .then((user) => res.render('users/show', { user }))
    .catch(next);
}

function deleteRoute(req, res, next) {

  User
    .findById(req.user.id)
    .exec()
    .then((user) => user.remove())
    .then(() => req.session.regenerate(() => res.redirect('/')))
    .catch(next);
}




module.exports = {
  index: indexRoute,
  show: showRoute,
  profile: profileRoute,
  image: imageRoute,
  delete: deleteRoute
};
