const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const auth = require('./routers/auth/auth.js');
const { session } = require('./config/config.js');
require('./routers/auth/strategies');
const isAuth = require('./middleware/isAuthenticated');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('client/public'));

app.use(cookieSession({
  name: 'plannrly',
  maxAge: 24 * 60 * 60 * 1000,
  keys: [session.cookieKey],
}));

app.use(passport.initialize());
app.use(passport.session());

console.log('before the auth route');
app.use('/api/auth', auth);

app.use((req, res, next) => {
  if (port !== '3000') {
    isAuth(req, res, next);
  } else {
    next();
  }
});

// routers
// app.use('/api/users', users);
// app.use('/api/events', events);
// app.use('/api/guestlists', guestlists);
// app.use('/api/attendees', attendees);
// app.use('/api/invites', invites);
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.log(err.stack);
  return res.status(500).json({ error: 'You have encountered an error' });
});

app.listen(port, () => {
  console.log('app listening on port 3000!');
});

app.get('/', (req, res) => {
  res.send('hello world');
});

module.exports = app;
