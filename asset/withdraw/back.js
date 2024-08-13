document.addEventListener('DOMContentLoaded', () => {
    const balanceElement = document.getElementById('user-balance');
    const withdrawForm = document.getElementById('withdraw-form');
    const withdrawAmountInput = document.getElementById('withdraw-amount');
    const messageElement = document.getElementById('message');
    
    // Example balance
    let userBalance = 100; // Replace this with actual balance from the backend

    function updateBalance() {
        balanceElement.textContent = userBalance.toFixed(2);
    }

    withdrawForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const withdrawAmount = parseFloat(withdrawAmountInput.value);
        
        if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
            messageElement.textContent = 'Please enter a valid amount.';
            messageElement.style.color = 'red';
            return;
        }
        
        if (withdrawAmount > userBalance) {
            messageElement.textContent = 'Insufficient balance.';
            messageElement.style.color = 'red';
            return;
        }
        
        userBalance -= withdrawAmount;
        updateBalance();
        messageElement.textContent = 'Withdrawal successful!';
        messageElement.style.color = 'green';

        // Here, you would also send the withdrawal request to your backend
    });

    updateBalance();
});
