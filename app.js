const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const Header = mongoose.model('Header');

// Create the Express app. Exported at the end of the file
const app = express();

const headerModel = new Header({title: 'Lördag', url: 'Pinn'});
headerModel.save()

/*
const urlAftonbladet = 'https://www.aftonbladet.se';
const scrapeResults = []
const anchorWithClassAndAttribute = "a._3xv_Q[data-test-id='teaser']";
const classForTitle = '._1Qq8L';

async function scrapeDomTree(urlToScrape) {
  
  try {
    const htmlResponse = await request.get(urlToScrape);
    const $ = await cheerio.load(htmlResponse);

    $(anchorWithClassAndAttribute).each((index, element) => {
      const title = $(element).find(classForTitle).text();
      const link = url + $(element).attr('href');
      const scrapeResult = { title, link };
      scrapeResults.push(scrapeResult);
    })

    console.log(scrapeResults);
    fs.writeFileSync('./test', html);
  } 
  
  catch (err) {
    console.error(err);
  }
}

scrapeDomTree(urlAftonbladet);


*/

module.exports = app;