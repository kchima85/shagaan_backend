const { Pool } = require('pg');
const { pgConfig } = require('../config/config.js');

const pool = new Pool(pgConfig);

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
