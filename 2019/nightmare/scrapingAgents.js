/* eslint-disable import/no-extraneous-dependencies */
const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://techblog.willshouse.com/2012/01/03/most-common-user-agents/').then(
  response => {
    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const useragents = [];
      let totalLines = 0;
      $('td.useragent').each((index, element) => {
        const times = parseFloat(
          $(element)
            .prev()
            .text()
            .replace('%', ''),
          10
        );
        totalLines += Math.round(times);
        for (let i = 0; i < Math.round(times); ++i)
          useragents.push(
            $(element)
              .text()
              .trim()
          );
      });
      console.log(totalLines);
      console.log(JSON.stringify(useragents));
    }
  },
  error => console.log(error)
);
