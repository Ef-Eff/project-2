const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI);

const User = require('../models/user');
const Meetup = require('../models/meetup');

User.collection.drop();
Meetup.collection.drop();

User
  .create([{
    username: 'Unique',
    email: 'u@u',
    password: 'u',
    passwordConfirmation: 'u'
  }, {
    username: 'Bob',
    email: 'bob@bob',
    password: 'bob',
    passwordConfirmation: 'bob'
  }])
  .then((users) => {
    console.log(`${users.length} users created! User 1 is ${users[0].username}`);

    return Meetup
      .create([{
        host: users[0],
        name: 'Broforced',
        description: 'A night for bro\'s that love to broforce it up, bring your bro on for this brotastic broforce session of bromageddon broportions.',
        image: 'http://www.broforcegame.com/images/broforce.png',
        requirements: 'PS4 Controller, Heart of a Bro (Girls allowed, just be a Bro at heart)',
        food: 'Food will be provided.',
        location: 'SE London'
      }, {
        host: users[1],
        name: 'Journey Night',
        description: 'lets play journey',
        image: 'http://assets.sbnation.com/assets/2139893/4fc2ba2b-1e28-4ea0-950a-6ee7b2217404.jpg',
        requirements: '£1 entry fee',
        food: 'Food can be bought at the venue',
        location: 'Moms Basement'
      }]);
  })
  .then((meetups) => console.log(`${meetups.length} meetups akwardly put together!`))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
