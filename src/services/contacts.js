import createError from 'http-errors';
import contacts from '../models/contact.js';

export const getAllContacts = async (query) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
    type,
    isFavourite,
  } = query;

  // Build filter object
  const filter = {};
  if (type) filter.contactType = type;
  if (isFavourite !== undefined) filter.isFavourite = isFavourite === 'true';

  // Calculate skip value for pagination
  const skip = (parseInt(page) - 1) * parseInt(perPage);

  // Build sort object
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  // Get total count for pagination
  const totalItems = await contacts.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / parseInt(perPage));

  // Get paginated and sorted results
  const data = await contacts
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(perPage));

  return {
    data,
    page: parseInt(page),
    perPage: parseInt(perPage),
    totalItems,
    totalPages,
    hasPreviousPage: parseInt(page) > 1,
    hasNextPage: parseInt(page) < totalPages,
  };
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
  const updatedContact = await contacts.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }

  return updatedContact;
};

export const deleteContact = async (id) => {
  const deletedContact = await contacts.findByIdAndDelete(id);
  if (!deletedContact) {
    throw createError(404, 'Contact not found');
  }
};
