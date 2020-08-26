module.exports = {
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      return res.redirect('/signin');
    }
  },

  isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
      next();
    } else {
      return res.redirect('/profile');
    }
  },
};
