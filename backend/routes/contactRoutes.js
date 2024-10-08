// routes/contactRoutes.js

//Apiroutes 
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/contacts', contactController.createContact);
router.get('/contacts', contactController.getAllContacts);
router.delete('/contacts/:id', contactController.deleteContact);
router.put('/contacts/:id', contactController.updateContact);



module.exports = router;
