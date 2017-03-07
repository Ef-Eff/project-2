const User = require('../models/user');

function indexRoute(req, res, next ) {

  User
    .find()
    .exec()
    .then((users) => res.render('users/index', { users }))
    .catch(next);
}

function profileRoute(req, res) {
  User.populate(req.user, [{ path: 'bookings' }, { path: 'meetups'}])
    .then((user) => {
      res.render('users/profile', { user });
    });
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
