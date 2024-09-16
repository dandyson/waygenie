<div align="center">
    <img src="frontend/public/waygenie-logo.png" alt="WayGenie Logo" width="200">
</div>

# WayGenie

## Overview

Welcome to WayGenie! It is a React.js and Express.js Single Page Application (SPA) that uses AI to plan itineraries for travellers.


# WayGenie Setup Guide

### Prerequisites

Before running this project locally, ensure you have the following installed:

1. **Node.js and npm**: Required for managing dependencies and running both frontend and backend applications.

### Step 1: Clone the Repository

Clone the Waygenie repository to your local machine using:

```bash
git clone https://github.com/dandyson/waygenie.git
```

Navigate into the project directory:

```bash
cd waygenie
```
### Step 2: Set Up the Backend

Navigate to the backend directory:

```bash
cd backend
```
Install backend dependencies using npm:

```bash
npm install
```

Start the backend server:

```bash
npm start
```

### Step 3: Set Up the Frontend

Navigate to the frontend directory:

```bash
cd ../frontend
```

Install frontend dependencies using npm:

```bash
npm install
```

Start the frontend development server:

```bash
npm start
```

### Step 4: Access the Application

The frontend should be accessible at http://localhost:3000 (or the port specified in your frontend setup).

The backend API will be available at http://localhost:5000 (or the port specified in your backend setup).

### Troubleshooting

If you encounter issues, consider the following:

- **Port Conflicts:** Ensure no other services are running on the ports specified for the frontend or backend
- **Environment Variables:** Verify that the .env file exists and contains the correct settings. The backend needs this for configuration.
- **Dependency Issues:** Run npm install in both frontend and backend directories to ensure all dependencies are correctly installed.

## 

Thank you for using WayGenie! If you have any questions or suggestions, please don't hesitate to reach out.
