// models/contactModel.js
// MongoDb Schema für Contacts


const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    lastSent: {
        type: Date
    },
    keyWords: {
        type: String
    }
});

module.exports = mongoose.model('Contact', contactSchema);
