const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// Database connection function
const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) return;
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected!");
    } catch (err) {
        console.error("MongoDB Error:", err);
    }
};

// Routes
const diaryRoutes = require('./routes/diaryRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/diaries', diaryRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send("Server is running...");
});

// Vercel deployment ke liye zaroori
connectDB();

// Export app for Vercel
module.exports = app;

// Local development ke liye (taake laptop par test kar sako)
if (process.env.NODE_ENV !== 'production') {
    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}