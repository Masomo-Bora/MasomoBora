import { API_BASE_URL } from '../../../config.js';
document.addEventListener("DOMContentLoaded", function(event) {
        // Log all DOM elements
        console.log('All DOM elements:', document.querySelectorAll('*'));
    refreshAccessToken();
    document.getElementById('manageStaff').addEventListener('click', function() {
        // Call the function to populate the user table
    populateUserTable('staffTableBody');
    });
    document.getElementById('manageStudents').addEventListener('click', function() {
        // Call the function to populate the user table
    populateUserTable('studentTableBody');
    });
  
  });
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
  function fetchUserData(user_type) {
    const usersUrl = `${API_BASE_URL}/users/`;
    const accessToken = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).access : null;
    return fetch(usersUrl, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    })
    .then(response => response.json())
    .then(userData => {

        // Check if userData is an array before filtering
        if (Array.isArray(userData)) {
            // Return the filtered data
            let filtered_data = user_type ? userData.filter(user => user.user_type === user_type) : userData;
            return filtered_data;
        } else {
            // Handle the case where userData is not an array
            console.error('Error: userData is not an array');
            return Promise.reject('Error: userData is not an array');
        }
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
        return Promise.reject(error);
    });
}



// Function to populate the user table
async function populateUserTable(user)  {
    const userTableBody = document.getElementById(user);
    let userData = [];
    if (user == 'studentTableBody' ){
        userData = await fetchUserData('student');
        console.log(userData);
    }
    else{
        userData = await fetchUserData('staff');
    }

    // // Clear existing rows
    // userTableBody.innerHTML = '';

    // Iterate over user data and create rows
    alert(userData);
    userData.forEach(user => {
        alert(user);
        const row = document.createElement('tr');

        // Create cells for each property
        const idCell = document.createElement('td');
        idCell.textContent = user.id;
        row.appendChild(idCell);

        const usernameCell = document.createElement('td');
        usernameCell.textContent = user.username;
        row.appendChild(usernameCell);

        const userTypeCell = document.createElement('td');
        userTypeCell.textContent = user.user_type;
        row.appendChild(userTypeCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        // Create action cell with delete and update buttons
        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger');
        // Add an event listener to handle delete functionality
        deleteButton.addEventListener('click', () => deleteUser(user.id));
        actionCell.appendChild(deleteButton);

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.classList.add('btn', 'btn-primary');
        // Add an event listener to handle update functionality
        updateButton.addEventListener('click', () => updateUser(user.id));
        actionCell.appendChild(updateButton);

        row.appendChild(actionCell);

        // Append the row to the table body
        userTableBody.appendChild(row);
    });
}

// Function to simulate deleting a user
function deleteUser(userId) {
    // Implement your logic for deleting a user (e.g., make an API call)
    console.log(`Deleting user with ID ${userId}`);
}

// Function to simulate updating a user
function updateUser(userId) {
    // Implement your logic for updating a user (e.g., redirect to an update page)
    console.log(`Updating user with ID ${userId}`);
}


        
// Function to create a new user
function createUser(userData) {
const createUserUrl =  `${API_BASE_URL}/create_user/`; 
const accessToken = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).access : null;


fetch(createUserUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(userData),
})
.then(response => response.json())
.then(data => {
    console.log('User created successfully:', data);
    // You can perform additional actions here if needed
})
.catch(error => {
    console.error('Error creating user:', error);
});
}

// Data for the new user
const newUser = {
"username": "Student1",
"email": "Student1@gmail.com",
"user_type": "student",
"password": "12345"
};


