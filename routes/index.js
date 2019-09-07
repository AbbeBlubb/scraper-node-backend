const express = require('express');
const router = express.Router();
const Header = mongoose.model('Header');
const helpers = require('./helpers');
const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const mongoose = require('mongoose');


// Initialize the model
const headerModel = new Header({title: 'Lördag', url: 'Pinn'});
headerModel.save()

// Vars with dates
const today = helpers.getDate();
const latestDate = fs.readFileSync('./data/latest-date.txt', 'utf-8')

// Vars for scraping
const urlAftonbladet = 'https://www.aftonbladet.se';
const scrapeResults = []
const anchorWithClassAndAttribute = "a._3xv_Q[data-test-id='teaser']";
const classForTitle = '._1Qq8L';


async function scrapeDomTree(urlToScrape) {
  
  if (today !== latestDate) {
    try {
      const htmlResponse = await request.get(urlToScrape);
      const $ =  cheerio.load(htmlResponse);

      $(anchorWithClassAndAttribute).each((index, element) => {
        const title = $(element).find(classForTitle).text();
        const link = urlAftonbladet + $(element).attr('href');
        const scrapeResult = { title, link };
        scrapeResults.push(scrapeResult);
      })

      // Save the data
      // fs.writeFileSync(file, data[, options])
      // JSON.stringify(value[, replacer[, space]])
      fs.writeFileSync('./data/latest-scrape.js', JSON.stringify(scrapeResults, null, 2), 'utf-8');
      fs.writeFileSync('./data/latest-date.js', );

      // Returnera data
    } 
    
    catch (err) {
      console.error(err);
    }
  } else {
      // Returnera data
  }
}




// Routes. Exported at the end of the file
router.get('/test', function(req, res){

    //data to user = kör scrapern och få tillbaka svar. scrapeDomTree(urlAftonbladet);
    res.json('hej')
});

module.exports = router;
