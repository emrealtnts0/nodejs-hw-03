import createError from 'http-errors';
import contacts from '../models/contact.js';

export const getAllContacts = async (userId, query) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
    type,
    isFavourite,
  } = query;

  // Build filter object
  const filter = { userId };
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

export const getContactById = async (userId, id) => {
  const contact = await contacts.findOne({ _id: id, userId });
  if (!contact) {
    throw createError(404, 'Contact not found');
  }
  return contact;
};

export const createContact = async (userId, contactsData) => {
  const { name, phoneNumber, contactType } = contactsData;

  if (!name || !phoneNumber || !contactType) {
    throw createError(400, 'Missing required fields');
  }

  const newContact = new contacts({
    ...contactsData,
    userId
  });
  return await newContact.save();
};

export const updateContact = async (userId, id, updateData) => {
  const updatedContact = await contacts.findOneAndUpdate(
    { _id: id, userId },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }

  return updatedContact;
};

export const deleteContact = async (userId, id) => {
  const deletedContact = await contacts.findOneAndDelete({ _id: id, userId });
  if (!deletedContact) {
    throw createError(404, 'Contact not found');
  }
};
