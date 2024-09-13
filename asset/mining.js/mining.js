document.addEventListener('DOMContentLoaded', () => {
    const startMiningButton = document.getElementById('startMining');
    const claimCoinsButton = document.getElementById('claimCoins');
    const miningRigs = document.getElementById('miningRigs');
    const miningSpeedElement = document.getElementById('miningSpeed');
    const minedCoinsDisplay = document.getElementById('minedCoinsDisplay');
    const miningTimerElement = document.getElementById('miningTimer');
    const transactionHistory = document.getElementById('transactionHistory');
    let miningInterval, timerInterval;
    let miningSpeed = 100; // Starting mining speed
    let minedCoins = 0; // Mined coins
    let miningTime = 8 * 60 * 60; // 8 hours in seconds

    startMiningButton.addEventListener('click', () => {
        miningRigs.style.display = 'flex'; // Show rigs
        startMiningButton.style.display = 'none'; // Hide start button

        // Start mining process
        miningInterval = setInterval(() => {
            miningSpeed = Math.floor(Math.random() * 200) + 100; // Random speed between 100-300 H/s
            miningSpeedElement.textContent = `${miningSpeed} H/s`;

            minedCoins += miningSpeed / 1000; // Increment mined coins
            minedCoinsDisplay.textContent = `${minedCoins.toFixed(2)} Mavion Coins`;
        }, 1000);

        // Start timer countdown
        timerInterval = setInterval(() => {
            miningTime--;
            const hours = String(Math.floor(miningTime / 3600)).padStart(2, '0');
            const minutes = String(Math.floor((miningTime % 3600) / 60)).padStart(2, '0');
            const seconds = String(miningTime % 60).padStart(2, '0');
            miningTimerElement.textContent = `${hours}:${minutes}:${seconds}`;

            if (miningTime <= 0) {
                clearInterval(miningInterval); // Stop mining
                clearInterval(timerInterval); // Stop timer
                miningRigs.style.display = 'none'; // Hide rigs
                claimCoinsButton.style.display = 'block'; // Show claim button
            }
        }, 1000);
    });

    // Claim Coins
    claimCoinsButton.addEventListener('click', () => {
        // Update balance and transaction history
        const newTransaction = document.createElement('tr');
        newTransaction.innerHTML = `
            <td>${new Date().toLocaleDateString()}</td>
            <td>Mining Reward</td>
            <td>+${minedCoins.toFixed(2)} Mavion Coins</td>
            <td>Confirmed</td>
        `;
        transactionHistory.appendChild(newTransaction);

        claimCoinsButton.style.display = 'none'; // Hide claim button
        startMiningButton.style.display = 'block'; // Show start button again
        miningTime = 8 * 60 * 60; // Reset timer
        minedCoins = 0; // Reset mined coins
        minedCoinsDisplay.textContent = '0 Mavion Coins';
    });
});
