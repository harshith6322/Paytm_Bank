## Build a basic version of PayTM

# Bank Account Management API

This project provides a RESTful API for managing bank account balances and transferring money between accounts. The API is built using Node.js, Express, and MongoDB with Mongoose.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [User Signup](#user-signup)
  - [User Signin](#user-signin)
  - [Get Balance](#get-balance)
  - [Transfer Money](#transfer-money)
- [Middleware](#middleware)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bank-account-management-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd /backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables:
   ```env
   PORT=3000
   SERVER_KEY1=your_jwt_secret_key
   MONGODB_URI=your_mongodb_connection_string
   ```
5. Start the server:
   ```bash
   npm start
   ```

## Usage

Use the following base URL to access the API:

## API Endpoints

### User Signup

- **URL:** `/api/v1/user/signup`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "username": "john.doe@example.com",
    "password": "your_password"
  }
  ```
- **Response:**
  ```json
  {
    "err": false,
    "message": "User created successfully"
  }
  ```

### User Signin

- **URL:** `/api/v1/user/signin`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "john.doe@example.com",
    "password": "your_password"
  }
  ```
- **Response:**
  ```json
  {
    "err": false,
    "msg": "LOGIN SUCCESSFUL",
    "token": "your_jwt_token"
  }
  ```

### Get Balance

- **URL:** `/api/v1/user/balance`
- **Method:** `GET`
- **Headers:**
  ```http
  Authorization: Bearer your_jwt_token
  ```
- **Response:**
  ```json
  {
    "err": false,
    "balance": 1000
  }
  ```

### Transfer Money

- **URL:** `/api/v1/user/transfer`
- **Method:** `POST`
- **Headers:**
  ```http
  Authorization: Bearer your_jwt_token
  ```
- **Body:**
  ```json
  {
    "amount": 100,
    "to": "recipient_user_id"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Transfer successful"
  }
  ```

## Middleware

```javascript
//import jwt
const jwt = require("jsonwebtoken");
//middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ err: true, msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Received token:", token);
  //verify server keY
  try {
    const decoded = jwt.verify(token, process.env.YOUR_KEY_HERE);

    req.user = decoded;

    next(); //PASSING ROUTE NEXT ROUTE
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(403).json({ err: true, msg: "Invalid token" });
  }
};
```

### Authentication Middleware

The `authMiddleware` function is used to protect routes that require authentication. It verifies the JWT token and attaches the user information to the request object.

## Database Schema

### User Schema

### Account Schema

```javascript
//user
const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: { type: String, unique: true },
  password: String,
});

//account
const Bankschema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  Balance: { type: Number, required: true },
});
```
