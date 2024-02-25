import { API_BASE_URL } from '../../../config.js';

export async function loadContent(pageName) {
    try {
        const response = await fetch(pageName + '.html');
        if (!response.ok) {
            throw new Error(`Error loading content: ${response.status} ${response.statusText}`);
        }

        const html = await response.text();
        document.getElementById('main-content').innerHTML = html;

        // Now you can interact with the newly loaded DOM elements
        // For example, you can use getElementById here if needed

        // After loading content, you can execute other functions
        refreshAccessToken();

        document.getElementById('manageStaff').addEventListener('click', function () {
            populateUserTable('staffTableBody');
        });

        document.getElementById('manageStudents').addEventListener('click', function () {
            populateUserTable('studentTableBody');
        });
    } catch (error) {
        console.error(error);
    }
}

export function refreshAccessToken() {
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

export function fetchUserData(user_type) {
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

export async function populateUserTable(user) {
    let userData = [];
    if (user === 'studentTableBody') {
        userData = await fetchUserData('student');
    } else {
        userData = await fetchUserData('lecturer');
    }
    const userTableBody = document.getElementById(user);
    // Clear existing rows
    userTableBody.innerHTML = '';

    // Iterate over user data and create rows
    userData.forEach(user => {
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
        // update button
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.classList.add('btn', 'btn-primary' ,'m-2');
        // Add an event listener to handle update functionality
        updateButton.addEventListener('click', () => updateUser(user.id));
        actionCell.appendChild(updateButton);
        // delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger','m-2');
        // Add an event listener to handle delete functionality
        deleteButton.addEventListener('click', () => deleteUser(user.id));
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);

        // Append the row to the table body
        userTableBody.appendChild(row);
    });
}

// Rest of your functions...
