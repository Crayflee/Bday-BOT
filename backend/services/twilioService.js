// services/twilioService.js

const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);


/**
 * Function to send a birthday message to a recipient via Twilio.
 * This function takes in two parameters: 
 * - recipientPhoneNumber: the phone number of the recipient of the message.
 * - birthdayMessage: the message to be sent.
 *
 * The function returns a Promise that resolves to the SID of the sent message.
 * If an error occurs during the process of sending the message, the function
 * will throw an error with the message "Failed to send birthday message."
 *
 * @param {string} recipientPhoneNumber - The phone number of the recipient of the message.
 * @param {string} birthdayMessage - The message to be sent.
 * @return {Promise<string>} A Promise that resolves to the SID of the sent message.
 * @throws {Error} If an error occurs during the process of sending the message.
 */
const sendBirthdayMessage = async (recipientPhoneNumber, birthdayMessage) => {
    try {
        // Create an object with the options for sending the message.
        // The options include the message body, the recipient's phone number,
        // and the phone number of the sender.
        const twilioMessageOptions = {
            body: birthdayMessage, // The message to be sent.
            to: recipientPhoneNumber, // The phone number of the recipient.
            from: process.env.TWILIO_PHONE_NUMBER // The phone number of the sender.
        };

        // Use the Twilio client to send the message and return the SID of the sent message.
        const message = await client.messages.create(twilioMessageOptions);
        return message.sid; // Return the SID of the sent message.
    } catch (error) {
        // If an error occurs during the process of sending the message,
        // throw an error with the message "Failed to send birthday message."
        throw new Error('Failed to send birthday message.');
    }
}

module.exports = {
    sendBirthdayMessage
};
