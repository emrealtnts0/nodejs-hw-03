import createError from 'http-errors';
import contacts from '../models/contact.js';

export const getAllContacts = async () => {
  return await contacts.find().sort({ createdAt: -1 });
};

export const getContactById = async (id) => {
  const contact = await contacts.findById(id);
  if (!contact) {
    throw createError(404, 'Contact not found');
  }
  return contact;
};

export const createContact = async (contactsData) => {
  const { name, phoneNumber, contactType } = contactsData;

  if (!name || !phoneNumber || !contactType) {
    throw createError(400, 'Missing required fields');
  }

  const newContact = new contacts(contactsData);
  return await newContact.save();
};

export const updateContact = async (id, updateData) => {
  const updatedContacts = await contacts.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedContacts) {
    throw createError(404, 'Contact not found');
  }

  return updatedContacts;
};

export const deleteContact = async (id) => {
  const deletedContact = await contacts.findByIdAndDelete(id);
  if (!deletedContact) {
    throw createError(404, 'Contact not found');
  }
};
