KoinX Assignment

Deployed here using free service of render
https://koinx-assignment-w5bs.onrender.com
Description
This project is part of the KoinX assignment and is designed to fetch transactions and balance for a given address.

Installation
To install the dependencies, run the following command:

bash
Copy code
npm install
Usage
To fetch transactions, run the following command:

bash
Copy code
node index.js
To fetch transactions for a specific address, use the following endpoint:

bash
Copy code
GET /transactions/:address
To fetch the balance for a specific address, use the following endpoint:

bash
Copy code
GET /balance/:address
Replace :address with the actual address you want to fetch transactions or balance for.

Dependencies
axios for making HTTP requests
express for creating a web server
dotenv for managing environment variables
Configuration
Ensure you have a .env file in the root directory with the following environment variables:

