# Contacts API

A RESTful API for managing contacts built with Node.js, Express, and MongoDB.

## Features

- CRUD operations for contacts
- MongoDB database integration
- Error handling middleware
- Input validation
- RESTful API design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```
4. Start the server:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

- `GET /contacts` - Get all contacts
- `GET /contacts/:contactId` - Get a specific contact
- `POST /contacts` - Create a new contact
- `PATCH /contacts/:contactId` - Update a contact
- `DELETE /contacts/:contactId` - Delete a contact

## Contact Schema

```javascript
{
  name: String,        // required
  phoneNumber: String, // required
  email: String,       // optional
  isFavourite: Boolean,// optional, defaults to false
  contactType: String  // required, enum: ['work', 'home', 'personal']
}
```

## Error Handling

The API uses proper HTTP status codes and returns errors in the following format:
```javascript
{
  status: number,
  message: string,
  data: string
}
``` 