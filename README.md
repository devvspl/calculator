# Node.js Calculator

A simple web-based calculator built with Node.js, Express.js, and vanilla JavaScript.

## Features

- **Basic Arithmetic Operations**: Addition, Subtraction, Multiplication, Division
- **Input Validation**: Handles empty values, non-numeric input, and division by zero
- **Dynamic Results**: Shows calculation results without page reload
- **User-Friendly Error Messages**: Clear feedback for invalid inputs
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Architecture**: MVC pattern with proper folder structure

## Project Structure

```
nodejs-calculator/
├── controllers/
│   └── calculatorController.js    # Business logic and validation
├── routes/
│   └── calculator.js              # API route definitions
├── public/
│   ├── index.html                 # Main HTML page
│   ├── styles.css                 # Styling
│   └── script.js                  # Frontend JavaScript
├── server.js                      # Express server setup
├── package.json                   # Dependencies and scripts
└── README.md                      # Project documentation
```

## Installation & Setup

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## API Endpoints

### POST /api/calculate

Performs arithmetic calculations.

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

## Usage

1. Enter the first number
2. Select an operation (+, -, ×, ÷)
3. Enter the second number
4. Click "Calculate" to see the result
5. Use "Clear" to reset the form

## Input Validation

The calculator handles various error cases:

- **Empty fields**: Prompts for required inputs
- **Non-numeric input**: Shows "Invalid input" message
- **Division by zero**: Prevents calculation and shows error
- **Invalid operators**: Only accepts +, -, *, /

## Development

The project follows clean code principles:

- **Separation of concerns**: Routes, controllers, and views are separated
- **Error handling**: Comprehensive error handling on both frontend and backend
- **Async/await**: Modern JavaScript async patterns
- **Input validation**: Both client-side and server-side validation
- **Responsive design**: Mobile-friendly interface

## Dependencies

- **express**: Web framework for Node.js
- **nodemon**: Development dependency for auto-restarting server

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript features
- Fetch API
- CSS Grid and Flexbox

## License

MIT License