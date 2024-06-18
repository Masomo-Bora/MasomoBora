import { API_BASE_URL } from '../../../config.js';

const usersUrl = `${API_BASE_URL}/user/`;
const accessToken = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).access : null;
async function manageUsers(user_id , method , data){
    return fetch(`${usersUrl}/${user_id}`, { // Fixed the backtick syntax error here
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body:json.stringify(data)
        
    })
        .then(response => response.json())
        .then(response => {
            if (response.ok) {
                Toastify({
                    text: "Action successful",
                    duration: 3000, // Duration in milliseconds
                    gravity: "top", // Position the toast at the top
                    backgroundColor: "green", // Background color of the toast
                }).showToast();
            } else {
                Toastify({
                    text: "Action failed",
                    duration: 3000,
                    gravity: "top",
                    backgroundColor: "red",
                }).showToast();
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            Toastify({
                text: "Error fetching user data",
                duration: 3000,
                gravity: "top",
                backgroundColor: "red",
            }).showToast();
            return Promise.reject(error);
        });
}

export{manageUsers};