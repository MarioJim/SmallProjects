const request = require("request");

const api = require("../secrets");

let getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${api.FORECAST_APIKEY}/${lat},${lng}?units=si&exclude=hourly`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200)
            callback(undefined, {
                temperature: body.currently.temperature,
                appTemperature: body.currently.apparentTemperature
            });
        else
            callback("Unable to fetch weather.");
    });
};

module.exports = {
    getWeather
};