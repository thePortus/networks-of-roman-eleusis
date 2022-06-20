const rateLimit = require('express-rate-limit');

const allowlist = ['128.0.0.1'];

module.exports = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'too many requests sent by this ip, please try again in an hour !',
  skip: (request, response) => allowlist.includes(request.ip),
});
