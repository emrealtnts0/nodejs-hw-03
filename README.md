# Contact Management API with Validation

This project implements a Contact Management API with advanced validation, pagination, sorting, and filtering features.

## 🌐 Live Demo
API is deployed and available at: [https://nodejs-hw-04-8c7n.onrender.com](https://nodejs-hw-04-8c7n.onrender.com)

Visit the base URL to see the API documentation and available endpoints.

## 🚀 Implementation Steps

### Step 1: Branch Setup
- Created `hw4-validation` branch from `hw3-crud`
- All development is done in the `hw4-validation` branch

### Step 2: Data Validation
- Implemented `validateBody` middleware for request validation
- Added validation to POST and PATCH routes
- Created validation schemas with the following rules:
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
- Added `isValidId` middleware for ID validation
- Applied ID validation to all routes using contactId

### Step 3: Pagination
- Implemented pagination for GET `/contacts` route
- Query parameters:
  - `page` (default: 1) - Page number
  - `perPage` (default: 10) - Items per page
- Response format:
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

### Step 4: Sorting
- Added sorting capability to GET `/contacts` route
- Query parameters:
  - `sortBy` (default: 'name') - Field to sort by
  - `sortOrder` (default: 'asc') - Sort direction ('asc' or 'desc')
- Example: `GET /contacts?sortBy=name&sortOrder=desc`

### Step 5: Filtering (Optional)
- Implemented filtering for GET `/contacts` route
- Query parameters:
  - `type` - Filter by contact type ('work', 'home', 'personal')
  - `isFavourite` - Filter by favorite status (true/false)
- Example: `GET /contacts?type=work&isFavourite=true`

## 🛠️ API Endpoints

### Get All Contacts
- **GET** `/contacts`
- **Query Parameters**:
  - Pagination: `page`, `perPage`
  - Sorting: `sortBy`, `sortOrder`
  - Filtering: `type`, `isFavourite`
- **Response**: 200 OK with paginated, sorted, and filtered data

### Get Contact by ID
- **GET** `/contacts/:contactId`
- **Parameters**: 
  - `contactId` (path parameter)
- **Validation**: ID format is validated automatically
- **Response**: 200 OK with contact data

### Create New Contact
- **POST** `/contacts`
- **Validation Rules**:
  - `name`: Required, 3-20 characters
  - `phoneNumber`: Required, 3-20 characters
  - `email`: Optional, valid email format
  - `contactType`: Required, enum: ['work', 'home', 'personal']
  - `isFavourite`: Optional, boolean
- **Response**: 201 Created with new contact data

### Update Contact
- **PATCH** `/contacts/:contactId`
- **Parameters**: 
  - `contactId` (path parameter)
- **Validation**: Same as Create Contact, but all fields optional
- **Response**: 200 OK with updated contact data

### Delete Contact
- **DELETE** `/contacts/:contactId`
- **Parameters**: 
  - `contactId` (path parameter)
- **Response**: 200 OK with deleted contact data

## ⚙️ Error Handling

The API returns appropriate error responses:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors, invalid ID format)
- `404` - Not Found
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
- ✅ Data validation (POST/PATCH requests)
- ✅ ID validation
- ✅ Pagination
- ✅ Sorting
- ✅ Filtering
- ✅ Error handling

## 🛠️ Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- Joi (validation)
- createHttpError
- dotenv 