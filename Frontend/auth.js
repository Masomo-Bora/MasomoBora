// auth.js

const API_BASE_URL = 'http://127.0.0.1:8000';  // Replace with your API base URL

function loginUser(username, password) {
  const loginUrl = `${API_BASE_URL}/login/`;

  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response data, save tokens to localStorage, etc.
      console.log('Login Successful:', data);
      return data;
    })
    .catch(error => {
      console.error('Login Error:', error);
      throw error;
    });
}

function logoutUser() {
  // Handle logout logic here (e.g., remove tokens from localStorage)
  console.log('User logged out');
}

function refreshToken(refreshToken) {
  const refreshUrl = `${API_BASE_URL}/token/refresh/`;

  return fetch(refreshUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response data, save new tokens to localStorage, etc.
      console.log('Token Refreshed:', data);
      return data;
    })
    .catch(error => {
      console.error('Token Refresh Error:', error);
      throw error;
    });
}

function createUser(userData) {
  const createUserUrl = `${API_BASE_URL}/users/`;

  return fetch(createUserUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response data, perform any necessary actions
      console.log('User Created:', data);
      return data;
    })
    .catch(error => {
      console.error('Create User Error:', error);
      throw error;
    });
}

// Example usage:

// loginUser('your_username', 'your_password').then(tokenData => {
//   // Use the token data (e.g., save to localStorage, navigate to a different page)
// });

// refreshToken('your_refresh_token').then(newTokenData => {
//   // Use the new token data
// });

// createUser({ username: 'new_user', password: 'new_password' }).then(newUser => {
//   // Handle the newly created user
// });

// Note: Always handle user credentials securely and consider using HTTPS for your API.
