# Tapclass API

![image](https://github.com/user-attachments/assets/dfdf3180-2845-41dc-9f76-6a4a59e0c6c2)

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node.js](https://img.shields.io/badge/Node.js-20.x-blue)
![Express.js](https://img.shields.io/badge/Express.js-4.x-green)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)

A robust backend service built with Node.js and Express for **Tapclass**, an all-in-one management platform for coaching centers and educational institutions.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
- [Running The Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

-   **Institution Management**: Register and manage multiple institutions.
-   **User Authentication**: Secure JWT-based authentication for all roles.
-   **People Management**: Create and list Teachers, Students, and other staff.
-   **Academic Scheduling**: Create and manage Batches and Classes.
-   **Financials**: Generate Invoices with line items for packages and batches.
-   **Payment Integration**: Create Stripe checkout links and handle webhooks for automated payment tracking.
-   **Communication**: Built-in chat and notification system (Email, WhatsApp).
-   **Packages & Bookings**: Manage course packages and demo class bookings.

## Tech Stack

-   **Backend**: Node.js, Express.js
-   **Database**: PostgreSQL
-   **Authentication**: JSON Web Tokens (JWT)
-   **Payments**: Stripe API
-   **Notifications**: Nodemailer (for Email), Twilio (for WhatsApp - *example*)

## Prerequisites

Make sure you have the following installed on your local machine:

-   [Node.js](https://nodejs.org/en/) (v18.x or newer recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [PostgreSQL](https://www.postgresql.org/download/)

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/shivamk01here/Tapclass-node.git](https://github.com/shivamk01here/Tapclass-node.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Tapclass-api
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Configuration

The application uses environment variables for configuration.

1.  Create a `.env` file in the root of the project by copying the example file:
    ```bash
    cp .env.example .env
    ```
2.  Open the `.env` file and update the variables with your own configuration details.

    ```dotenv
    # Application Port
    PORT=5000

    # PostgreSQL Database Connection URL
    DATABASE_URL="postgresql://user:password@localhost:5432/Tapclass_db"

    # JWT Secret Key for signing tokens
    JWT_SECRET="your_strong_jwt_secret_key"

    # Stripe API Keys
    STRIPE_SECRET_KEY="sk_test_..."
    STRIPE_WEBHOOK_SECRET="whsec_..."

    # Add other keys for email, etc.
    EMAIL_HOST="smtp.example.com"
    EMAIL_PORT=587
    EMAIL_USER="user@example.com"
    EMAIL_PASS="password"
    ```

## Running The Application

You can run the server in development mode (with hot-reloading) or production mode.

-   **Development:**
    ```bash
    npm run dev
    ```
    This will start the server using `nodemon`, which automatically restarts the server on file changes.

-   **Production:**
    ```bash
    npm start
    ```
    This starts the server in a standard production-ready mode.

The API will be available at `http://localhost:5000`.

## API Documentation

For detailed information on all available API endpoints, request bodies, and response examples, please refer to our complete API documentation.

**[View Full API Documentation](./Documentation/api.md)**

## Running Tests

To run the automated test suite for the application, use the following command:

```bash
npm test
