const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const users = require('./routers/users/users.js');
const events = require('./routers/events/events.js');
const guestlists = require('./routers/guestLists/guestLists.js');
const attendees = require('./routers/attendees/attendees.js');
const invites = require('./routers/invites/invites.js');
const auth = require('./routers/auth/auth.js');
const { session } = require('./config/config');
require('./routers/auth/strategies');
require('./tools/scheduler/runTasks.js');
const isAuth = require('./middleware/isAuthenticated');

const app = express();
const port = process.env.PORT || 8080;
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


app.use('/api/auth', auth);

app.use((req, res, next) => {
  if (port != '8080') {
    isAuth(req, res, next);
  } else {
    next();
  }
});

// routers
app.use('/api/users', users);
app.use('/api/events', events);
app.use('/api/guestlists', guestlists);
app.use('/api/attendees', attendees);
app.use('/api/invites', invites);
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.log(err.stack);
  return res.status(500).json({ error: 'You have encountered an error' });
});

app.listen(port, () => {
  console.log('app listening on port 8080!');
});

module.exports = app;
