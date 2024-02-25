// auth.js

import { API_BASE_URL } from '../config.js';

document.addEventListener("DOMContentLoaded", function(event) {
  checkLoggedInAndRedirect();
  let loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let username = document.getElementById("username");
    let password = document.getElementById("password");

    if (username.value == "" || password.value == "") {
      alert( "Please fill out all fields" );
    } else {
      loginUser(username.value, password.value);
    }
  });
  
});

function loginUser(username, password) {
  const loginUrl = `${API_BASE_URL}/login/`;

  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle the response data, save tokens to localStorage, etc.
      console.log('Login Successful:', data);
      if(data.user_type == "admin"){
        window.location.href = '../../modules/admin/index.html'; 
      }
      else if (data.user_type== "lecturer"){
        window.location.href = '../../modules/staff/index.html'; 
      }
      else if (data.user_type == "student"){
        window.location.href ='../../modules/students/index.html'; 
      }
      const userdata = JSON.stringify(data);
      // Alternatively, you can use sessionStorage for temporary storage
      sessionStorage.setItem('userData', userdata);
      return userdata;
    })
    .catch(error => {
      console.error('Login Error:', error);
      throw error;
    });
}
// Function to check if the user is logged in and redirect based on user_type
function checkLoggedInAndRedirect() {
  const userDataString = sessionStorage.getItem('userData');

  // If user data is present in session storage
  if (userDataString) {
      const userData = JSON.parse(userDataString);
      const user_type = userData.user_type;

      // Redirect based on user_type
      switch (user_type) {
          case 'admin':
              window.location.href = '../../modules/admin/index.html'; // Redirect to admin dashboard
              break;
          case 'lecturer':
              window.location.href = '../../modules/staff/index.html'; // Redirect to student dashboard
              break;
          case 'student':
             window.location.href = '../../modules/students/index.html'; // Redirect to student dashboard
              break;    
          default:
              window.location.href = '../../modules/students/index.html'; // Redirect to a default dashboard
      }
  }
}