function isLogged(req, res, next) {
  if(req.session.isAuthenticated || req.session.userId) {
    return res.unauthorized('/profile', 'You are already logged in, no need to go there!');
  }

  next();
}

module.exports = isLogged;
