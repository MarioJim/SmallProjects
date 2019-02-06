const request = require("request");

const api = require("../secrets");

const geocodeAddress = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    request({
        url: `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${api.GEOCODE_APIKEY}`,
        json: true,
    }, (error, response, body) => {
        if (error)
            callback("Unable to connect to the servers.");
        else if (body.results.length === 0)
            callback("Unable to find that address.");
        else
            callback(undefined, {
                address: body.results[0].formatted,
                lat: body.results[0].geometry.lat,
                lng: body.results[0].geometry.lng,
            });
    });
};

module.exports = {
    geocodeAddress,
};
