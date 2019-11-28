const mongoose = require('mongoose');

const scrapeSchema = new mongoose.Schema({
  date: Date,
  publication: String,
  headers: [
    {
      title: String,
      url: String
    }
  ]
});

module.exports = mongoose.model('Scrape', scrapeSchema);

/*

Visualisation of the Scrape model:

const scrapeModel = new Scrape({
  date: Date(),
  publication: 'Aftonbladet',
  headers: [
    {
      title: 'Titel',
      url: 'URL',
    }
  ]});
scrapeModel.save()

*/
