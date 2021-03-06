const yargs = require('yargs');
const axios = require('axios');

const api = require('./secrets');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true,
    },
  })
  .help()
  .alias('help', 'h').argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeURL = `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${api.GEOCODE_APIKEY}`;

axios
  .get(geocodeURL)
  .then(response => {
    if (response.data.results.length === 0) throw new Error('Unable to find that address.');
    console.log(`Address: ${response.data.results[0].formatted}`);
    const { lat, lng } = response.data.results[0].geometry;
    const weatherURL = `https://api.darksky.net/forecast/${api.FORECAST_APIKEY}/${lat},${lng}?units=si&exclude=hourly`;
    return axios.get(weatherURL);
  })
  .then(response => {
    const { temperature } = response.data.currently;
    const appTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature} C, but it feels like ${appTemperature} C`);
  })
  .catch(e => {
    if (e.code === 'ENOTFOUND') console.log('Unable to connect to API servers.');
    else console.log(e.message);
  });
