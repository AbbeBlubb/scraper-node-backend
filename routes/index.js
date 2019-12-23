const request = require('request-promise');
const cheerio = require('cheerio');
const express = require('express');
const router = express.Router();
const Scrape = require('../models/Scrape.js');
const helpers = require('../helpers');


async function scrapeDomTree(urlToScrape) {

// Vars with dates. They are in the async function because of a needed await
const todaysDate = helpers.getTodaysDate();
const latestDate = await helpers.getLatestDBdate();
//console.log(todaysDate, latestDate)

  // When testing, make this if to true, to avoid fetch from DB
  if (todaysDate !== latestDate) {
    try {

      // Vars for scraping Aftonbladet
      const scrapeResults = [];
      const anchorWithClassAndAttribute = "a.HLf1C";
      const classForTitle = 'h3._2mFB0, h3.XucU-, h3._3-mRA';
      const baseUrl = 'https://www.aftonbladet.se';

      // Get the DOM tree
      const htmlResponse = await request.get(urlToScrape);
      console.log('!! The scraper has scraped the site');
      const $ = cheerio.load(htmlResponse);

      // Select data
      $(anchorWithClassAndAttribute).each((index, element) => {
        const title = $(element).find(classForTitle).text();
        const url = $(element).attr('href').startsWith('https') ? $(element).attr('href') : baseUrl + $(element).attr('href');
        const scrapeResult = { title, url };
        scrapeResults.push(scrapeResult);
      });

      // Construct the document
      const scrapeModel = new Scrape({
        date: Date(),
        publication: 'Aftonbladet',
        headers: scrapeResults
      });

      // Write to DB
      scrapeModel.save();

      // Return the newly scraped data directly whitout getting it from the DB. Must be put in an array, as the frontend is adapted to the data structure from the DB, which is an array with objects
      return [scrapeModel];
    }

    catch (err) {
      console.error(err);
    }

  } else {
      console.log('!! The scraper has returned a cached copy');
      // Return the latest written document from the DB
      return await Scrape.find({}).sort({date: -1}).limit(1);
    }
}


// Routes. Exported at the end of the file
router.get('/aftonbladet', async function(req, res){

  // Run the scraper and load the data
  const data = await scrapeDomTree(helpers.getUrlAftonbladet());
  
  // Response to JSON
  res.json(data);
});

module.exports = router;
