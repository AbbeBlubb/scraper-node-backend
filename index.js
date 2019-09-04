const request = require('request-promise');
const cheerio = require('cheerio');

const url = 'https://www.aftonbladet.se';
const scrapeResults = []
const anchorWithClassAndAttribute = "a._3xv_Q[data-test-id='teaser']";
const classForTitle = '._1Qq8L';

async function scrapeAftonbladet() {
  
  try {
    const htmlResponse = await request.get(url);
    const $ = await cheerio.load(htmlResponse);

    $(anchorWithClassAndAttribute).each((index, element) => {
      const title = $(element).find(classForTitle).text();
      const link = url + $(element).attr('href');
      const scrapeResult = { title, link };
      scrapeResults.push(scrapeResult);
    })

    console.log(scrapeResults);
  } 
  
  catch (err) {
    console.error(err);
  }
}

scrapeAftonbladet();
