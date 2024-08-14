document.addEventListener('DOMContentLoaded', () => {
    const purchaseButtons = document.querySelectorAll('#purchase-options button');
    const paymentConfirmation = document.getElementById('payment-confirmation');
    const hashrateInfo = document.getElementById('hashrate-info');
    const statusMessage = document.getElementById('status-message');
    let selectedHashrate = 0;
    let selectedPrice = 0;

    purchaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedHashrate = button.getAttribute('data-hashrate');
            selectedPrice = button.getAttribute('data-price');
            hashrateInfo.textContent = `You are purchasing ${selectedHashrate} H/s for ${selectedPrice} NGN.`;
            paymentConfirmation.style.display = 'block';

            // Initialize Google Pay
            const paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });
            const paymentDataRequest = {
                // Payment request configuration
            };

            paymentsClient.isReadyToPay(paymentDataRequest)
                .then(function(response) {
                    if (response.result) {
                        paymentsClient.createButton({
                            onClick: () => onGooglePaymentButtonClicked(paymentsClient, paymentDataRequest)
                        }).appendTo('#googlePayButton');
                    } else {
                        statusMessage.textContent = 'Google Pay is not available.';
                    }
                })
                .catch(function(err) {
                    statusMessage.textContent = `Error: ${err.message}`;
                });
        });
    });

    const onGooglePaymentButtonClicked = (paymentsClient, paymentDataRequest) => {
        paymentsClient.loadPaymentData(paymentDataRequest)
            .then(function(paymentData) {
                // Handle the response
                const paymentToken = paymentData.paymentMethodData.tokenizationData.token;
                confirmPayment(paymentToken);
            })
            .catch(function(err) {
                statusMessage.textContent = `Error: ${err.message}`;
            });
    };

    const confirmPayment = (paymentToken) => {
        fetch('/confirm-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentData: paymentToken, hashrate: selectedHashrate })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                statusMessage.textContent = `Payment successful! You now have ${selectedHashrate} H/s.`;
            } else {
                statusMessage.textContent = 'Payment failed. Please try again.';
            }
        })
        .catch(error => {
            statusMessage.textContent = `Error: ${error.message}`;
        });
    };
});
