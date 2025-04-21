document.addEventListener('DOMContentLoaded', function() {
    // Form switching functions
    window.toggleForms = function(form) {
        const loginContainer = document.getElementById('loginFormContainer');
        const signupContainer = document.getElementById('signupFormContainer');

        if (form === 'signup') {
            loginContainer.style.display = 'none';
            signupContainer.style.display = 'block';
        } else {
            loginContainer.style.display = 'block';
            signupContainer.style.display = 'none';
        }
    }

    // Get form elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:8081/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    const user = await response.json();
                    localStorage.setItem('user', JSON.stringify({
                        id: user.userId,
                        fullName: user.fullName,
                        email: user.email
                    }));
                    
                    showNotification('Login successful!', 'success');
                    window.location.href = 'profile.html';
                } else {
                    showNotification('Invalid email or password', 'error');
                }
            } catch (error) {
                console.error('Login error:', error);
                showNotification('Error during login. Please try again.', 'error');
            }
        });
    }

    // Handle signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const fullName = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }

            try {
                const response = await fetch('http://localhost:8081/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullName,
                        email,
                        password
                    })
                });

                if (response.ok) {
                    const newUser = await response.json();
                    localStorage.setItem('user', JSON.stringify({
                        id: newUser.userId,
                        fullName: newUser.fullName,
                        email: newUser.email
                    }));

                    showNotification('Account created successfully!', 'success');
                    setTimeout(() => {
                        window.location.href = 'profile.html';
                    }, 1500);
                } else {
                    const error = await response.json();
                    showNotification(error.message || 'Error creating account', 'error');
                }
            } catch (error) {
                console.error('Registration error:', error);
                showNotification('Error during registration. Please try again.', 'error');
            }
        });
    }

    // Show notification function
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Check if user is already logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        window.location.href = 'profile.html';
    }
});