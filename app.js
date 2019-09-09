const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');

// Create the Express app. Exported at the end of the file
const app = express();

// Avoid CORS block on client
app.use(cors());

// Set indentation to 2 spaces for response
app.set('json spaces', 2);

// Use routes from separate file
app.use('/', routes);

module.exports = app;
