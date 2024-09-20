# Simple RESTful API

## 1. Description

This project is a simple RESTful API built with Node.js and Express. It features a layered architecture with two main routes: user and posts. The API uses MongoDB as its database and includes security features such as rate limiting, CORS, and Helmet for enhanced protection.

## 2. Installation

To set up this project, follow these steps:

1. Install Node.js from [nodejs.org](https://nodejs.org/)

2. Clone this repository and navigate to the project directory

3. Install the required dependencies:
   ```
   npm install express mongoose cors helmet express-rate-limit dotenv
   ```

4. Install MongoDB:
   - Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Follow the installation instructions for your operating system

5. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   DATABASE_URL=mongodb://localhost:27017/your_database_name
   PORT=3000
   ```

## 3. Usage

This API serves as a backend for managing users and posts. Here's how to use it:

1. Start MongoDB:
   - Run `mongod` in a terminal to start the MongoDB server

2. Start the API server:
   ```
   npm start
   ```
   The server will start running on the specified port (default: 3000)

3. Use a REST client  (e.g., Postman, cURL, or a web browser extension. ANother option is install REST Client in VSCode and use the .rest files inside the RESTClient folder to make requests) to interact with the API:

   - User routes: `http://localhost:3000/user`
   - Post routes: `http://localhost:3000/post`

   Example requests:
   - GET `/user`: Retrieve users
   - POST `/user`: Create a new user
   - GET `/post`: Retrieve posts
   - POST `/post`: Create a new post

   (Note: Actual endpoints may vary based on your controller implementations)

4. The API includes rate limiting (100 requests per 15 minutes per IP) for protection against abuse.

Remember to handle authentication and authorization as needed for your specific use case.
