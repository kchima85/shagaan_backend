const passport = require('passport');
const Facebook = require('passport-facebook').Strategy;
const Google = require('passport-google-oauth20');
const uuid = require('uuid');
const { facebook } = require('../../config/config.js');
const { google } = require('../../config/config.js');
const pool = require('../../tools/pgConnect');
const fileReader = require('../../tools/fileReader')('./routers/auth/queries/');

passport.serializeUser((user, done) => done(null, user.user_id));

passport.deserializeUser(async (id, done) => {
  const result = await pool.query(fileReader.get_user_info, [id]);
  try {
    if (result.rows.length > 0) {
      done(null, result.rows[0].user_id);
    } else {
      throw Error();
    }
  } catch (error) {
    done(null, error);
  }
});

passport.use(new Facebook({
  clientID: facebook.appId,
  clientSecret: facebook.appSecret,
  callbackURL: '/api/auth/facebook/redirect',
  profileFields: ['id', 'name', 'email'],
  enableProof: true,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const userId = await pool.query(fileReader.check_third_party_id, [profile.id]);
    if (userId.rows.length > 0) {
      return done(null, userId.rows[0]);
    }
  } catch (error) {
    console.log(error);
  }

  const email = profile.emails || null;

  return pool.query(fileReader.create_user_facebook, [
    profile.name.givenName,
    profile.name.familyName,
    email,
    uuid(),
    profile.id,
  ])
    .then(result => done(null, result.rows[0]))
    .catch(err => done(null, err));
}));


passport.use(new Google({
  callbackURL: '/api/auth/google/redirect',
  clientID: google.clientId,
  clientSecret: google.clientSecret,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const userId = await pool.query(fileReader.check_third_party_id, [profile.id]);
    if (userId.rows.length > 0) {
      return done(null, userId.rows[0]);
    }
  } catch (error) {
    console.log(error);
  }
  return pool.query(fileReader.create_user_google, [
    profile.name.givenName,
    profile.name.familyName,
    profile.emails[0].value,
    uuid(),
    profile.id,
  ])
    .then(result => done(null, result.rows[0]))
    .catch(err => done(null, err));
}));
