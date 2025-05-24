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
- **Description**: Retrieve all contacts with pagination, sorting, and filtering
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `perPage` (optional): Items per page (default: 10)
  - `sortBy` (optional): Field to sort by (default: 'name')
  - `sortOrder` (optional): Sort order ('asc' or 'desc', default: 'asc')
  - `type` (optional): Filter by contact type ('work', 'home', 'personal')
  - `isFavourite` (optional): Filter by favorite status (true/false)
- **Response Format**:
  ```json
  {
    "status": 200,
    "message": "Successfully found contacts!",
    "data": {
      "data": [/* contacts array */],
      "page": 1,
      "perPage": 10,
      "totalItems": 100,
      "totalPages": 10,
      "hasPreviousPage": false,
      "hasNextPage": true
    }
  }
  ```

### Get Contact by ID
- **GET** `/contacts/:contactId`
- **Description**: Retrieve a specific contact by ID
- **Parameters**: 
  - `contactId` (path parameter) - The ID of the contact to retrieve
- **Validation**: ID format is validated automatically

### Create New Contact
- **POST** `/contacts`
- **Description**: Create a new contact
- **Validation Rules**:
  - `name`: Required, 3-20 characters
  - `phoneNumber`: Required, 3-20 characters
  - `email`: Optional, must be valid email format
  - `contactType`: Required, must be one of: 'work', 'home', 'personal'
  - `isFavourite`: Optional, boolean (default: false)

### Update Contact
- **PATCH** `/contacts/:contactId`
- **Description**: Update an existing contact
- **Parameters**: 
  - `contactId` (path parameter) - The ID of the contact to update
- **Validation**: Same rules as Create Contact, but all fields are optional
- **ID Validation**: Contact ID format is validated automatically

### Delete Contact
- **DELETE** `/contacts/:contactId`
- **Description**: Delete a contact by ID
- **Parameters**: 
  - `contactId` (path parameter) - The ID of the contact to delete
- **ID Validation**: Contact ID format is validated automatically

## Error Responses

The API returns error responses with appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors, invalid ID format)
- `404` - Not Found (e.g., "Contact not found" when trying to get/update/delete a non-existent contact)
- `500` - Internal Server Error

## Validation Rules

### Contact Schema
```javascript
{
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20
  },
  phoneNumber: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20
  },
  email: {
    type: String,
    optional: true,
    format: 'email'
  },
  isFavourite: {
    type: Boolean,
    default: false
  },
  contactType: {
    type: String,
    required: true,
    enum: ['work', 'home', 'personal'],
    default: 'personal'
  }
}
```

## Query Parameters

### Pagination
- `page`: Page number (default: 1)
- `perPage`: Items per page (default: 10)

### Sorting
- `sortBy`: Field to sort by (default: 'name')
- `sortOrder`: Sort direction ('asc' or 'desc', default: 'asc')

### Filtering
- `type`: Filter by contact type ('work', 'home', 'personal')
- `isFavourite`: Filter by favorite status (true/false)

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