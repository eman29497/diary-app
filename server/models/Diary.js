const mongoose = require('mongoose');

const DiarySchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Diary', DiarySchema);