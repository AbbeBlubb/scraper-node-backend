//const fs = require('fs');
const request = require('request-promise');
const cheerio = require('cheerio');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Scrape = mongoose.model('Scrape');
const helpers = require('../helpers');


 async function getLatestDBdate () {
  const latestDBdateObject = await Scrape.find({}, {date: 1}).sort({date: -1}).limit(1);
  const latestDBdate = latestDBdateObject[0].date
  //const shortDate = latestDBdate.split('T')[0].substring(2)
  console.log('test', latestDBdate);
  return latestDBdate
}
getLatestDBdate()

// Initialize the model
//const scrapeModel = new Scrape()

// Vars with dates
const today = helpers.getDate();
//const latestDate = fs.readFileSync('./data/latest-date.txt', 'utf-8')
const latestDate = '19-09-09'
console.log(today, latestDate)

// URL:s for scraping
const urlAftonbladet = 'https://www.aftonbladet.se';


async function scrapeDomTree(urlToScrape) {
  
  if (today !== latestDate) {
    try {

      // Vars for scraping Aftonbladet 
      const scrapeResults = []
      const anchorWithClassAndAttribute = "a._3xv_Q[data-test-id='teaser']";
      const classForTitle = '._1Qq8L';
      const baseUrl = 'https://www.aftonbladet.se';

      // Get the DOM tree
      const htmlResponse = await request.get(urlToScrape); 
      console.log('!! The scraper has scraped the site')
      const $ =  cheerio.load(htmlResponse);

      // Select data
      $(anchorWithClassAndAttribute).each((index, element) => {
        const title = $(element).find(classForTitle).text();
        const url = baseUrl + $(element).attr('href');
        const scrapeResult = { title, url };
        scrapeResults.push(scrapeResult);
      })

      // Save the data + scraping date, in case you want to experiment and avoid repeated scrapes
      // fs.writeFileSync(file, data[, options])
      // JSON.stringify(value[, replacer[, space]])
      //fs.writeFileSync('./data/latest-scrape.json', JSON.stringify(scrapeResults), 'utf-8');
      //fs.writeFileSync('./data/latest-date.txt', today, 'utf-8' );

      // Construct the document
      const scrapeModel = new Scrape({
        date: Date(),
        publication: 'Aftonbladet',
        headers: scrapeResults
      })

      // Write to DB
      scrapeModel.save();

      // Return the newly scraped data
      return scrapeModel
    } 
    
    catch (err) {
      console.error(err);
    }

  } else {
      // Returnera senaste sparade data. Parsa till JS iom att response sker i json för att matcha scraperns return
      //console.log('!! Loaded local file');
      //return JSON.parse(fs.readFileSync('./data/latest-scrape.json', 'utf-8'));

      // Return the latest written document from the DB
      return await Scrape.find({}).sort({date: -1}).limit(1);
    }
}


// Routes. Exported at the end of the file
router.get('/aftonbladet', async function(req, res){

  // Run the scraper and load the data
  const data = await scrapeDomTree(urlAftonbladet);
  
  // Response to JSON
  res.json(data)
});

module.exports = router;
