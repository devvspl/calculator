# Node.js Calculator with Database

A web-based calculator built with Node.js, Express.js, MySQL, and vanilla JavaScript that stores calculation history.

## Features

- **Basic Arithmetic Operations**: Addition, Subtraction, Multiplication, Division
- **Input Validation**: Handles empty values, non-numeric input, and division by zero
- **Dynamic Results**: Shows calculation results without page reload
- **Database Storage**: All calculations are stored in MySQL database
- **Calculation History**: View previous calculations with timestamps and IP addresses
- **User-Friendly Error Messages**: Clear feedback for invalid inputs
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Backend**: Node.js, Express.js, MySQL2
- **Database**: MySQL
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Architecture**: MVC pattern with proper folder structure

## Project Structure

```
nodejs-calculator/
├── config/
│   └── database.js                # Database configuration and connection
├── controllers/
│   └── calculatorController.js    # Business logic and validation
├── routes/
│   └── calculator.js              # API route definitions
├── public/
│   ├── index.html                 # Main HTML page
│   ├── styles.css                 # Styling
│   └── script.js                  # Frontend JavaScript
├── .env                           # Environment variables (database config)
├── .gitignore                     # Git ignore file
├── server.js                      # Express server setup
├── package.json                   # Dependencies and scripts
└── README.md                      # Project documentation
```

## Database Schema

The application creates a `calculations` table with the following structure:

```sql
CREATE TABLE calculations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  num1 DECIMAL(15,6) NOT NULL,
  num2 DECIMAL(15,6) NOT NULL,
  operator VARCHAR(1) NOT NULL,
  result DECIMAL(15,6) NOT NULL,
  calculation VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  INDEX idx_created_at (created_at),
  INDEX idx_operator (operator)
);
```

## Installation & Setup

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   The `.env` file is already configured with the provided database credentials:
   ```
   DB_HOST=82.25.107.254
   DB_USER=u156619063_calculator
   DB_PASSWORD=D|7|Jqt6
   DB_NAME=u156619063_calculator
   DB_PORT=3306
   ```

4. **Start the server**:
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## API Endpoints

### POST /api/calculate

Performs arithmetic calculations and stores them in the database.

**Request Body:**
```json
{
  "num1": 10,
  "num2": 5,
  "operator": "+"
}
```

**Success Response:**
```json
{
  "success": true,
  "result": 15,
  "calculation": "10 + 5 = 15"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Division by zero is not allowed"
}
```

### GET /api/history

Retrieves calculation history with pagination.

**Query Parameters:**
- `limit` (optional): Number of records to return (default: 10)
- `offset` (optional): Number of records to skip (default: 0)

**Success Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "num1": 10,
      "num2": 5,
      "operator": "+",
      "result": 15,
      "calculation": "10 + 5 = 15",
      "created_at": "2024-01-01T12:00:00.000Z",
      "ip_address": "192.168.1.1"
    }
  ],
  "pagination": {
    "total": 25,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  }
}
```

## Usage

1. Enter the first number
2. Select an operation (+, -, ×, ÷)
3. Enter the second number
4. Click "Calculate" to see the result
5. Use "Clear" to reset the form
6. Click "View History" to see previous calculations

## Database Features

- **Automatic Storage**: Every calculation is automatically stored in the database
- **IP Tracking**: Records the IP address of each calculation request
- **Timestamps**: All calculations include creation timestamps
- **History View**: Users can view paginated calculation history
- **Error Handling**: Database errors don't prevent calculations from working

## Input Validation

The calculator handles various error cases:

- **Empty fields**: Prompts for required inputs
- **Non-numeric input**: Shows "Invalid input" message
- **Division by zero**: Prevents calculation and shows error
- **Invalid operators**: Only accepts +, -, *, /

## Development

The project follows clean code principles:

- **Separation of concerns**: Routes, controllers, database config, and views are separated
- **Error handling**: Comprehensive error handling on both frontend and backend
- **Async/await**: Modern JavaScript async patterns
- **Input validation**: Both client-side and server-side validation
- **Database abstraction**: Clean database layer with connection pooling
- **Environment variables**: Secure configuration management

## Dependencies

- **express**: Web framework for Node.js
- **mysql2**: MySQL client with Promise support
- **dotenv**: Environment variable management
- **nodemon**: Development dependency for auto-restarting server

## Security Features

- **Environment variables**: Database credentials stored securely
- **Input validation**: Prevents SQL injection and invalid data
- **Error handling**: Doesn't expose sensitive information in errors
- **Connection pooling**: Efficient database connection management

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript features
- Fetch API
- CSS Grid and Flexbox

## License

MIT License