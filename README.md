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

### Get All Contacts
- **GET** `/contacts`
- **Description**: Retrieve all contacts from the database

### Get Contact by ID
- **GET** `/contacts/:contactId`
- **Description**: Retrieve a specific contact by ID
- **Parameters**: 
  - `contactId` (path parameter) - The ID of the contact to retrieve

### Create New Contact
- **POST** `/contacts`
- **Description**: Create a new contact
- **Required Fields**: `name`, `phoneNumber`, `contactType`

### Update Contact
- **PATCH** `/contacts/:contactId`
- **Description**: Update an existing contact
- **Parameters**: 
  - `contactId` (path parameter) - The ID of the contact to update

### Delete Contact
- **DELETE** `/contacts/:contactId`
- **Description**: Delete a contact by ID
- **Parameters**: 
  - `contactId` (path parameter) - The ID of the contact to delete

## Error Responses

The API returns error responses with appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found (e.g., "Contact not found" when trying to get/update/delete a non-existent contact)
- `500` - Internal Server Error

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
