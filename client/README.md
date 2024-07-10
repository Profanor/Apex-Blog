## Overview
GuruSys Blog App is a React application that allows users to view, create, edit, and delete blog posts. It interacts with the GuruSys Blog API to fetch and update blog post data.

## Features
1. View all blog posts
2. View details of a single blog post
3. Create a new blog post
4. Edit existing blog posts
5. Delete blog posts


## Setup
Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js & npm or yarn installed on your machine
Installation
To get started with GuruSys Blog App, follow these steps:

Clone the repository:


git clone <repository-url>
cd guru-sys-blog-app
Install dependencies using npm or yarn:

    ```sh
    npm install
    # or
    yarn install
    ```

Configuration
Create a .env file in the root directory of the project and define the necessary environment variables. These might include API endpoint URLs or any other configurations specific to your deployment environment.

Example .env file:

REACT_APP_API_URL=https://gurusys-blog-api.onrender.com/api


Usage
To run the GuruSys Blog App locally, use the following command:


npm start
# or
yarn start
This will start the development server. Open http://localhost:3000 in your browser to view the app.

Deployment
For production deployment, you can build the app using:


npm run build
# or
yarn build
This will create an optimized production build of your application in the build folder.


## Technologies Used
- React
- React Router
- Axios (for API communication)
- Tailwind CSS (for styling)
- Vercel (Deployment)


## Deployed API
The API is deployed and accessible at the following link:
[https://guru-sys-blog-api.vercel.app](https://guru-sys-blog-api.vercel.app)


# Contributing
Contributions are welcome! 

## License
This project is licensed under the MIT License - see the LICENSE file for details.