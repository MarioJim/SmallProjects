const request = require("request");
const yargs = require("yargs");

const api = require("./secrets");

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: "address",
            describe: "Address to fetch weather for",
            string: true
        }
    })
    .help()
    .alias("help", "h")
    .argv;

let encodedAddress = encodeURIComponent(argv.a);

request({
    url: `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${api.APIKEY}`,
    json: true
}, (error, response, body) => {
    console.log(`Place: ${body.results[0].formatted}`);
    console.log(`Latitude: ${body.results[0].geometry.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.lng}`);
});