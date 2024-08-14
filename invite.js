// Generate a unique invite code and store it in localStorage
function generateInviteCode() {
    // Generate a unique invite code (for example, a random string)
    const code = Math.random().toString(36).substr(2, 8).toUpperCase();
    localStorage.setItem('inviteCode', code);
    return code;
}

// Get or create an invite code
function getInviteCode() {
    let inviteCode = localStorage.getItem('inviteCode');
    if (!inviteCode) {
        inviteCode = generateInviteCode();
    }
    return inviteCode;
}

// Function to share invite code on Telegram
function shareOnTelegram() {
    const inviteCode = getInviteCode();
    const url = `https://t.me/share/url?url=https://yourwebsite.com&text=Use%20my%20invite%20code%20${inviteCode}%20to%20join%20Mavion%20Coin%20mining!`;
    window.open(url, '_blank');
}

// Example of how to use these functions in your website script
document.addEventListener('DOMContentLoaded', () => {
    const inviteCodeValue = document.getElementById('inviteCodeValue');
    const shareButton = document.getElementById('shareButton');

    // Display the invite code
    inviteCodeValue.textContent = getInviteCode();

    // Set up the share button
    shareButton.addEventListener('click', shareOnTelegram);
});
