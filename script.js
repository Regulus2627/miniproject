// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Handle reminder form submission
const reminderForm = document.getElementById('reminderForm');
if (reminderForm) {
    reminderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const reminderType = document.getElementById('reminderType').value;
        const reminderDate = document.getElementById('reminderDate').value;
        const reminderTime = document.getElementById('reminderTime').value;
        
        // Create reminder object
        const reminder = {
            type: reminderType,
            date: reminderDate,
            time: reminderTime,
            id: Date.now()
        };
        
        // Save to localStorage (in a real app, this would be sent to a backend)
        const reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
        reminders.push(reminder);
        localStorage.setItem('reminders', JSON.stringify(reminders));
        
        // Show success message
        showNotification('Reminder set successfully!');
        
        // Reset form
        reminderForm.reset();
    });
}

// Handle adoption buttons
document.querySelectorAll('.adopt-button').forEach(button => {
    button.addEventListener('click', function() {
        const petName = this.parentElement.querySelector('h3').textContent;
        showNotification(`Thank you for your interest in adopting ${petName}! We'll contact you soon.`);
    });
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Check for existing reminders on page load
document.addEventListener('DOMContentLoaded', function() {
    const reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    if (reminders.length > 0) {
        showNotification(`You have ${reminders.length} active reminders`);
    }
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        // Update navigation if user is logged in
        updateNavigation(true);
    } else {
        updateNavigation(false);
    }

    // Add click handler for Get Started button if it exists
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
});

// Update navigation based on login status
function updateNavigation(isLoggedIn) {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        if (isLoggedIn) {
            navLinks.innerHTML = `
                <li><a href="index.html">Home</a></li>
                <li><a href="adoption.html">Adopt</a></li>
                <li><a href="care.html">Care</a></li>
                <li><a href="profile.html">Profile</a></li>
                <li><a href="#" onclick="logout()">Logout</a></li>
            `;
        } else {
            navLinks.innerHTML = `
                <li><a href="index.html">Home</a></li>
                <li><a href="adoption.html">Adopt</a></li>
                <li><a href="care.html">Care</a></li>
                <li><a href="login.html">Login</a></li>
            `;
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Login Modal
function showLoginModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Welcome to PawCare</h2>
            <p>Please log in or create an account to continue</p>
            <div class="modal-buttons">
                <button class="login-btn">Log In</button>
                <button class="signup-btn">Sign Up</button>
            </div>
        </div>
    `;

    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    document.body.appendChild(modal);

    // Handle modal button clicks
    modal.querySelector('.login-btn').addEventListener('click', () => {
        modal.remove();
        showLoginForm();
    });

    modal.querySelector('.signup-btn').addEventListener('click', () => {
        modal.remove();
        showSignupForm();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Login Form
function showLoginForm() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Log In</h2>
            <form id="loginForm">
                <div class="form-group">
                    <label for="loginEmail">Email</label>
                    <input type="email" id="loginEmail" required>
                </div>
                <div class="form-group">
                    <label for="loginPassword">Password</label>
                    <input type="password" id="loginPassword" required>
                </div>
                <button type="submit" class="submit-button">Log In</button>
            </form>
            <p>Don't have an account? <a href="#" id="showSignup">Sign up</a></p>
        </div>
    `;

    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    document.body.appendChild(modal);

    // Handle form submission
    modal.querySelector('#loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // In a real application, this would validate against a backend
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.passwordHash === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            modal.remove();
            showNotification('Logged in successfully!');
            document.querySelector('#adopt').scrollIntoView({
                behavior: 'smooth'
            });
        } else {
            showNotification('Invalid email or password');
        }
    });

    // Handle signup link
    modal.querySelector('#showSignup').addEventListener('click', (e) => {
        e.preventDefault();
        modal.remove();
        showSignupForm();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Signup Form
function showSignupForm() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Sign Up</h2>
            <form id="signupForm">
                <div class="form-group">
                    <label for="signupName">Full Name</label>
                    <input type="text" id="signupName" required>
                </div>
                <div class="form-group">
                    <label for="signupEmail">Email</label>
                    <input type="email" id="signupEmail" required>
                </div>
                <div class="form-group">
                    <label for="signupPassword">Password</label>
                    <input type="password" id="signupPassword" required>
                </div>
                <button type="submit" class="submit-button">Sign Up</button>
            </form>
            <p>Already have an account? <a href="#" id="showLogin">Log in</a></p>
        </div>
    `;

    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    document.body.appendChild(modal);

    // Handle form submission
    modal.querySelector('#signupForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        // In a real application, this would create a user in the backend
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const newUser = {
            userId: Date.now(),
            fullName: name,
            email: email,
            passwordHash: password // In a real app, this would be hashed
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        modal.remove();
        showNotification('Account created successfully!');
        document.querySelector('#adopt').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Handle login link
    modal.querySelector('#showLogin').addEventListener('click', (e) => {
        e.preventDefault();
        modal.remove();
        showLoginForm();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
} 