# Contact Management API with CRUD Operations

This project implements a Contact Management API with CRUD operations, error handling, and MongoDB integration.

## 🌐 Live Demo
API is deployed and available at: [https://nodejs-hw-03-vrv2.onrender.com](https://nodejs-hw-03-vrv2.onrender.com)

Visit the base URL to see the API documentation and available endpoints.

## 🚀 Implementation Steps

### Step 1: Branch Setup and Code Organization
- Created `hw3-crud` branch from `hw2-mongodb`
- Organized code structure:
  - Moved routing code from `server.js` to `src/routers/contacts.js`
  - Moved controller code from `server.js` to `src/controllers/contacts.js`
  - Implemented proper file structure following course materials

### Step 2: Error Handling Implementation
1. Added `http-errors` package for error handling
2. Created error handling middleware:
   - `src/middlewares/errorHandler.js`: Handles all errors with 500 status code
   - `src/middlewares/notFoundHandler.js`: Handles 404 errors for non-existent routes
3. Created `src/utils/ctrlWrapper.js` for controller error handling
4. Implemented proper error responses:
   ```json
   {
     "status": 500,
     "message": "Something went wrong",
     "data": "Error message"
   }
   ```
5. Added 404 error handling for non-existent contacts

### Step 3: Create Contact (POST)
- Implemented POST `/contacts` endpoint
- Required fields:
  - `name` (required)
  - `phoneNumber` (required)
  - `contactType` (required)
- Optional fields:
  - `email`
  - `isFavourite`
- Success response (201):
  ```json
  {
    "status": 201,
    "message": "Successfully created a contact!",
    "data": {
      // created contact data
    }
  }
  ```

### Step 4: Update Contact (PATCH)
- Implemented PATCH `/contacts/:contactId` endpoint
- All fields optional for update
- Success response (200):
  ```json
  {
    "status": 200,
    "message": "Successfully patched a contact!",
    "data": {
      // updated contact data
    }
  }
  ```
- 404 error if contact not found

### Step 5: Delete Contact (DELETE)
- Implemented DELETE `/contacts/:contactId` endpoint
- Success response (204) with no body
- 404 error if contact not found

## 🛠️ API Endpoints

### Get All Contacts
- **GET** `/contacts`
- **Response**: 200 OK with contacts array

### Get Contact by ID
- **GET** `/contacts/:contactId`
- **Parameters**: 
  - `contactId` (path parameter)
- **Response**: 200 OK with contact data
- **Error**: 404 if contact not found

### Create New Contact
- **POST** `/contacts`
- **Required Fields**:
  - `name`
  - `phoneNumber`
  - `contactType`
- **Optional Fields**:
  - `email`
  - `isFavourite`
- **Response**: 201 Created with new contact data

### Update Contact
- **PATCH** `/contacts/:contactId`
- **Parameters**: 
  - `contactId` (path parameter)
- **Optional Fields**:
  - `name`
  - `phoneNumber`
  - `email`
  - `isFavourite`
  - `contactType`
- **Response**: 200 OK with updated contact data
- **Error**: 404 if contact not found

### Delete Contact
- **DELETE** `/contacts/:contactId`
- **Parameters**: 
  - `contactId` (path parameter)
- **Response**: 204 No Content
- **Error**: 404 if contact not found

## ⚙️ Error Handling

The API returns appropriate error responses:
- `200` - Success
- `201` - Created
- `204` - No Content (Delete success)
- `404` - Not Found (Route or Contact)
- `500` - Internal Server Error

## 🚀 Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file with required environment variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/contacts_db
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## 🧪 Testing

All features have been tested and verified:
- ✅ Code organization (routing and controllers)
- ✅ Error handling
- ✅ CRUD operations
- ✅ MongoDB integration
- ✅ API responses and status codes

## 🛠️ Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- http-errors
- dotenv 