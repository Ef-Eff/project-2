const User = require('../models/user');

function indexRoute(req, res, next ) {

  User
    .find()
    .exec()
    .then((users) => res.render('users/index', { users }))
    .catch(next);
}

function profileRoute(req, res) {
  res.render('users/profile');
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
