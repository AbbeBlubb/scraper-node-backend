const mongoose = require('mongoose');

const headerSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const Header = mongoose.model("Header", headerSchema);

module.exports = Header;
