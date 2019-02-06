const axios = require("axios");

const fixerAPIKey = require("./secrets").fixerApiKey;

const getExchangeRate = async (from, to) => {
    try {
        const fixerURL = `http://data.fixer.io/api/latest?access_key=${fixerAPIKey}`;
        const response = await axios.get(fixerURL);
        const from2euro = response.data.rates[from];
        const euro2to = response.data.rates[to];
        if (isNaN(from2euro) || isNaN(euro2to))
            throw new Error();
        return euro2to / from2euro;
    } catch (e) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
    }
};

const getCountries = async (curr) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${curr.toLowerCase()}`);
        return response.data.map(country => country.name);
    } catch (e) {
        throw new Error(`Unable to get countries that use ${curr}`);
    }
};

const convertCurrency = async (from, to, amount) => {
    const rate = await getExchangeRate(from, to);
    const convertedAmount = (amount * rate).toFixed(2);
    const countries = await getCountries(to);
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(", ")}`;
};

convertCurrency("USD", "MXN", 60)
    .then((message) => {
        console.log(message);
    })
    .catch(e => console.log(e.message));

const add = async (a, b) => a + b;

const doWork = async () => {
    try {
        const result = await add(12, 18);
        return result;
    } catch (e) {
        return 10;
    }
};

doWork()
    .then(data => console.log(data))
    .catch(() => console.log("Something went wrong"));
