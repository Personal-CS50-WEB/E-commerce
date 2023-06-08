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

         ├── src/                 
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
- Manager: In addition to user functionalities, can add and remove admin users.

### API Endpoints
The following API endpoints are available in the application:

- User Registration:

     - URL: `/api/users/register`
          Method: POST
     - URL: `/api/users/login`
          Method: POST
     - URL: `/api/users/logout`
          Method: GET
   - URL:` /api/users/add-address`
     Method: POST  
     
- User Roles:
     - URL: `/api/users/admin-role`
     Method: POST, DELETE
          
- Products:
     - URL: `/api/products`
          Method: POST, GET

     - URL: `/api/products/:productId`
          Method: POST, GET, DELETE, PATCH
     - URL: `/api/products/search`
          Method:  GET
- Cart:
      - URL: `/api/cart`
          Method: POST, GET
          
     - URL: 1/api/cart/itemId`
          Method: DELETE
- Orders:
   - URL: `/api/orders`
          Method: POST, GET
   - URL: `/api/orders/orderId`
          Method: GET
- Likes:
  - URL: `/api/likes/:productId`
          Method: POST, GET 
 
- Comments:
  - URL: `/api/Comments/:productId`
          Method: POST, GET 
  - URL: `/api/Comments/:productId/:commentId` 
          Method: DELETE
          
          

##  Modules
### products 
- **Product Creation Module:**
The Product Creation module is responsible for handling the creation of new products in the application. It provides an Express.js router that listens for POST requests to the /products endpoint. The module performs various validation checks on the product data and uploads product photos to an AWS S3 bucket. If the data is valid, the module inserts the new product into the database and returns the inserted product data.

- **Product Update Module:**
The Product Update module handles the update of existing products in the application. It provides an Express.js router that listens for PATCH requests to the ("api/products/:id") endpoint, where :id represents the ID of the product to be updated. The module performs validation checks on the updated fields, including data type validation, length restrictions, and required field checks. It also handles the upload and deletion of product photos from an AWS S3 bucket.

- **Product Search Module:**
The Search module enables users to search for products based on specific criteria. It provides an Express.js router that listens for GET requests to the ("api/Products/search") endpoint. The module parses the query parameters, converts them into filters, and defines a projection for the search results. It then executes the search query against the product collection, considering additional conditions like item availability, and returns the matching products. The module ensures error handling and enhances the user experience by allowing customizable and efficient product searches.

- **Product Detail Module:**
The Get Product module allows users to retrieve a single product by its ID. It exports an Express.js router that listens for GET requests to the ("api/Products/:id") endpoint. The module validates the provided product ID using the ObjectId.isValid function. If the ID is valid, it searches for the product in the MongoDB collection based on the _id field. If a matching product is found, it is returned in the response. Otherwise, a 404 "Not found" error is sent. The module handles potential errors and provides appropriate error responses to ensure a smooth user experience.

- **Products List Module**
The Get Products module allows users to retrieve a list of products. It exports an Express.js router that listens for GET requests to the root endpoint ("api/Products/"). The module defines a projection to include specific fields in the results, such as the product ID, name, price, and photo URL. It also sets parameters to filter the products based on the availability of items with a quantity greater than 0. The module uses the find method on the MongoDB collection to retrieve the products that meet the projection and filter criteria. The results are then sent in the response. In case of any errors, the module handles them and provides an appropriate error response to ensure a smooth user experience.

- **Products Deletion Module:**
The Delete Product module handles the deletion of a product from the application. It exports an Express.js router that listens for DELETE requests to the endpoint with the specific product ID ("api/Products/:id"). The module first validates the product ID to ensure it is valid. It then retrieves the photo URLs associated with the product from the database. The module utilizes the deleteFromBucket function to delete the corresponding photos from the storage bucket. Afterward, it deletes the product record from the database using the deleteOne method. If the deletion is successful, it sends a response with a status code of 204 (No Content) to indicate a successful deletion. In case of any errors, the module handles them and provides an appropriate error response to ensure proper error handling within the application.

### Cart
- **Get Cart Module:**
The module's router handles the GET request to the ("api/cart/") endpoint by first extracting the user ID from the authenticated user's request object. It then queries the "cart" collection to retrieve all cart items associated with that user. For each item in the cart, the module calls the findItem utility function to find the corresponding product in the "products" collection. If a matching product is found, it is added to the productsData array. Finally, the module sends the productsData array as the response, or an empty array if the cart is empty. If an error occurs during the process, a 500 status code with an error message is sent as the response.

- **Delete From Cart Module:**
The module's router handles the DELETE request to the ("api/cart/itemId") endpoint. by first extracting the authenticated user's ID from the request object. It also retrieves the itemId parameter from the request URL. The module then queries the "cart" collection to find the cart item with the provided itemId. If the item exists and is associated with the authenticated user, it is deleted from the database using the deleteOne function. A success message is then sent as the response.
If the item is not found in the cart or if it does not belong to the authenticated user, a 400 status code with an error message is sent as the response.
If an error occurs during the process, a 500 status code with an error message is sent as the response.

- **Insert Into Cart Module:**
The module's router handles the POST request to the  ("api/cart/") endpoint by first extracting the authenticated user's ID from the request object and the item details from the request body. It then uses the findItem function to find the corresponding item in the "products" collection based on the provided ID and other criteria.
If the cart item is found, it is inserted into the "cart" collection using the insertOne function. The newly inserted cart item and the details of the cart item found in the "products" collection are sent as the response.

### Orders
- **Add Order Module:**
The module's router handles the POST request to the  ("api/orders/") endpoint by first extracting the authenticated user's ID from the request object. It then retrieves the items in the user's cart by querying the "cart" collection.

If there are items in the cart, the module calls the reduceAvailableItems function to update the available quantity of the corresponding items in the "products" collection based on the items in the cart. This ensures that the available quantity is reduced accordingly.

The module then inserts a new order into the "orders" collection, including the user's ID and the updated order items. The newly created order is sent as the response.

Finally, the module clears the user's cart by deleting all cart items associated with the user from the "cart" collection.

If an error occurs during the process, a 500 status code with an error message is sent as the response.

- **Get Orders Module:**
The module's router handles the GET request to ("api/orders") endpoint by first extracting the authenticated user's information from the request object. If the user has the role of "admin," the module allows viewing other users' orders. In this case, the user information is taken from the request body instead.

The module then queries the "orders" collection based on the user's ID. If matching orders are found, they are sent as the response. If no matching orders are found, an empty array is sent as the response.

If an error occurs during the process, a 500 status code with an error message is sent as the response.

- **Get Order Module:**
The module's router handles the GET request to ("api/orders/:orderId") endpoint by first extracting the authenticated user's information from the request object. If the user has the role of "admin," the module allows viewing other users' orders. In this case, the user information is taken from the request body instead.

The module then queries the "orders" collection based on the user's ID and the provided order ID. If matching orders are found, they are sent as the response. If no matching orders are found, an empty array is sent as the response.

If an error occurs during the process, a 500 status code with an error message is sent as the response.

### Users 
- **Signup Module:**
The module's router handles the POST request to("api/users/signup") endpoint by first extracting the email, password, and username from the request body. It then checks if the email already exists in the database by querying the "users" collection. If an existing user is found, a 409 status code is sent with an error message indicating that the email already exists.
- **Login Module:**
The module is for handling user login functionality using Express.js and Passport.js. It exports a router that handles POST requests to the ('api/users/login') endpoint. The module uses the 'local' authentication strategy provided by Passport.js. If the authentication is successful, the user is logged in and a success message is returned. If the authentication fails, an error message is sent. The module relies on a MongoDB collection for user data.

- **Logout Module:**
 A module for handling user logout functionality using Express.js, Passport.js, and bcrypt. It exports a router that handles GET requests to the('api/users/logout') endpoint. When a user logs out, the 'req.logout' function is called to remove the user's session. 
 - **Add Address Module:**
  The module is for adding an address to a user's profile using Express.js and Passport.js. It exports a router that handles POST requests to the ('api/users/add-address') endpoint. The endpoint is protected and requires authentication using the isAuthenticated middleware from the 'utils/users/authenticationCheck' module.
  
 - **Add Admin Module:**
  The module is for adding the admin role to a user's profile using Express.js and Passport.js. It exports a router that handles POST requests to the ('api/users/admin-role') endpoint. The endpoint is protected and requires authorization using the managerCheck middleware from the 'utils/users/managerCheck' module.

Upon receiving a request, the module retrieves the user's email from the request body. It then searches for the user in the 'users' collection using the email. If the user doesn't exist, a 404 error is returned. If the user already has the admin role or is a manager, corresponding error messages are returned.

If the user is eligible to receive the admin role, the module updates the user's role in the MongoDB collection to 'admin' using the updateOne method. If the update is successful, a success message is returned.
 - **remove Admin Module:**
 The module for removing the admin role from a user's profile using Express.js and Passport.js. It exports a router that handles DELETE requests to the '/admin-role' endpoint. The endpoint is protected and requires authorization using the managerCheck middleware from the 'utils/users/managerCheck' module.

Upon receiving a request, the module retrieves the user's email from the request body. It then searches for the user in the 'users' collection using the email. If the user doesn't exist, a 404 error is returned. If the user doesn't have the admin role, a 400 error is returned.

If the user has the admin role, the module updates the user's role in the MongoDB collection to 'user' using the updateOne method. If the update is successful, a success message is returned.

### Likes 
- **Like Module:**
The module is for handling like/unlike functionality for a product using Express.js and MongoDB. It exports a router that handles POST requests to the ('api/likes/:productId') endpoint. The endpoint is protected and requires authentication using the isAuthenticated middleware from the '/utils/users/authenticationCheck' module.

Upon receiving a request, the module extracts the productId from the request parameters and the authenticated user ID from req.user._id. It validates the productId to ensure it is a valid MongoDB ObjectId.

If the user has already liked the product (an existing like record exists), the module deletes the like record from the 'likes' collection using the deleteOne method.

If the user hasn't liked the product yet, the module inserts a new like record into the 'likes' collection using the insertOne method.

After handling the like/unlike action, the module redirects the user to the 'productId' endpoint.
-  **Get Likes Module:**
The module is for retrieving the number of likes for a specific product using Express.js and MongoDB. It exports a router that handles GET requests to the  ('api/likes/:productId') endpoint.

Upon receiving a request, the module extracts the productId from the request parameters and validates it to ensure it is a valid MongoDB ObjectId.

The module then queries the 'likes' collection using the find method to retrieve all likes associated with the given productId. The likes are stored in the productLikes array.

Finally, the module sends a response with the number of likes by sending an object with a numLikes property containing the length of the productLikes array.
### Comments 
- **Comment Module:**
The module is for creating comments on a specific product using Express.js and MongoDB. It exports a router that handles POST requests to the ('api/comments/:productId') endpoint.

Upon receiving a request, the module extracts the productId from the request parameters and validates it to ensure it is a valid MongoDB ObjectId. It also checks if the comment text is present in the request body and returns an error if it is missing.

The module then creates a comment object containing the user information (ID and username), the product ID, and the comment text.

Next, the module inserts the comment object into the 'comments' collection using the insertOne method. The inserted comment's ID is stored in the insertedId variable.

Finally, the module queries the 'comments' collection to retrieve the inserted comment data using the findOne method and sends the insertedData as the response.
- **Get Comments Module:**
 The is module for retrieving comments for a specific product using Express.js and MongoDB. It exports a router that handles GET requests to the ('api/comments/:productId') endpoint.

Upon receiving a request, the module extracts the productId from the request parameters and validates it to ensure it is a valid MongoDB ObjectId.

The module then defines a projection object to specify the fields to include in the query result. In this case, the projection includes the id, commentText, and user fields.

Next, the module queries the 'comments' collection using the find method, specifying the product ID in the query. The project method is used to apply the projection to the query result, and the toArray method is called to retrieve the comments as an array.

Finally, the module sends the productComments array as the response, wrapped in an object for consistency ({ productComments: productComments }).
- **Delete Comment Module:**
The module is for deleting a comment for a specific product using Express.js and MongoDB. It exports a router that handles DELETE requests to the ('api/comments/:productId/:commentId') endpoint.

Upon receiving a request, the module extracts the productId and commentId from the request parameters and validates them to ensure they are valid MongoDB ObjectIds.

The module then checks if the comment with the specified commentId exists and if the user owns the comment. If both conditions are met, the comment is deleted from the database using the deleteOne method.

If the comment is successfully deleted, the module sends a response with a success message. Otherwise, if the comment doesn't exist or the user doesn't own the comment, the module sends a response with an error message.

### Dependencies
- Express.js: A web application framework for Node.js.
- AWS SDK: The official JavaScript SDK for interacting with AWS services.
- Multer: A middleware for handling file uploads in Express.js.
- MongoDB Driver: A driver for connecting to MongoDB database.
- bcrypt: A library used for hashing passwords. It provides functions for securely hashing passwords using bcrypt algorithm.
- passport: A library used for authentication in Node.js applications. It provides a middleware layer for handling user authentication strategies.
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
