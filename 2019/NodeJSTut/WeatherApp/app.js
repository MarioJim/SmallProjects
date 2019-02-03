const yargs = require("yargs");

const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

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

geocode.geocodeAddress(argv.address, (error, gResult) => {
    if (error)
        console.log(error);
    else {
        console.log(gResult.address);
        weather.getWeather(gResult.lat, gResult.lng, (error, wResult) => {
            if (error)
                console.log(error);
            else
                console.log(`It's currently ${wResult.temperature} C, but it feels like ${wResult.appTemperature} C`);
        });
    }
});