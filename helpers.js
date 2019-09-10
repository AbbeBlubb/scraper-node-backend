const Scrape = require('./models/Scrape.js');

// Time for the console, to see when changes have been done
exports.getTime = function() {
  const currentdate = new Date();
  return (currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds());
};

// Today's date to compare with the latest DB date
exports.getTodaysDate = function() {
  return (new Date()).toISOString().substring(2, 10);
}

// Latest date for write to DB
exports.getLatestDBdate = async function() {
  const latestDBDateAsObject = await Scrape.find({}, {date: 1}).sort({date: -1}).limit(1);
  const latestDBDateAsString = await (latestDBDateAsObject[0].date).toISOString().substring(2, 10);
  return latestDBDateAsString;
}

// URL:s for scraping
exports.getUrlAftonbladet = function() {
   return 'https://www.aftonbladet.se'
}
