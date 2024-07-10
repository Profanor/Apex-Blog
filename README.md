# Project GuruSys Technology

A simple Restful API for managing blog posts

## Overview
GuruSys-API is a RESTful API for managing blog posts. The API has the following features:

The ability to create, read, update and delete blog posts.

## Setup

1. Clone the repository

2. Install dependencies using a package manager of your choice:

    ```sh
    npm install
    # or
    yarn install
    ```

3. Configure your environment variables. Create a `.env` file in your root directory and add your configuration.


4. Build the TypeScript code:

    ```sh
    npm run build
    # or
    yarn build
    ```

5. Start the server:
    - For development (with auto-reloading using `nodemon`):

    ```sh
    npm run dev
    # or
    yarn dev
    ```

    - For production:

    ```sh
    npm start
    # or
    yarn start
    ```

## Technologies Used
- Nodejs
- Express.js
- Jsonwebtoken
- TypeScript
- MongoDB
- Mongoose
- Nodemon (for development)
- Render (Deployment)


## API Endpoints

1. **Create a new blog post**:
   - Method: `POST`
   - URL: `/api/posts`
   - Body:
     ```json
     {
       "title": "Sample Blog Post",
       "content": "This is the content of the blog post.",
       "author": "John Doe"
     }
     ```

2. **Get all blog posts**:
   - Method: `GET`
   - URL: `/api/posts`

3. **Get a single blog post by ID**:
   - Method: `GET`
   - URL: `/api/posts/:postId`

4. **Update a blog post by ID**:
   - Method: `PUT`
   - URL: `/api/posts/:postId`

5. **Delete a blog post by ID**:
   - Method: `DELETE`
   - URL: `/api/posts/:postId`

Please refer to the API docs through the url for detailed API documentation.
[https://documenter.getpostman.com/view/31288774/2sA3e48Tmj](https://documenter.getpostman.com/view/31288774/2sA3e48Tmj)


## Deployed API
The API is deployed and accessible at the following link:
[https://gurusys-blog-api.onrender.com](https://gurusys-blog-api.onrender.com)

Kindly use a testing tool like Postman to hit the endpoints specified in the docs to see the API functionality.