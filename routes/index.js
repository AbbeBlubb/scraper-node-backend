const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Header = mongoose.model('Header');
const helpers = require('../helpers');
const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');


// Initialize the model
const headerModel = new Header({title: 'Lördag', url: 'Pinn'});
headerModel.save()

// Vars with dates
const today = helpers.getDate();
const latestDate = fs.readFileSync('./data/latest-date.txt', 'utf-8')

// Vars for scraping
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
      fs.writeFileSync('./data/latest-scrape.js', JSON.stringify(scrapeResults, null, 2), 'utf-8');
      fs.writeFileSync('./data/latest-date.txt', today, 'utf-8' );

      // Write to DB

      // Return the newly scraped data
      return scrapeResults
    } 
    
    catch (err) {
      console.error(err);
    }

  } else {
      // Returnera senaste sparade data
      return fs.readFileSync('./data/latest-scrape.js', 'utf-8')
    }
}




// Routes. Exported at the end of the file
router.get('/test', async function(req, res){

  //data to user = kör scrapern och få tillbaka svar. scrapeDomTree(urlAftonbladet);
  const data = await scrapeDomTree(urlAftonbladet);

  res.json(data)
});

module.exports = router;
