/* eslint-disable no-console */
const Nightmare = require('nightmare');
const db = require('./databases');

const isMobile = Math.random() < 0.4;

const randomUserAgent = isMobile ? db.getRandomMobileUserAgent() : db.getRandomDesktopUserAgent();
console.log('User Agent:', randomUserAgent);
const randomResolution = isMobile ? db.getRandomMobileResolution() : db.getRandomDesktopResolution();
console.log('Resolution:', randomResolution[0], 'x', randomResolution[1]);

const getRandomTimeout = () => {
  const timeout = 30000 + Math.floor(Math.random() * 20000);
  console.log('Waiting', timeout / 1000, 'seconds');
  return timeout;
};

const getRandomPagesPath = () => {
  const probabilities = [0, 0.2, 0.3, 0.4, 0.7, 1];
  const randomNum = Math.random();
  let pathLength;
  let i = 0;
  while (randomNum > probabilities[++i]) pathLength = i;
  let path = [1, 2, 3, 4].sort(() => Math.random() - 0.5).slice(0, pathLength);
  path = Math.random() < 0.5 ? path : [5].concat(path);
  return path;
};

const path = getRandomPagesPath();
const pathLength = path.length;
console.log('Path:', path);

const getNextPage = path => {
  const nextPage = path.pop();
  console.log('Next Page:', nextPage);
  return nextPage;
};

const nightmare = Nightmare({
  show: true,
  waitTimeout: 120000,
  width: randomResolution[0],
  height: randomResolution[1],
});

nightmare
  .useragent(randomUserAgent)
  .viewport(randomResolution[0], randomResolution[1])
  .goto('http://uxp.mx/mtouch/')
  .wait(getRandomTimeout());

for (let i = 0; i < pathLength; i++)
  nightmare.click(`#menu > a:nth-of-type(${getNextPage(path)})`).wait(getRandomTimeout());

nightmare.end().catch(error => {
  console.error('Search failed:', error);
});

nightmare.cookies.clearAll();
