
import { loadContent, refreshAccessToken, fetchUserData, populateUserTable } from './userfunctions.js';

// Event listener for sidebar navigation clicks
$('#sidebar').on('click', '.nav-link', async function (e) {
    e.preventDefault();
    var pageName = $(this).attr('href');
    await loadContent(pageName);


    // Collapse the sidebar for small screens after clicking a link
    if ($(window).width() < 768) {
        $('#sidebar').toggleClass('active');
    }
});

// Initial load of default page (Dashboard)
document.addEventListener('DOMContentLoaded', async function () {
    await loadContent('dashboard');
    refreshAccessToken();
});

// ... (rest of your code)
