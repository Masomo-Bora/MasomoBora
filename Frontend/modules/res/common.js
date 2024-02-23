
import { API_BASE_URL } from '../../config.js';

document.addEventListener("DOMContentLoaded", function(event) {
    checkAndRefreshToken();
    setUsername()
    document.getElementById('logout').addEventListener('click', function() {
        logout();
    });
  });
  // function to set username
  function setUsername(){
   // Retrieve user data from session storage
   const userDataString = sessionStorage.getItem('userData');
  
   // Parse the JSON string to get the user data object
   const userData = JSON.parse(userDataString);
  
   // Get the user's name from the user data
   const loggedInUserName = userData.username; // Replace with the actual user's name
  
   // Update the welcome message with the user's name
   document.getElementById("welcomeMessage").innerText = `Welcome ${loggedInUserName}`;
  }
  // Function to refresh the access token
  function refreshAccessToken() {
    const refreshToken = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).refresh : null;
  
    if (refreshToken) {
        // Make a request to your Django server to refresh the token
        fetch(`${API_BASE_URL}/login/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh: refreshToken,
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Update the new access token in session storage
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            userData.access = data.access;
            console.log('Token refreshed');
            sessionStorage.setItem('userData', JSON.stringify(userData));
        })
        .catch(error => {
            console.error('Token refresh failed:', error);
            // Handle the error as needed (e.g., logout the user)
        });
    }
  }
  
  // Function to check and refresh the token periodically
  function checkAndRefreshToken() {
    setInterval(refreshAccessToken, 60 * 1000); // Refresh every 60 seconds
  }
  // Function to handle logout
function logout() {
    // Clear user data from session storage
    sessionStorage.removeItem('userData');

    // Redirect to the login page or any other desired page
    window.location.href = '../../index.html';  // Replace with the actual login page URL
}