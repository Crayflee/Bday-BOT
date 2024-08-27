// server.js
// Apllication Startpoint 


require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactRoutes');
const cronJobs = require('./jobs/cronJobs'); // Import and start Cron Jobs 

const app = express();


app.use(express.json()); // Parse JSON in request Body 

app.use('/api', contactRoutes); // Binds API Routes

// MongoDB-Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
