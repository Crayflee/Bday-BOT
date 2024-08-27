// server.js

require('dotenv').config(); // Lädt Umgebungsvariablen aus der .env-Datei
const express = require('express');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactRoutes');
const cronJobs = require('./jobs/cronJobs'); // Importiere und starte Cron-Jobs

const app = express();

// Middleware
app.use(express.json()); // Zum Parsen von JSON im Request-Body

// Routen
app.use('/api', contactRoutes); // Bindet die Kontakt-API-Routen ein

// MongoDB-Verbindung
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
