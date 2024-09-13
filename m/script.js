// script.js

document.addEventListener("DOMContentLoaded", () => {
    // Start/Stop Mining
    const startMiningBtn = document.querySelector("#startMining");
    const stopMiningBtn = document.querySelector("#stopMining");

    if (startMiningBtn) {
        startMiningBtn.addEventListener("click", () => {
            alert("Mining started!");
            // Add logic to start mining
        });
    }

    if (stopMiningBtn) {
        stopMiningBtn.addEventListener("click", () => {
            alert("Mining stopped!");
            // Add logic to stop mining
        });
    }

    // Edit Profile Button
    const editProfileBtn = document.querySelector("#editProfile");
    if (editProfileBtn) {
        editProfileBtn.addEventListener("click", () => {
            alert("Profile edit clicked!");
            // Add logic for profile editing
        });
    }

    // Change Password Button
    const changePasswordBtn = document.querySelector("#changePassword");
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener("click", () => {
            alert("Password change clicked!");
            // Add logic for password change
        });
    }

    // Change Hash Rate Button
    const changeHashRateBtn = document.querySelector("#changeHashRate");
    if (changeHashRateBtn) {
        changeHashRateBtn.addEventListener("click", () => {
            alert("Change Hash Rate clicked!");
            // Add logic for changing hash rate
        });
    }
});
