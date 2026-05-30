const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();
app.use(express.json());

app.use(cors({
  origin:"*",
  methods:['GET','POST','PUT','DELETE']
}));

const diaryRoutes = require('./routes/diaryRoutes');
const authRoutes = require('./routes/authRoutes');

const MONGO_URI = process.env.MONGO_URI; 

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.log("MongoDB Connection Error:", err));


app.use('/api/diaries', diaryRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send("Server is running...");
});

const PORT = 5000;
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;