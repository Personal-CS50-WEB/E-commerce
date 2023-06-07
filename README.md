# E-Commerce Application

The E-Commerce Application is a web-based platform that allows users to browse and purchase products online. It provides features such as product listing, search functionality, user authentication, and shopping cart management.

## Technologies Used

- MongoDB: A NoSQL database used for storing product, user, cart, order, comment, and like data.
- Express: A Node.js web application framework used for building the server-side API.
- React: A JavaScript library used for building the client-side user interface.
- Node.js: A JavaScript runtime used for running the server-side code.
- Passport.js: A library used for user authentication and session management.


### The project's folder structure is as follows:
     ecommerce/

       ├── client/                      # Client-side code (React)

       ├── ecommerceserver/              # Server-side code (Express)

         ├── configs/                  # Configuration files

         ├── controllers/              # Request handlers for each route

         ├── middlewares/              # Custom middleware functions

         ├── models/                   # Database models

         ├── routes/                   # API routes

         └── utils/  

         └── server.js  
        
  ## User Roles
  
  The application has three user roles with different privileges:

- User: Can browse products, add products to cart, place orders, leave comments and likes on products.
- Admin: In addition to user functionalities, can add, remove, and update products.
- Manager: In addition to admin functionalities, can add and remove admin users.


## Installation

1. Clone the repository:

`git clone https://github.com/your-username/e-commerce-app.git`

2. Install the dependencies:
`cd ecommerceServer
npm install`

`cd ecommerce
npm install`

3. Set up the environment variables:

Create a .env file in the root directory.
Specify the required environment variables in the .env file. Refer to the .env.example file for the list of variables.

4. Start the application:
`cd  ecommerceServer
npm run dev`

`cd ecommerce
npm start`





