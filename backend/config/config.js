// config/config.js

require('dotenv').config(); // Load environment variables from .env file

module.exports = {
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        phoneNumber: process.env.TWILIO_PHONE_NUMBER
    },
    database: {
        uri: process.env.MONGODB_URI
    }
};
