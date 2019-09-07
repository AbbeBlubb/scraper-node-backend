const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const Header = mongoose.model('Header');
const helpers = require('./helpers');
const cors = require('cors');
const routes = require('./routes/index');

// Create the Express app. Exported at the end of the file
const app = express();

// Avoid CORS block on client
app.use(cors());

// Set indentation to 2 spaces for response
app.set('json spaces', 2);

// Use rotes from separate file
app.use('/', routes);





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
    } 
    
    catch (err) {
      console.error(err);
    }
  }
}

scrapeDomTree(urlAftonbladet);

module.exports = app;
