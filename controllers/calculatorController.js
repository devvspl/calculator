/**
 * Calculator Controller
 * Handles calculation logic, validation, and database storage
 */

const { pool } = require('../config/database');

const calculate = async (req, res) => {
  try {
    const { num1, num2, operator } = req.body;
    const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 
                    (req.connection.socket ? req.connection.socket.remoteAddress : null);

    // Validate input presence
    if (num1 === undefined || num2 === undefined || !operator) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: num1, num2, and operator'
      });
    }

    // Convert to numbers and validate
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (isNaN(number1) || isNaN(number2)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input: Please enter valid numbers'
      });
    }

    // Validate operator
    const validOperators = ['+', '-', '*', '/'];
    if (!validOperators.includes(operator)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid operator: Use +, -, *, or /'
      });
    }

    // Perform calculation
    let result;
    switch (operator) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case '*':
        result = number1 * number2;
        break;
      case '/':
        if (number2 === 0) {
          return res.status(400).json({
            success: false,
            error: 'Division by zero is not allowed'
          });
        }
        result = number1 / number2;
        break;
    }

    // Round result to avoid floating point precision issues
    result = Math.round(result * 1000000) / 1000000;
    const calculationString = `${number1} ${operator} ${number2} = ${result}`;

    // Store calculation in database
    try {
      const insertQuery = `
        INSERT INTO calculations (num1, num2, operator, result, calculation, ip_address)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      
      await pool.execute(insertQuery, [
        number1,
        number2,
        operator,
        result,
        calculationString,
        clientIP
      ]);

      console.log(`✅ Calculation stored: ${calculationString} from IP: ${clientIP}`);
    } catch (dbError) {
      console.error('Database storage error:', dbError);
      // Continue with response even if database storage fails
    }

    res.json({
      success: true,
      result: result,
      calculation: calculationString
    });

  } catch (error) {
    console.error('Calculation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Get calculation history
const getHistory = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const query = `
      SELECT id, num1, num2, operator, result, calculation, created_at, ip_address
      FROM calculations
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await pool.execute(query, [limit, offset]);

    // Get total count
    const [countResult] = await pool.execute('SELECT COUNT(*) as total FROM calculations');
    const total = countResult[0].total;

    res.json({
      success: true,
      data: rows,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });

  } catch (error) {
    console.error('History retrieval error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve calculation history'
    });
  }
};

module.exports = {
  calculate,
  getHistory
};