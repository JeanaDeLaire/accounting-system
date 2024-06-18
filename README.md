# Accounting System HTTP API

This project offers a Simple Accounting System HTTP API powered by Node with Express.

## Installation

1. Clone this project to your machine and navigate to the project directory:

```
git clone https://github.com/JeanaDeLaire/accounting-system.git
```

2. Install dependencies:

```
npm install
```

## Running the Application

There are two options for running the application:

1. Preferred: Nodemon is a simple monitoring script added to this project and is effective at quickly running the application with hot reloading regardless of node version.

```
nodemon --inspect ./server.js
```

2. Use node directly:

```
npm start
```

You can verify the service is running by running this curl against your local port:

```
curl --request POST \
  --url http://localhost:3001/api/transaction \
  --header 'Content-Type: application/json' \
  --data '{
    "date": "2024-06-15T10:00:00Z",
    "amount": 330.00,
    "type": "credit",
    "description":
    "Payment received"
  }'
```

## Testing

Unit tests are including for each api request in the **tests** folder. To run the test suite simply run:

```
npm test
```

## Troubleshooting

### Dependency Install issues

Ensure node is properly installed on your machine by version checking.

```
node -v
npm -v
```

### Undefined Environment variables

Double check your .env file exists. If not, add one directly.

- Add .env file to the root of your project
- Add in the following variables:

```
PORT=3001
DB_FILE_PATH=database/transactions.json
```
