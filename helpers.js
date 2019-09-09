const moment = require('moment');
const mongoose = require('mongoose');
//const Scrape = mongoose.model('Scrape');

exports.getTime = function() {
  const currentdate = new Date();
  return (currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds());
};

exports.getDate = function() {
  return moment().format('YY-MM-DD');
}


