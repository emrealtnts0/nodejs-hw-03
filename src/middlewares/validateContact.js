import createHttpError from 'http-errors';

export const validateContact = (req, res, next) => {
  const { name, phoneNumber, contactType } = req.body;

  // Check required fields
  if (!name) {
    throw createHttpError(400, 'Name is required');
  }
  if (!phoneNumber) {
    throw createHttpError(400, 'Phone number is required');
  }
  if (!contactType) {
    throw createHttpError(400, 'Contact type is required');
  }

  // Check contact type values
  const validTypes = ['work', 'home', 'personal'];
  if (!validTypes.includes(contactType)) {
    throw createHttpError(400, 'Contact type must be one of: work, home, personal');
  }

  // Basic phone number format check (just numbers)
  if (!/^\d+$/.test(phoneNumber)) {
    throw createHttpError(400, 'Phone number should contain only numbers');
  }

  next();
}; 