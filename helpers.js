const moment = require('moment');

exports.getTime = function() {
  const currentdate = new Date();
  return (currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds());
};

exports.getDate = function() {
  return moment().format('YYMMDD');
}