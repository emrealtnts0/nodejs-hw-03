import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name cannot exceed 20 characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Phone number must be at least 3 characters long',
    'string.max': 'Phone number cannot exceed 20 characters',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().allow('').optional().messages({
    'string.email': 'Please provide a valid email address',
  }),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .required()
    .messages({
      'any.only': 'Contact type must be one of: work, home, personal',
      'any.required': 'Contact type is required',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional().messages({
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name cannot exceed 20 characters',
  }),
  phoneNumber: Joi.string().min(3).max(20).optional().messages({
    'string.min': 'Phone number must be at least 3 characters long',
    'string.max': 'Phone number cannot exceed 20 characters',
  }),
  email: Joi.string().email().allow('').optional().messages({
    'string.email': 'Please provide a valid email address',
  }),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .optional()
    .messages({
      'any.only': 'Contact type must be one of: work, home, personal',
    }),
}); 