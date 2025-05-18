import createHttpError from 'http-errors';
import * as contactsService from '../services/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const getAllContactsController = async (req, res) => {
  const contacts = await contactsService.getAllContacts();
  res.json({
    status: 200,
    message: 'Contacts list retrieved successfully!',
    data: contacts,
  });
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, `Contact with ID ${contactId} not found. Please check the ID and try again.`);
  }

  res.json({
    status: 200,
    message: 'Contact found successfully!',
    data: contact,
  });
};

const createContactController = async (req, res) => {
  const { name, phoneNumber, contactType } = req.body;
  
  // Basic validation
  if (!name || !phoneNumber || !contactType) {
    throw createHttpError(400, 'Please provide name, phone number, and contact type.');
  }

  const contact = await contactsService.createContact(req.body);
  
  res.status(201).json({
    status: 201,
    message: 'Contact created successfully!',
    data: contact,
  });
};

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.updateContact(contactId, req.body);

  if (!contact) {
    throw createHttpError(404, `Contact with ID ${contactId} not found. Please check the ID and try again.`);
  }

  res.json({
    status: 200,
    message: 'Contact updated successfully!',
    data: contact,
  });
};

const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.deleteContact(contactId);

  if (!contact) {
    throw createHttpError(404, `Contact with ID ${contactId} not found. Please check the ID and try again.`);
  }

  res.status(204).send();
};

export default {
  getAllContacts: ctrlWrapper(getAllContactsController),
  getContactById: ctrlWrapper(getContactByIdController),
  createContact: ctrlWrapper(createContactController),
  updateContact: ctrlWrapper(updateContactController),
  deleteContact: ctrlWrapper(deleteContactController)
};