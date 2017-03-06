const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const meetups = require('../controllers/meetups');
const users = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');


router.get('/', (req, res) => res.render('statics/index'));

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/profile')
  .get(secureRoute, users.profile);

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show);

router.route('/meetups')
  .get(meetups.index);

router.all('*', (req, res) => res.notFound());

module.exports = router;
