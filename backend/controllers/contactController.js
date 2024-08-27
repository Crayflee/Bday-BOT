// controllers/contactController.js

const Contact = require('../models/contactModel');


// This function exports a function that creates a new contact in the database.
// It uses the express framework to handle the request and response objects.
// The function uses the async/await syntax to handle asynchronous operations.
// The function returns a Promise that resolves to the JSON response containing the newly created contact.
exports.createContact = async (req, res) => {
  try {
    // Extract the name, phone number, and birthday from the request body
    const { name, phone, birthday } = req.body;

    // Check if all required fields are provided
    // If any of the fields are missing, return a 400 error with a message indicating which fields are required
    if (!name || !phone || !birthday) {
      return res
        .status(400)
        .json({ message: 'Name, Phone, and Birthday are required.' });
    }

    // Format the birthday to a Date object
    const formattedBirthday = new Date(birthday);

    // Check if the formatted birthday is valid
    // If the birthday is not in a valid format, return a 400 error with a message indicating the required format
    if (isNaN(formattedBirthday.getTime())) {
      return res
        .status(400)
        .json({ message: 'Invalid Birthday format. Please use ISO 8601.' });
    }

    // Create a new contact object with the extracted fields
    const contact = new Contact({
      name,
      phoneNumber: phone,
      birthday: formattedBirthday,
    });

    // Save the contact object to the database
    const savedContact = await contact.save();

    // Return a 201 status with the newly created contact as a JSON response
    res.status(201).json(savedContact);
  } catch (error) {
    // If an error occurs during the process of creating the contact, log the error
    console.error('Error creating contact:', error);
    // Return a 500 status with a generic error message
    res.status(500).json({ message: 'Error creating contact' });
  }
};

// This function exports a function that retrieves all contacts from the database
// and sends them back to the client in a JSON format.
// It uses the express framework to handle the request and response objects.
// The function uses the async/await syntax to handle asynchronous operations.
// The function returns a Promise that resolves to the JSON response containing all contacts.
exports.getAllContacts = async (req, res) => {
  try {
    // Find all contacts in the database and store the result in the 'contacts' variable.
    const contacts = await Contact.find();

    // If the 'contacts' array is not empty, set 'formattedContacts' to the 'contacts' array.
    // Otherwise, set 'formattedContacts' to an empty array.
    const formattedContacts = contacts?.length ? contacts : [];

    // Send a JSON response with a status of 200 and the 'formattedContacts' array as the body.
    res.status(200).json(formattedContacts);
  } catch (error) {
    // If an error occurs during the database query, log the error to the console.
    console.error('Error retrieving contacts:', error);

    // Send a JSON response with a status of 500 and a message indicating that the contacts could not be retrieved.
    res.status(500).json({ message: 'Failed to retrieve contacts' });
  }
};

/**
 * This function exports a function that retrieves a contact from the database
 * based on the provided ID and sends it back to the client in a JSON format.
 * It uses the express framework to handle the request and response objects.
 * The function uses the async/await syntax to handle asynchronous operations.
 * The function returns a Promise that resolves to the JSON response containing the contact.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A Promise that resolves to the JSON response containing the contact.
 */
exports.getContactById = async (req, res) => {
  try {
    // Extract the ID from the request parameters and store it in the 'id' variable.
    const { id } = req.params;

    // If the 'id' is not provided, return a 400 status with a message indicating that the ID is required.
    if (!id) {
      return res.status(400).json({ message: 'Contact ID is required' });
    }

    // Use the MongoDB 'findById' method to find a contact in the database based on the provided ID.
    // Store the result in the 'contact' variable.
    const contact = await Contact.findById(id).exec();

    // If the 'contact' is not found in the database, return a 404 status with a message indicating that the contact was not found.
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Return a 200 status with the contact as a JSON response.
    return res.status(200).json(contact);
  } catch (error) {
    // If an error occurs during the process of retrieving the contact, log the error to the console.
    console.error('Error getting contact by ID:', error);
    // Return a 500 status with a generic error message.
    return res.status(500).json({ message: 'Failed to get contact' });
  }
};

/**
 * This function exports a function that updates a contact in the database
 * based on the provided ID and sends the updated contact back to the client
 * in a JSON format. It uses the express framework to handle the request and
 * response objects. The function uses the async/await syntax to handle
 * asynchronous operations. The function returns a Promise that resolves to
 * the JSON response containing the updated contact.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A Promise that resolves to the JSON response containing the updated contact.
 */
exports.updateContact = async (req, res) => {
  try {
    // Extract the ID and the updated contact information from the request parameters and the request body,
    // and store them in the 'id' and 'contactInfo' variables, respectively.
    const { id } = req.params;
    const { name, phoneNumber, birthday } = req.body;

    // Check if the 'id' is not provided. If it is not provided, return a 400 status with a message indicating that the ID is required.
    if (!id) {
      return res.status(400).json({ message: 'Contact ID is required' });
    }

    // Use the MongoDB 'findByIdAndUpdate' method to find the contact in the database based on the provided ID
    // and update its name, phone number, and birthday with the values from the 'contactInfo' object.
    // Store the result in the 'updatedContact' variable.
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, phoneNumber, birthday },
      { new: true } // Return the updated contact instead of the original contact.
    );

    // Check if the 'updatedContact' is not found in the database. If it is not found, return a 404 status with a message indicating that the contact was not found.
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Return a 200 status with the updated contact as a JSON response.
    res.status(200).json(updatedContact);
  } catch (error) {
    // If an error occurs during the process of updating the contact, log the error to the console.
    console.error('Error updating contact:', error);
    // Return a 500 status with a generic error message and the error object.
    res.status(500).json({ message: 'Failed to update contact', error });
  }
};

/**
 * This function exports a function that deletes a contact from the database
 * based on the provided ID and sends a success message back to the client
 * in a JSON format. It uses the express framework to handle the request and
 * response objects. The function uses the async/await syntax to handle
 * asynchronous operations. The function returns a Promise that resolves to
 * the JSON response containing the success message.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A Promise that resolves to the JSON response containing the success message.
 */
exports.deleteContact = async (req, res) => {
    try {
        // Extract the ID from the request parameters and store it in the 'contactId' variable.
        const contactId = req.params.id;

        // Use the MongoDB 'findByIdAndDelete' method to find the contact in the database based on the provided ID
        // and delete it from the database. Store the result in the 'deletedContact' variable.
        const deletedContact = await Contact.findByIdAndDelete(contactId);

        // Check if the 'deletedContact' is not found in the database. If it is not found, return a 404 status with a message indicating that the contact was not found.
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        // Return a 200 status with a success message as a JSON response.
        return res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        // If an error occurs during the process of deleting the contact, log the error to the console.
        console.error('Error deleting contact:', error);
        // Return a 500 status with a generic error message and the error object.
        return res.status(500).json({ message: 'Failed to delete contact', error });
    }
};
