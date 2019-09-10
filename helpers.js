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
  // .find returns an empty array if no matches are found. .findOne returns null if no matches are found. Here all documents are needed.
  const latestDBDateAsObject = await Scrape.find({}, {date: 1}).sort({date: -1}).limit(1);
  // If latestDBDateASObject === [], then latestDBDateAsString will be null. Else, get the date
  const latestDBDateAsString = (latestDBDateAsObject.length == 0) ? null : (latestDBDateAsObject[0].date).toISOString().substring(2, 10);
  console.log(latestDBDateAsString)
  return latestDBDateAsString;
}

// URL:s for scraping
exports.getUrlAftonbladet = function() {
   return 'https://www.aftonbladet.se'
}
