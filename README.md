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
- 
##  Modules
Product Creation Module
The Product Creation module is responsible for handling the creation of new products in the application. It provides an Express.js router that listens for POST requests to the /products endpoint. The module performs various validation checks on the product data and uploads product photos to an AWS S3 bucket. If the data is valid, the module inserts the new product into the database and returns the inserted product data.

Dependencies
- Express.js: A web application framework for Node.js.
- AWS SDK: The official JavaScript SDK for interacting with AWS services.
- Multer: A middleware for handling file uploads in Express.js.
- MongoDB Driver: A driver for connecting to MongoDB database.

### API Endpoints
The following API endpoints are available in the application:

- User Registration:

     - URL: /api/users/register
          Method: POST
     - URL: /api/users/login
          Method: POST
     - URL: /api/users/logout
          Method: GET
   - URL: /api/users/add-address
     Method: POST  
     
- User Roles:
     - URL: /api/users/admin-role
     Method: POST, DELETE
          
- Products:
     - URL: /api/products
          Method: POST, GET

     - URL: /api/products/:productId
          Method: POST, GET, DELETE, PATCH
     - URL: /api/products/search
          Method:  GET
- Cart:
      - URL: /api/cart
          Method: POST, GET
          
     - URL: /api/cart/itemId
          Method: DELETE
- Orders:
   - URL: /api/orders
          Method: POST, GET
   - URL: /api/orders/orderId
          Method: GET
- Likes:
  - URL: /api/likes/:productId
          Method: POST, GET 
 
- Comments:
  - URL: /api/Comments/:productId
          Method: POST, GET 
  - URL: /api/Comments/:productId/:commentId
          Method: DELETE
          
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





