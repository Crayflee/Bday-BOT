// cronJobs.js
const cron = require('node-cron');
const Contact = require('../models/contactModel');
const { sendBirthdayMessage } = require('../services/twilioService');


cron.schedule('0 9 * * *', async () => { // Täglich um 9 Uhr morgens
    const today = new Date().toISOString().slice(0, 10);
    
    try {
        const contacts = await Contact.find({
            birthday: { $eq: new Date(today) }
        });
        
        contacts.forEach(contact => {
            sendBirthdayMessage(contact.phone, `Happy Birthday, ${contact.name}!`); // Nachricht ggf. weiter personalisieren (Open AI API ? )
            contact.lastSent = new Date(); // Update, wann die letzte Nachricht gesendet wurde überhaupt sinnvoll bei 1x im Jahr ? 
            contact.save(); // save aus mongoose library 
        });
    } catch (error) {
        console.error('Error checking birthdays:', error);
    }
});
