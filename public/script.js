/**
 * Calculator Frontend JavaScript
 * Handles form submission, API calls, and UI updates
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calculatorForm');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const calculationDiv = document.getElementById('calculation');
    const answerDiv = document.getElementById('answer');
    const errorMessageDiv = document.getElementById('errorMessage');
    const clearBtn = document.getElementById('clearBtn');

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const num1 = document.getElementById('num1').value;
        const num2 = document.getElementById('num2').value;
        const operator = document.getElementById('operator').value;

        // Clear previous results
        hideResults();
        
        // Show loading state
        showLoading(true);

        try {
            // Make API call
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    num1: num1,
                    num2: num2,
                    operator: operator
                })
            });

            const data = await response.json();

            if (data.success) {
                // Show successful result
                showResult(data.calculation, data.result);
            } else {
                // Show error message
                showError(data.error);
            }

        } catch (error) {
            console.error('Network error:', error);
            showError('Network error: Unable to connect to server');
        } finally {
            // Hide loading state
            showLoading(false);
        }
    });

    // Clear button handler
    clearBtn.addEventListener('click', function() {
        clearForm();
        hideResults();
    });

    // Helper functions
    function showResult(calculation, result) {
        calculationDiv.textContent = calculation;
        answerDiv.textContent = result;
        resultDiv.classList.remove('hidden');
        clearBtn.classList.remove('hidden');
    }

    function showError(message) {
        errorMessageDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        clearBtn.classList.remove('hidden');
    }

    function hideResults() {
        resultDiv.classList.add('hidden');
        errorDiv.classList.add('hidden');
        clearBtn.classList.add('hidden');
    }

    function showLoading(isLoading) {
        const calculator = document.querySelector('.calculator');
        if (isLoading) {
            calculator.classList.add('loading');
        } else {
            calculator.classList.remove('loading');
        }
    }

    function clearForm() {
        document.getElementById('num1').value = '';
        document.getElementById('num2').value = '';
        document.getElementById('operator').value = '';
        document.getElementById('num1').focus();
    }

    // Auto-focus first input
    document.getElementById('num1').focus();
});