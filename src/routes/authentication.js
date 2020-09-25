const { Router } = require('express');
const router = Router();
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/signin', isNotLoggedIn, (req, res) => {
  res.render('auth/signin');
});

router.post(
  '/signin',
  isNotLoggedIn,
  passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
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
    successRedirect: '/user/profile',
    failureRedirect: '/signup',
    failureFlash: true,
  })
);

router.get('/logout', isLoggedIn, (req, res) => {
  req.logOut();
  res.redirect('/signin');
});

module.exports = router;
