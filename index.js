const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const mongoose = require('mongoose');
const Header = require("./model/Header"); 

// Import .env-vars
require('dotenv').config();

// Connect to DB, tell Mongoose to use ES6 promises, handle errors, inform about connection
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/"
mongoose.connect(mongoUrl, { useNewUrlParser: true, dbName: 'scraper-node' })
mongoose.Promise = global.Promise;
mongoose.connection.on("error", err => {
  console.error("Message from index.js on connection error: ", err.message)
  console.error("Hela error-objektet: ", err)
})
mongoose.connection.once("open", () => {
  console.log(
    "## scraper-node  is connected to mongodb ##",
    "\n## " + mongoUrl + " ##"
  )
})

// Import models if needed - but the Taskmanager app right now only GET data, there's no POST / PUT / DELETE
const headerModel = new Header({title: 'Linn', url: 'Pinn'});
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







// Start the app
const app = require('./app');
const port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log(
    "## Listening on port " + port + " ##" + "\n## Time is: " + helpers.getTime() + " ##"
  )
});

*/