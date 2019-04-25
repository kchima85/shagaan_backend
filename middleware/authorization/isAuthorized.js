const fs = require('fs');
const eventAuthZ = require('./routeAuthzLogic/eventsAuthZ');

const routes = `${fs.readdirSync('./routers').join('|')}`;
const regExp = `/${routes}/`;

module.exports = (req, res, next) => {
  const path = req.path.match(regExp);
  switch (path[0]) {
    case 'attendees':
      console.log(req.path);
      break;
    case 'events':
      eventAuthZ(req);
      break;
    case 'guestLists':
      console.log(req.path);
      break;
    case 'invites':
      console.log(req.path);
      break;
    case 'users':
      console.log(req.path);
      break;
    default:
      console.log(req.path);
  }
  next();
};
