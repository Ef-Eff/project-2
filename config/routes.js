const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const meetups = require('../controllers/meetups');
const users = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');
const upload = require('../lib/upload');

router.get('/', (req, res) => res.render('statics/index'));

router.route('/register')
  .get(registrations.new)
  .post(upload.single('profilePic'), registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/profile')
  .get(secureRoute, users.profile)
  .post(upload.single('profilePic'), users.image)
  .delete(users.delete);
 
router.route('/users')
  .get(secureRoute, users.index);

router.route('/users/:id')
  .get(secureRoute, users.show);

router.route('/meetups')
  .get(secureRoute, meetups.index)
  .post(upload.single('image'), meetups.create);

router.route('/meetups/new')
  .get(secureRoute, meetups.new);

router.route('/meetups/:id')
  .get(secureRoute, meetups.show)
  .put(meetups.update)
  .delete(meetups.delete);

router.route('/meetups/:id/edit')
  .get(secureRoute, meetups.edit);

router.route('/meetups/:id/attend')
  .post(meetups.attend);


router.all('*', (req, res) => res.notFound());

module.exports = router;
