const { Router } = require('express');
const router = Router();
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('users/profile');
});

router.get('/signin', isNotLoggedIn, (req, res) => {
  res.render('auth/signin');
});

router.post(
  '/signin',
  isNotLoggedIn,
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true,
  })
);

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post(
  '/signup',
  isNotLoggedIn,
  passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
  })
);

router.get('/logout', isLoggedIn, (req, res) => {
  console.log(req.user.FIRSTNAME, req.isAuthenticated());
  req.logOut();
  res.redirect('/signin');
});

module.exports = router;
