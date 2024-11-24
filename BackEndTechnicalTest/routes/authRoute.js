const router = require('express').Router();
const authController = require('../app/controllers/AuthController');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy(
    { usernameField: 'us_email' },
    authController.localStrategy,
  ),
);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authController.me);

module.exports = router;
