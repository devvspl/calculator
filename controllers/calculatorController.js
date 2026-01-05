/**
 * Calculator Controller
 * Handles calculation logic and validation
 */

const calculate = async (req, res) => {
  try {
    const { num1, num2, operator } = req.body;

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

    res.json({
      success: true,
      result: result,
      calculation: `${number1} ${operator} ${number2} = ${result}`
    });

  } catch (error) {
    console.error('Calculation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

module.exports = {
  calculate
};