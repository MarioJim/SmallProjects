const request = require("request");

const api = require("../secrets");

const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        const encodedAddress = encodeURIComponent(address);
        request({
            url: `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${api.GEOCODE_APIKEY}`,
            json: true,
        }, (error, response, body) => {
            if (error)
                reject("Unable to connect to the servers.");
            else if (body.results.length === 0)
                reject("Unable to find that address.");
            else
                resolve({
                    address: body.results[0].formatted,
                    lat: body.results[0].geometry.lat,
                    lng: body.results[0].geometry.lng,
                });
        });
    });
};

geocodeAddress("").then((location) => {
    console.log(JSON.stringify(location, undefined, 4));
}, (error) => {
    console.log(error);
});
