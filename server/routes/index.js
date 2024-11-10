var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // Example of additional health checks
  const healthCheck = {
    message: 'Server is healthy!',
    status: 'OK',
    uptime: process.uptime(),
  };

  res.json(healthCheck);
});

module.exports = router;
