const apiUrl = 'http://localhost:3000/users'; // Adjust this if your backend uses a different endpoint

// Get DOM elements
const userForm = document.getElementById('userForm');
const userTable = document.getElementById('userTable');
const userIdInput = document.getElementById('userId');
const userNameInput = document.getElementById('userName');
const submitButton = document.getElementById('submitButton');

// Fetch and display all users
async function fetchUsers() {
    try {
        const response = await fetch(apiUrl);
        const users = await response.json();

        // Clear existing rows
        userTable.innerHTML = '';

        // Add rows to the table
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td class="action-buttons">
                    <button onclick="editUser('${user._id}')">Edit</button>
                    <button onclick="deleteUser('${user._id}')">Delete</button>
                </td>
            `;
            userTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Add or update user
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = userIdInput.value;
    const userData = {
        name: userNameInput.value,
    };

    try {
        const method = userId ? 'PUT' : 'POST';
        const url = userId ? `${apiUrl}/${userId}` : apiUrl;

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            alert(`User ${userId ? 'updated' : 'added'} successfully`);
            userForm.reset();
            userIdInput.value = '';
            submitButton.textContent = 'Add User';
            fetchUsers();
        } else {
            alert('Failed to save user');
        }
    } catch (error) {
        console.error('Error saving user:', error);
    }
});

// Edit user
async function editUser(userId) {
    try {
        const response = await fetch(`${apiUrl}/${userId}`);
        const user = await response.json();

        userIdInput.value = user._id;
        userNameInput.value = user.name;
        submitButton.textContent = 'Update User';
    } catch (error) {
        console.error('Error editing user:', error);
    }
}

// Delete user
async function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        try {
            const response = await fetch(`${apiUrl}/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('User deleted successfully');
                fetchUsers();
            } else {
                alert('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }
}

// Initial fetch
fetchUsers();
