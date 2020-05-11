/* eslint no-unused-expressions: ["error", { "allowTernary": true }] */
module.exports = (req, res, next) => {
  if (!req.user) {
    req.path === '/api/invites/sms' ? next() : res.redirect('/api/auth/login');
  } else {
    console.log('else block');
    next();
  }
};
