# User Management API

This project implements a simple User Management API using Node.js, Express, MongoDB, and JSON Web Tokens (JWT).

## Installation

1. Clone the repository:

   ```bash
   git clone
   ```
   npm install

   node index.js to start the server

   The Server runs at http://localhost:4000

   Try to create an env file with requires mongodb connection string which is named as "mongourl".

  ## Authentication
  Some endpoints (PUT and DELETE) require authentication. Include the JWT token in the Authorization header of the request.
