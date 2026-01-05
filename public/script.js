/**
 * Calculator Frontend JavaScript
 * Handles form submission, API calls, UI updates, and history display
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calculatorForm');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const calculationDiv = document.getElementById('calculation');
    const answerDiv = document.getElementById('answer');
    const errorMessageDiv = document.getElementById('errorMessage');
    const clearBtn = document.getElementById('clearBtn');
    const historyBtn = document.getElementById('historyBtn');
    const historySection = document.getElementById('historySection');
    const historyList = document.getElementById('historyList');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    let currentOffset = 0;
    const limit = 10;
    let historyVisible = false;

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
                
                // Refresh history if it's currently visible
                if (historyVisible) {
                    refreshHistory();
                }
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

    // History button handler
    historyBtn.addEventListener('click', function() {
        toggleHistory();
    });

    // Load more button handler
    loadMoreBtn.addEventListener('click', function() {
        loadHistory(false);
    });

    // History functions
    function toggleHistory() {
        if (historyVisible) {
            hideHistory();
        } else {
            showHistory();
        }
    }

    async function showHistory() {
        historySection.classList.remove('hidden');
        historyBtn.textContent = 'Hide History';
        historyVisible = true;
        currentOffset = 0;
        historyList.innerHTML = '<div class="loading-history">Loading history...</div>';
        loadMoreBtn.classList.add('hidden');
        await loadHistory(true);
    }

    function hideHistory() {
        historySection.classList.add('hidden');
        historyBtn.textContent = 'View History';
        historyVisible = false;
    }

    async function refreshHistory() {
        if (!historyVisible) return;
        
        currentOffset = 0;
        historyList.innerHTML = '<div class="loading-history">Loading history...</div>';
        loadMoreBtn.classList.add('hidden');
        await loadHistory(true);
    }

    async function loadHistory(isInitial = false) {
        try {
            if (!isInitial) {
                loadMoreBtn.disabled = true;
                loadMoreBtn.textContent = 'Loading...';
            }

            const response = await fetch(`/api/history?limit=${limit}&offset=${currentOffset}`);
            const data = await response.json();

            if (data.success) {
                if (isInitial) {
                    historyList.innerHTML = '';
                }

                if (data.data.length === 0 && isInitial) {
                    historyList.innerHTML = '<div class="no-history">No calculations found</div>';
                    return;
                }

                data.data.forEach(item => {
                    const historyItem = createHistoryItem(item);
                    historyList.appendChild(historyItem);
                });

                currentOffset += data.data.length;

                // Show/hide load more button
                if (data.pagination.hasMore) {
                    loadMoreBtn.classList.remove('hidden');
                    loadMoreBtn.disabled = false;
                    loadMoreBtn.textContent = 'Load More';
                } else {
                    loadMoreBtn.classList.add('hidden');
                }

            } else {
                throw new Error(data.error || 'Failed to load history');
            }

        } catch (error) {
            console.error('History loading error:', error);
            if (isInitial) {
                historyList.innerHTML = '<div class="no-history">Failed to load history</div>';
            } else {
                loadMoreBtn.disabled = false;
                loadMoreBtn.textContent = 'Load More';
                showError('Failed to load more history');
            }
        }
    }

    function createHistoryItem(item) {
        const div = document.createElement('div');
        div.className = 'history-item';
        
        const date = new Date(item.created_at).toLocaleString();
        
        div.innerHTML = `
            <div class="history-calculation">${item.calculation}</div>
            <div class="history-meta">
                <span class="history-date">${date}</span>
                <span class="history-ip">${item.ip_address || 'Unknown IP'}</span>
            </div>
        `;
        
        return div;
    }

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