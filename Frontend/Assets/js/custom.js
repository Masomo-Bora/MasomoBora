document.addEventListener("DOMContentLoaded", function(event) {
    updateLoginStatus();

});
function updateLoginStatus() {
    const userDataString = sessionStorage.getItem('userData');
    const loginDropdown = document.getElementById('loginDropdown');

    if (userDataString) {
        // User is logged in
        const userData = JSON.parse(userDataString);
        const user_type = userData.user_type;

        // Change the dropdown content to a logout button
        loginDropdown.innerHTML = `<a class="nav-link page-scroll" href="index.html"id="logout">LOGOUT</a>`;
        
        // Add a click event listener to the logout button
        document.getElementById('logout').addEventListener('click', function() {
            logout(); // Call your logout function
        });
    }
}
function logout() {
    // Clear user data from session storage
    sessionStorage.removeItem('userData');

    // Redirect to the login page or any other desired page
    window.location.href = '../../index.html';  // Replace with the actual login page URL
}