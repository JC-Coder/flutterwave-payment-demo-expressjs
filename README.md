# Project Title

This project integrates with the Flutterwave payment gateway to create payment links, handle callbacks, and verify transactions. It's built using Node.js and Express, leveraging Axios for HTTP requests. The application is designed to provide a seamless payment integration solution, making it easier for businesses to manage online transactions.

 [![StartEase](https://img.shields.io/badge/Generated%20by-StartEase-blue)](https://github.com/JC-Coder/startease)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.x or higher recommended)
- npm (usually comes with Node.js)

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone <projectRepoUrl>
   ```

2. Navigate to the project directory:
   ```bash
   cd <projectDirectory>
   ```

3. Install the necessary dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory of the project and add the necessary environment by taking reference from the .env.sample file

5. Start the development server:
   ```bash
   npm run dev
   ```

6. For production, build and start the server:
   ```bash
   npm start
   ```

## Usage

This project provides endpoints to create payment links, handle Flutterwave callbacks, and verify transactions. Here's how to use the provided endpoints:

### Creating a Payment Link

- **Endpoint:** `/payment-link`
- **Method:** `GET`
- **Description:** This endpoint creates a payment link using Flutterwave's payment gateway.

### Handling Flutterwave Callback

- **Endpoint:** `/flutter-callback`
- **Method:** `GET`
- **Description:** This endpoint handles the callback from Flutterwave after a transaction is completed.

### Flutterwave Webhook

- **Endpoint:** `/flutter-webhook`
- **Method:** `POST`
- **Description:** This endpoint is used to receive webhooks from Flutterwave for transaction verification.

## Project Structure

The project is structured as follows:

- `src/`: Contains the source code of the project.
  - `server.js`: Entry point of the application.
  - `common/`: Contains utility functions and configurations.
  - `modules/`: Contains the controllers and routes.
- `logs/`: Contains application logs.
- `package.json`: Defines the project dependencies and scripts.
