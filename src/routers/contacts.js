import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateContact } from '../middlewares/validateContact.js';
import contactsController from '../controllers/contacts.js';

const router = express.Router();

// Get all contacts
router.get('/', ctrlWrapper(contactsController.getAllContacts));

// Get one contact
router.get('/:contactId', ctrlWrapper(contactsController.getContactById));

// Create new contact (with validation)
router.post('/', validateContact, ctrlWrapper(contactsController.createContact));

// Update contact (with validation)
router.patch('/:contactId', validateContact, ctrlWrapper(contactsController.updateContact));

// Delete contact
router.delete('/:contactId', ctrlWrapper(contactsController.deleteContact));

export default router;