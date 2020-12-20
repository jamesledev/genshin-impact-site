var express = require('express');
var router = express.Router();
const axios = require('axios');
const fs = require('fs');

function forLoop(response) {
  const characterDeet = {};
  const characterNames = [];
  const charNamePos = 0;
  const charWeaponPos = 1;
  const charartiPos = 2;
  const charSGCPos = 3;
  const charSubstatPos = 4;
  const shortcut = response.data.values;
  for (var i = 1; i < shortcut.length; i++) {
    const characterDetail = shortcut[i];
    const name = characterDetail[charNamePos];
    const weapon = characterDetail[charWeaponPos];
    const arti = characterDetail[charartiPos];
    const sgc = characterDetail[charSGCPos];
    const substat = characterDetail[charSubstatPos];
    const characterDetails = {
      name,
      weapon,
      arti,
      sgc,
      substat,
    };
    characterDeet[name] = characterDetails;
    characterNames.push(name);
  }
  return { characterDeet, characterNames };
}
function imgNameGetter(directory) {
  const files = fs.readdirSync(directory);
  const artifactImages = [];
  files.forEach((file) => {
    const artifactType = file.split('-')[2].replace('.png', '');
    const artifactSet = file.split('-')[0];
    artifactImages.push({
      file,
      artifactType,
      artifactSet,
    });
  });
  return artifactImages;
}

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const url =
      'https://sheets.googleapis.com/v4/spreadsheets/1Zh88v2hhi6rtkuinKOM2wm3po2WgHEMjHW_96R7Chp8/values/Build%20Options?key=AIzaSyAAuybQ5ZyL2J8VYX0mNUQJcR5qtkUVbqY&majorDimension=ROWS';
    const response = await axios.get(url);
    const { characterDeet, characterNames } = forLoop(response);
    const imgNames = imgNameGetter('./public/images');
    const genshinObject = {
      characterDeet,
      characterNames,
      chracterDeetString: JSON.stringify(characterDeet),
      chracterNamestString: JSON.stringify(characterNames),
      imgNames,
    };
    // console.log(genshinObject);

    res.render('index', genshinObject);
  } catch (error) {
    const message =
      error.response && error.response.status === 404
        ? 'Something is wrong here...'
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
