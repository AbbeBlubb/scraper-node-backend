const fs = require('fs');
const request = require('request-promise');
const cheerio = require('cheerio');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Header = mongoose.model('Header');
const helpers = require('../helpers');


// Initialize the model
const headerModel = new Header({title: 'Lördag', url: 'Pinn'});
headerModel.save()

// Vars with dates
const today = helpers.getDate();
const latestDate = fs.readFileSync('./data/latest-date.txt', 'utf-8')

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
        const link = baseUrl + $(element).attr('href');
        const scrapeResult = { title, link };
        scrapeResults.push(scrapeResult);
      })

      // Save the data + scraping date, in case you want to experiment and avoid repeated scrapes
      // fs.writeFileSync(file, data[, options])
      // JSON.stringify(value[, replacer[, space]])
      fs.writeFileSync('./data/latest-scrape.json', JSON.stringify(scrapeResults), 'utf-8');
      fs.writeFileSync('./data/latest-date.txt', today, 'utf-8' );

      // Write to DB

      // Return the newly scraped data
      return scrapeResults
    } 
    
    catch (err) {
      console.error(err);
    }

  } else {
      // Returnera senaste sparade data. Parsa till JS iom att response sker i json för att matcha scraperns return
      console.log('!! Loaded local file');
      return JSON.parse(fs.readFileSync('./data/latest-scrape.json', 'utf-8'));
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
