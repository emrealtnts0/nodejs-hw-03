import express from 'express';
import contactsController from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createContactSchema, updateContactSchema } from '../schemas/contactSchema.js';

const router = express.Router();

// Apply ID validation middleware to all routes that use contactId
router.use('/:contactId', isValidId);

// GET /contacts with pagination, sorting, and filtering
router.get('/', contactsController.getContacts);

// GET single contact
router.get('/:contactId', contactsController.getContact);

// POST new contact with validation
router.post('/', validateBody(createContactSchema), contactsController.createContact);

// PATCH contact with validation
router.patch('/:contactId', validateBody(updateContactSchema), contactsController.updateContact);

// DELETE contact
router.delete('/:contactId', contactsController.deleteContact);

export default router;
