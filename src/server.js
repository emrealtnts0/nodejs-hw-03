import express from 'express';
import dotenv from 'dotenv';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { initMongoDB } from './db/initMongoConnection.js';

dotenv.config();

const startServer = async () => {
  try {
    // Initialize MongoDB connection
    await initMongoDB();

    const app = express();

    // Middlewares
    app.use(express.json());

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
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();