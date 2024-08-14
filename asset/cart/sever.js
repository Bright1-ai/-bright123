const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Placeholder for payment verification function
const verifyGooglePayPayment = (paymentData) => {
    // Here, you would interact with the Google Pay API to verify the payment
    return new Promise((resolve, reject) => {
        // Simulate verification process
        if (paymentData) {
            resolve({ success: true });
        } else {
            reject({ success: false });
        }
    });
};

// Handle the payment confirmation request from the frontend
app.post('/confirm-payment', (req, res) => {
    const paymentData = req.body.paymentData;

    verifyGooglePayPayment(paymentData)
        .then(verificationResponse => {
            if (verificationResponse.success) {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        })
        .catch(error => {
            console.error('Payment verification error:', error);
            res.json({ success: false });
        });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
