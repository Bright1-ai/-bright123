// Show the loader and hide the content
function showLoader() {
    document.getElementById('loader-container').style.display = 'flex';
    document.getElementById('content-container').classList.add('hidden');
}

// Hide the loader and show the content
function hideLoader() {
    document.getElementById('loader-container').style.display = 'none';
    document.getElementById('content-container').classList.remove('hidden');
}

// Example usage: show the loader for 5 seconds
showLoader();
setTimeout(hideLoader, 5000);
