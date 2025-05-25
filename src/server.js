import express from 'express';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const startServer = () => {
  const app = express();

  // Middlewares
  app.use(express.json());

  // Welcome message for base URL
  app.get('/', (req, res) => {
    res.json({
      status: 'success',
      message: 'Welcome to Contact Management API!',
      instructions: {
        baseUrl: 'https://nodejs-hw-04-8c7n.onrender.com',
        endpoints: {
          getAllContacts: 'GET /contacts',
          getContactById: 'GET /contacts/:contactId',
          createContact: 'POST /contacts',
          updateContact: 'PATCH /contacts/:contactId',
          deleteContact: 'DELETE /contacts/:contactId'
        },
        features: [
          'Data validation for all requests',
          'Pagination (page, perPage)',
          'Sorting (sortBy, sortOrder)',
          'Filtering (type, isFavourite)',
          'Error handling with appropriate status codes'
        ],
        documentation: 'For detailed API documentation, please visit: https://github.com/emrealtnts0/nodejs-hw-04'
      }
    });
  });

  // Routes
  app.use('/contacts', contactsRouter);

  // 404 Handler
  app.use(notFoundHandler);

  // Error Handler
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return server;
};