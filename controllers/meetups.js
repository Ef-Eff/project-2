const Meetup = require('../models/meetup');

function indexRoute(req, res, next) {

  if(!req.query.limit) req.query.limit = 2;

  Meetup
    .find()
    .limit(parseInt(req.query.limit))
    .skip(parseInt(req.query.offset))
    .exec()
    .then((meetups) => res.render('meetups/index', { meetups }))
    .catch(next);
}

function showRoute(req, res, next) {

  Meetup
    .findById(req.params.id)
    .populate('host')
    .populate('attendees')
    .exec()
    .then((meetup) => res.render('meetups/show', { meetup }))
    .catch(next);
}

function newRoute(req, res) {
  res.render('meetups/new');
}

function createRoute(req, res, next) {

  req.body.host = req.user;
  if(req.file) req.body.image = req.file.key;

  Meetup
    .create(req.body)
    .then((meetup) => {
      res.redirect(`/meetups/${meetup.id}`);
    })
    .catch(next);
}

function editRoute(req, res, next) {

  Meetup
    .findById(req.params.id)
    .then((meetup) => res.render('meetups/edit', { meetup }))
    .catch(next);
}

function updateRoute(req, res, next) {

  Meetup
    .findById(req.params.id)
    .then((meetup) => {
      for(const field in req.body) {
        meetup[field] = req.body[field];
      }

      return meetup.save();
    })
    .then((meetup) => res.redirect(`/meetups/${meetup.id}`))
    .catch(next);
}

function deleteRoute(req, res, next) {

  Meetup
    .findById(req.params.id)
    .exec()
    .then((meetup) => meetup.remove())
    .then(() => res.redirect('/profile'))
    .catch(next);
}

function attendRoute(req, res, next) {

  Meetup
    .findById(req.params.id)
    .exec()
    .then((meetup) => {
      meetup.attendees.push(req.user);

      return meetup.save();
    })
    .then((meetup) => res.redirect(`/meetups/${meetup.id}`))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  new: newRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  attend: attendRoute
};
