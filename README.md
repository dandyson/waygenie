<div align="center">
    <img src="frontend/public/waygenie-logo.png" alt="WayGenie Logo" width="200">
</div>

# WayGenie

## Overview

WayGenie is a full-stack React.js and Express.js Single Page Application (SPA) that uses AI to plan itineraries for travellers. The application showcases:
- OpenAI API integration for AI-powered suggestions
- Auth0 authentication protecting API routes
- Redis for job queue management
- Cypress for end-to-end testing
- AWS CloudFront for content delivery

## Live Demo

Visit [WayGenie](https://d1tl42qtzfxokv.cloudfront.net) to see the full application in action!

****Demo credentials will be provided upon request.***

## Local Development Setup

This guide will help you set up a local development environment to explore the codebase and architecture. Note: The OpenAI integration is protected in production to manage API costs, but the setup below will let you explore all other features and code structure.

### Prerequisites

Before running this project locally, ensure you have:
1. **Node.js and npm**: For managing dependencies and running the application
2. **Redis**: For the job queue system (optional if not testing AI features)

### Installation Steps

### Step 1: **Clone the Repository**
```bash
git clone https://github.com/dandyson/waygenie.git
cd waygenie
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

### Extra steps

## Frontend Testing

If you would like to run tests in the application, first make sure you are in the /frontend directory:

```bash
cd frontend
```
<br>

You can then run them as follows:


### **React Scripts/Jest**

Run the following command to run the tests:

```bash
npm run test
```

If you would like to see the coverage run this command:

```bash
npm run test:total
```

<br>

### **Cypress E2E Testing**

WayGenie includes Cypress End-to-End testing on the frontend - to run these tests, first make sure you are in the /frontend directory:

```bash
cd frontend
```

Then run this command:

```bash
npm run cypress
```

This will open the cypress window. Then follow these steps:

1. Within the window, select the **E2E Testing** option.
2. You will then be asked to choose a browser. Select any browser you wish.
3. This will open the browser you selected.

Once the browser has opened, you will be taken to the Cypress dashboard. The tests will be within the **specs**.

From here, select any of the files and the tests will run!


## Understanding the Auth Layer

The application uses Auth0 in production to protect costly API routes. For local development, focus on exploring the architecture and UI components



## Technical Details

### Architecture Highlights
- 🎯 Queue-based AI processing system
- 🔒 Protected API routes for cost management
- ⚡ Redis job management
- 📱 Responsive design
- 🧪 Comprehensive test coverage

## Contact

For full demo access or questions about this project, please reach out to dannydyson297@gmail.com
