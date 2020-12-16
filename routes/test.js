var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    res.render('index', { title: 'Express' });
  } catch (error) {
    const message =
      error.response && error.response.status === 404
        ? 'Some is wrong here...'
        : 'Generic Error';
    res.render('error', {
      message,
      error: {
        stack: error.stack,
        status:
          error.response && error.response.status ? error.response.status : '',
      },
    });
  }
});

module.exports = router;
