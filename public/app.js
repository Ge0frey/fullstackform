document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const userList = document.getElementById('userList');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        let isValid = true;

        if (name === '') {
            document.getElementById('nameError').innerText = "Please enter the full name! ";
            isValid = false;
        } else {
            document.getElementById('nameError').innerText = '';
        }

        if (!email) {
            document.getElementById('emailError').innerText = "Please enter the email! ";
            isValid = false;
        } else {
            document.getElementById('emailError').innerText = '';
        }

        if (isValid) {
            try {
                const response = await fetch('/api/users/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json',
                    },
                    body: JSON.stringify({name,email}),
                });

                if(response.ok) {
                    form.reset();
                    fetchUsers();
                } else {
                    console.log('Error creating user');
                }
            } catch (error) {
                console.log('Error:', error);
            }
        }
    });

    async function fetchUsers() {
        try {
            const response = await fetch('/api/users');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const users = await response.json();
            if (!Array.isArray(users)) {
                throw new Error('Expected an array of users');
            }
            renderUsers(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            renderError('Failed to fetch users. Please try again later.');
        }
    }
    
    function renderUsers(users) {
        const userList = document.getElementById('userList');
        userList.innerHTML = '<h2>USER LIST</h2>';
        if (users.length === 0) {
            userList.innerHTML += '<p>No users found.</p>';
        } else {
            users.forEach(user => {
                const userElement = document.createElement('div');
                userElement.textContent = `${user.name} (${user.email})`;
                userList.appendChild(userElement);
            });
        }
    }
    
    function renderError(message) {
        const userList = document.getElementById('userList');
        userList.innerHTML = `<h2>ERROR</h2><p>${message}</p>`;
    }
    
    // Fetch users on page load
    document.addEventListener('DOMContentLoaded', fetchUsers);
})