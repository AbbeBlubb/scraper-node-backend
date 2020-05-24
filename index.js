const mongoose = require('mongoose');
const helpers = require('./helpers');


// Import .env-vars
//require('dotenv').config();


// Connect to DB, tell Mongoose to use ES6 promises, handle errors, inform about connection in console
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/"
mongoose.connect(mongoUrl, { useNewUrlParser: true, dbName: 'scraper' })
mongoose.Promise = global.Promise;
mongoose.connection.on("error", err => {
  console.error("Message from index.js on connection error: ", err.message)
  console.error("Error object: ", err)
})
mongoose.connection.once("open", () => {
  console.log(
    "## scraper-node  is connected to mongodb ##",
    "\n## " + mongoUrl + " ##"
  )
})


// Import the models for the app. Will be constructed in routes/index.js
require('./models/Scrape'); 


// Start the app
const app = require('./app');
const port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log(
    "## Listening on port " + port + " ##" + "\n## Time is: " + helpers.getTime() + " ##"
  )
});
