const User = require('../models/user');

function authentication(req, res, next) {
  // Check to see if user is logged in
  // if not, exit this piece of middleware
  if(!req.session.isAuthenticated) {
    res.locals.titles = ['This is 1/10 randomly picked messages.', 'Boredom does wonders.', 'Hello WDI-25!', 'Better than poker.', 'Are you amazed yet.', 'Attack of the unoriginal title.', 'I hope this is legal.', 'I\'ve ran out of stuff', 'Meetup website for gamers. (duh)', 'Meetup website for <span style="color: gold;">Gamers.</span>'];
    return next();
  }

  // find the user based on the userId in the session
  User
    .findById(req.session.userId)
    .then((user) => {
      if(!user) {
        // if the user cannot be found log out the user
        return req.session.regenerate(() => res.unauthorized());
      }

      // set the userId back on the session
      req.session.userId = user.id;

      // set the whole user object to the request object
      // so we can use the user's details in our controllers
      req.user = user;

      // set the whole user object to res.locals so we can use it in the views
      res.locals.user = user;
      // set an isAuthenticated boolean so we can show and hide buttons and links
      res.locals.isAuthenticated = true;

      // ok we are done, move on to the next piece of middleware
      next();
    })
    .catch(next);
}

module.exports = authentication;
