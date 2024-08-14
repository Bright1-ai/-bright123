document.addEventListener('DOMContentLoaded', () => {
    const miningRate = 0.00001; // Mavion Coin per minute
    const mavionTousdRate = 0.0001; // Conversion rate: 1 Mavion = 0.0001 TON
    const miningDuration = 24 * 60 * 60; // 24 hours in seconds

    // Load stored values from localStorage or set initial values
    let minedCoins = parseFloat(localStorage.getItem('minedCoins')) || 0;
    let startTime = parseInt(localStorage.getItem('startTime')) || null;
    let miningActive = localStorage.getItem('miningActive') === 'true' || false;

    const coinAmountElement = document.querySelector('.coin-amount');
    const usdBalanceElement = document.querySelector('.usd-balance');
    const countdownElement = document.querySelector('.countdown');
    const miningToggle = document.getElementById('miningToggle');

    // Calculate remaining time based on start time and current time
    let remainingTime = miningDuration;
    if (startTime) {
        const now = new Date().getTime();
        const elapsedTime = Math.floor((now - startTime) / 1000);
        remainingTime = miningDuration - elapsedTime;

        // Simulate the mining process based on elapsed time
        if (remainingTime > 0 && miningActive) {
            const minedDuringOffline = (elapsedTime / 60) * miningRate;
            minedCoins += minedDuringOffline;
        } else {
            remainingTime = 0;
            miningActive = false;
        }
    }

    // Update the UI with stored values
    coinAmountElement.textContent = `${minedCoins.toFixed(5)} Mavion`;
    updateusdBalance();
    updateCountdown();
    miningToggle.checked = miningActive;

    function updateCountdown() {
        if (remainingTime > 0) {
            remainingTime -= 1;

            // Update the countdown timer
            const hours = Math.floor(remainingTime / 3600);
            const minutes = Math.floor((remainingTime % 3600) / 60);
            const seconds = remainingTime % 60;
            countdownElement.textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            // Save the remaining time to localStorage
            localStorage.setItem('remainingTime', remainingTime);
        } else {
            miningActive = false;
            localStorage.setItem('miningActive', miningActive);
            miningToggle.checked = false; // Turn off the toggle
            alert('Mining completed! Turn the toggle on to start mining again.');
        }
    }

    function updateMining() {
        if (miningActive && remainingTime > 0) {
            // Increment the mined coins by the rate per minute
            minedCoins += miningRate;
            coinAmountElement.textContent = `${minedCoins.toFixed(5)} Mavion`;

            // Update the USD balance based on the Mavion balance
            updateusdBalance();

            // Save the mined coins to localStorage
            localStorage.setItem('minedCoins', minedCoins);
        }
    }

    function updateusdBalance() {
        const usdBalance = minedCoins * mavionTousdRate;
        usdBalanceElement.textContent = `${usdBalance.toFixed(5)} USD`;
    }

    function startMining() {
        if (miningToggle.checked && remainingTime > 0) {
            miningActive = true;
            startTime = startTime || new Date().getTime(); // Set start time if not already set
            localStorage.setItem('startTime', startTime);
        } else {
            miningActive = false;
            startTime = null;
            localStorage.removeItem('startTime');
        }

        // Save the mining status to localStorage
        localStorage.setItem('miningActive', miningActive);
    }

    // Start the countdown timer, updating every second
    setInterval(() => {
        updateCountdown();
    }, 1000); // Update every 1000 milliseconds (1 second)

    // Start the mining process, updating every minute
    setInterval(() => {
        updateMining();
    }, 60000); // Update every 60,000 milliseconds (1 minute)

    // Add event listener to the toggle switch
    miningToggle.addEventListener('change', () => {
        startMining();
        console.log("Toggle switched:", miningToggle.checked);
    });
});
