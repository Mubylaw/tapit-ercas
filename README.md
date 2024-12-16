# Project Name

Tapit by Neon

## Overview

Powered by Ercas, this solution is a next-generation biometric payment platform designed to make payments simple, fast, and secure. Users can link their fingerprints or Face ID to their bank accounts, enabling quick and effortless payments at POS terminals, online, and anywhere else without the need for traditional cards or PINs. With an average transaction time of just 3 seconds and advanced fraud-proof mechanisms, it offers a seamless payment experience for everyone.

Key Features:

- Biometric Authentication: Pay with a touch—no cards or PINs needed.
- Secure & Fraud-Proof: Advanced security ensures safe transactions.
- Versatile Use Cases: Suitable for in-store, online, and withdrawal payments.

This project contains a **client** and a **server** folder, each with its own dependencies. To run the application, follow the setup instructions below.

## Getting Started

### 1. Install Dependencies

You need to install dependencies for both the **client** and **server** folders separately.

1. **Navigate to the `client` folder** and install dependencies:

   `cd client
npm install`

2. **Navigate to the `server` folder** and install dependencies:

   `cd client
npm install`

### 2. Run the Application

After installing dependencies, you can start both the `client` and `server` simultaneously using:

`npm run dev`

Make sure you run this command from both the **client** and **server** folders in separate terminal windows.

### 3. Update the API Endpoint

After installing dependencies, you can start both the `client` and `server` simultaneously using:

The client application makes requests to the backend server. To ensure the correct API endpoint is used, update the URL in the `src/services/api.jsx` file inside the client folder.

Go to:

`client/src/services/api.jsx`
Change the API base URL to point to the local server running on port 5000:

`export const baseUrl = "http://localhost:5000";`

### 4. Start Developing

Once everything is set up, your client should connect to the backend server running on localhost:5000, and you can begin development.

Folder Structure

├── client
│ ├── src
│ │ └── services
│ │ └── api.jsx # Update this file to point to the correct API URL
│ └── package.json # Contains client dependencies and scripts
└── server
└── package.json # Contains server dependencies and scripts
