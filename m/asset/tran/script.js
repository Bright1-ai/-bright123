document.addEventListener('DOMContentLoaded', () => {
    // Example Transaction Data
    const transactions = [
        { date: '2024-09-12', type: 'Mining Reward', amount: '+10 Mavion Coins', status: 'Completed' },
        { date: '2024-09-10', type: 'Transaction Fee', amount: '-5 Mavion Coins', status: 'Completed' },
        { date: '2024-09-08', type: 'Referral Bonus', amount: '+20 Mavion Coins', status: 'Completed' }
    ];

    // Populate Transaction History Table
    const transactionHistoryElement = document.getElementById('transactionHistory');
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.type}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.status}</td>
        `;
        transactionHistoryElement.appendChild(row);
    });
});
