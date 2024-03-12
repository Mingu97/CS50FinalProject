
# Katalog - Miguel Fenech - CS50 Final Project
Web Application for Product and Purchase Order Management

## Description
This full-stack application, developed with React and Node.js, that offers a comprehensive system for managing a business products and issuance of purchase orders to other businesses. Mainly this is tailored for internal use within a company. Additionally to create a self-challenge I focused on creating a custom-made user authentication without any libraries as a shortcut (apart from JWT Token and BCrypt), product cataloging, and order management.

## Features
- **User Authentication**: Custom made secure login system with backend support for user registration, with an authentication middleware mechanism for the backend and private routing for frontend. Supplying authorized users with cookies and even locking account upon multiple failed attempts with a reset timer. 
- **Product Management**: Browse products as cards, search for products with a custom built search functionality tailored for this application,  selection and management of products like a shopping cart.
- **Purchase Order Management**: Create purchase orders based on selected products, preview them before submission, and manage already posted purchase orders.
- **Responsive Design**: Adapts seamlessly to different device screen sizes increasing application flexibility.
- **User Notifications**: Interactive toast notifications for immediate feedback upon successful and failed submissions.

## Technologies Used
- **Frontend**: React, React Router, CSS
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT, bcrypt
- **Additional Libraries**: cors, dotenv, cookie-parser, React Bootstrap, Toastify, Nav and Navbar.

## Getting Started

### Prerequisites
- Node.js
- npm
- MongoDB

### Installation and Setup
1. **Clone the repository:**
   ```
   git clone [repository-url]
   ```
2. **Frontend Setup:**
   ```
   cd [frontend-directory]
   npm install
   Before Running the below, create a .env file with : 'REACT_APP_API_BASE_URL=[URL OF API BASE]'
   npm run build
   ```


3. **Backend Setup:**
   ```
   cd [backend-directory]
   npm install
   ```
4. **Unified Server Configuration**

Katalog offers a streamlined deployment option where both the frontend and backend can be served from a single server. This setup is ideal for simplified hosting and deployment.

- **Steps to Integrate Frontend with Backend**

1. **Building Frontend**: Execute the build process in the frontend directory by running 'NPM RUN BUILD'. This will compile your React application into a build file of static files.
2. **Copying Build Files**: Transfer the generated static build files from the frontend's `build` folder to the backend's `build` directory.
3. **Serving from Backend**: The backend, that has been developed in Node.js, is configured to serve these static files. By placing the frontend build in the backend's directory, you are then enabling the backend server to also serve the frontend UI created by the build of React Frontend directory.
*** Configuring the required settings for the Application to run.***
- **Create a .env file in ./backend**: Create a .end file with the following required settings:
1. **PORT=[PORT TO RUN SERVER ON]**
2. **MONGODB_URI=[DATABASE URI]**
3. **MY_APP_SECRET_KEY=[CREATE SECURE KEY FOR APP]**
4. **REACT_APP_API_BASE_URL=[Input uri of server that the app will be running/deployed on]** 

## Running the Unified Application
- **Using Nodemon**: Start the backend server using Nodemon. This not only runs your backend API but also serves your frontend interface from the same server.
- **Accessing the Application**: With the server running, your application (both frontend and backend) can be accessed from a single port, streamlining the deployment process.

## Setting up a database for this application ## 
- **Create 3 Collections**: Create 3 collections called '_products', '_users' and '_purchaseOrders' respectively.
This configuration simplifies the deployment process, reducing the need for separate servers for frontend and backend, and is  advantageous for internal applications where ease of maintenance and deployment efficiency are key.

## Application Structure

### Frontend Components

#### `Homepage.jsx`
- **Purpose**: Welcome page with navigation toolbar to other sections.
- **Features**: Static layout with description of the features available in this application.

#### `LoginPage.jsx`
- **Purpose**: Facilitates user login using the customly serverside built user authentication & authorization.
- **Implementation**: Form with integration to `AuthContext` for state management and route privatisation.

#### `AllProducts.jsx`
- **Purpose**: Display and manage product listings to be added in a new purchase order. This is based on a mongodb integration. One can use 'generatedb.js' to create a new json object which can be used as a model for the collection.
- **Implementation**: Dynamic rendering of product data and interchangable by developers including user interaction capabilities.

#### `PurchaseOrder.jsx`
- **Purpose**: Interface for amending selected items in a purchase orders.
- **Implementation**: Form-based order creation and submission, once submitted a PO cannot be modified. As well a pdf is generated upon submission for the purchase order(which is totally customizable as well)

#### `MyPurchaseOrders.jsx`
- **Purpose**: Display all user-specific purchase orders that were created.
- **Implementation**: Fetches and lists an individual purchase order with the possibility to view all items in the respective purchase order with brief details.

### Backend Components

#### `authMiddleware.js`
- **Functionality**: Provides a JWT token from the Authorization header to validate the requests validity. As well it manages situations like missing tokens or expired sessions by granting access if the token is validated and an appropriate error message if it was rejected and invalid.
- **Method**:  Extracts the token, validates it against the secret key, attaches user details to the request on success, or clears the client's cookie and returns an error response on failure.

#### `userController.js`
- **Role**: This handles the lifecycle of the user accounts whilst creating a new user(which is not integrated with frontend yet), processing login requests granting token access, updating the user session, and managing logouts.
- **Operation**: This utilizes bcrypt for secure password hashing, integrates with mongodb for data storage and JSON Webtokens for session management ensuring that there is a secure and efficient user interation within the system.

#### `purchaseOrderController.js`
- **Functionality**: Handles all operations related to created purchase orders from selected products.
- **Implementation**: Manages serverside order validation, creation of a new document purchase order, and posting to database. 

### Note on User Registration
Although the backend includes user registration capability; however, the frontend currently lacks a registration interface as the application's primarily is intended for internal use.

## Other Recommendations that can be added with this application. 

- **Security**: Implement HTTPS, Increase were needed a more thorough CSRF protection.
- **Testing**: Introduce unit and integration tests for more robustness and further checkings.
- **Performance**: Continuously evaluate and enhance the application's performance, especially in data-intensive operations, maintining such application is highly critical.

## Authors
- **[Miguel Fenech]** -  *Development and Documentation*

## Acknowledgments
- The CS50 course for foundational insights.
- React and Node.js communities for their invaluable resources.


## Demo

https://youtu.be/cmJYcJ65EkY