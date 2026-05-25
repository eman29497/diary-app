const express = require('express');
const router = express.Router();
const Diary = require('../models/Diary');
router.get('/', async (req, res) => {
  try {
    const entries = await Diary.find().sort({ date: -1 }); 
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch entries" });
  }
});
router.post('/add', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newEntry = new Diary({ title, content });
    await newEntry.save();
    res.json(newEntry);
  } catch (err) {
    res.status(500).json({ error: "Failed to save entry" });
  }
});
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedEntry = await Diary.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ error: "Entry not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete entry" });
  }
});

module.exports = router;