
# Birthday SMS Reminder Application

This application is a Node.js-based system designed to automatically send SMS reminders on a contact's birthday. It uses the Twilio API for SMS sending and MongoDB for contact management. The application consists of a backend API built with Express.js. A daily cron job checks for birthdays and sends out personalized SMS messages. Perfect for those who forget thier contacts Birthdays regularily. 

## Features

- **Contact Management**: Manage contacts through a RESTful API. Each contact includes a name, phone number, and birthday.
  
- **Automated Birthday SMS**: Automatically sends SMS messages to contacts on their birthday using the Twilio API. The message can be personalized with the contact’s name.
  
- **Daily Cron Job**: A scheduled cron job runs every day at a specified time to check for contacts with birthdays on that day and sends out birthday messages accordingly.
  
- **Twilio Integration**: Seamless integration with Twilio for SMS sending. You can configure your Twilio account credentials in the `.env` file.

- **MongoDB Database**: Contacts are stored in a MongoDB database, making it easy to manage and scale as the contact list grows.

## Project Structure

The application is divided into the following parts:

### Backend

- **Express.js API**: The backend provides RESTful API endpoints for managing contacts. It handles the business logic, including CRUD operations and sending SMS messages through Twilio.
  
- **MongoDB**: The application connects to a MongoDB database to store contact details, including their name, phone number, birthday, and the last time a message was sent.

- **Cron Jobs**: Scheduled tasks are managed using the `node-cron` package. These jobs run daily to check for birthdays and send SMS reminders.


## Usage

1. **Managing Contacts**: Use the API to add contacts with their name, phone number, and birthday.

2. **Automated SMS Sending**: The cron job runs daily, so there is no need for manual intervention to send birthday messages. The system will handle everything automatically.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Twilio API, node-cron
- **Database**: MongoDB (cloud or local)

## Future Improvements 

1. **Add Frontend**
2. **Dockerize the Application**
3. **Add AI generated personal messaged**




