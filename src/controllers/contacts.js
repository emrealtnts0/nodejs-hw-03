import * as contactsService from '../services/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import createError from 'http-errors';
import mongoose from 'mongoose';

const getContacts = async (req, res) => {
  const contacts = await contactsService.getAllContacts(req.user._id, req.query);
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

const getContact = async (req, res) => {
  const contact = await contactsService.getContactById(req.user._id, req.params.contactId);
  res.json({
    status: 200,
    message: 'Successfully retrieved contact',
    data: contact,
  });
};

const createContact = async (req, res) => {
  const newContact = await contactsService.createContact(req.user._id, req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

const updateContact = async (req, res) => {
  const updatedContact = await contactsService.updateContact(
    req.user._id,
    req.params.contactId,
    req.body
  );
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createError(404, 'Contact not found');
  }
  await contactsService.deleteContact(req.user._id, contactId);
  res.status(204).end();
};

export default {
  getContacts: ctrlWrapper(getContacts),
  getContact: ctrlWrapper(getContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
