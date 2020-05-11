const pool = require('../../../tools/pgConnect');
const fileReader = require('../../../tools/fileReader')('./middleware/authorization/queries/');

module.exports = (req) => {
  console.log(req.path);
  console.log(req.user);
};
