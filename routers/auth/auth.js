const express = require('express');
const passport = require('passport');

const router = express.Router();

// login i dont think that i will need this keep it for now
router.get('/login', async (req, res, next) => {
  try {
    res.send('hit the login route');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// logout
router.get('/logout', async (req, res, next) => {
  try {
    req.logout();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// auth google callback
router.get('/google/redirect', passport.authenticate('google'), async (req, res, next) => {
  try {
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// auth with facebook
router.get('/facebook', passport.authenticate('facebook'));

// auth facebook callback
router.get('/facebook/redirect', passport.authenticate('facebook'), async (req, res, next) => {
  try {
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
