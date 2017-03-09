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
        maxUsers: 12,
        description: 'A night for bro\'s that love to broforce it up, bring your bro on for this brotastic broforce session of bromageddon broportions.',
        image: '6d4f1c79-4216-4239-84f8-28c56692c5f8.png',
        requirements: 'PS4 Controller, Heart of a Bro (Girls allowed, just be a Bro at heart)',
        food: 'Food will be provided.',
        location: 'SE London',
        attendees: [users[1]],
        lat: '51.4645281',
        lng: '-0.027163699999960045'
      }, {
        host: users[1],
        name: 'Journey Night',
        description: 'lets play journey',
        maxUsers: 50,
        image: '6318e0f2-ff68-455f-8b9a-f90808e1faa2.jpeg',
        requirements: '£1 entry fee',
        food: 'Food can be bought at the venue',
        location: 'Moms Basement',
        attendees: [users[0]]
      }]);
  })
  .then((meetups) => console.log(`${meetups.length} meetups akwardly put together! Meetup 1 is made by ${meetups[0].host.username}`))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
