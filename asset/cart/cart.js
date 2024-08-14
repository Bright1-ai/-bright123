document.getElementById('purchaseForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const hashrate = document.getElementById('hashrate').value;
    const tonAmount = document.getElementById('tonAmount').value;
    const statusMessage = document.getElementById('statusMessage');
    
    statusMessage.textContent = 'Processing payment...';
    
    try {
        // Make a request to your server to process the purchase
        const response = await fetch('/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hashrate, tonAmount }),
        });

        const result = await response.json();
        
        if (result.success) {
            statusMessage.textContent = `Purchase successful! Hashrate: ${hashrate} TH/s`;
        } else {
            statusMessage.textContent = `Error: ${result.error}`;
        }
    } catch (error) {
        statusMessage.textContent = `Error: ${error.message}`;
    }
});
