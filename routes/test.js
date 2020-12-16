var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const url =
      'https://sheets.googleapis.com/v4/spreadsheets/1Zh88v2hhi6rtkuinKOM2wm3po2WgHEMjHW_96R7Chp8/values/Build%20Options?key=AIzaSyAAuybQ5ZyL2J8VYX0mNUQJcR5qtkUVbqY&majorDimension=COLUMNS';
    const response = await axios.get(url);

    console.log(response.data);

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
