// Check if user is logged in
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    // Load user data
    loadUserData(user);
    // Load user's pets
    loadUserPets(user.id);
    // Load user's reminders
    loadUserReminders(user.id);
    // Load adoption history
    loadAdoptionHistory(user.id);
});

// Load user data into form
async function loadUserData(user) {
    try {
        const response = await fetch(`http://localhost:8081/api/users/${user.id}`);
        const userData = await response.json();
        
        document.getElementById('userName').textContent = userData.fullName || 'User';
        document.getElementById('userEmail').textContent = userData.email;
        
        document.getElementById('fullName').value = userData.fullName || '';
        document.getElementById('email').value = userData.email;
        document.getElementById('phone').value = userData.phone || '';
        document.getElementById('address').value = userData.address || '';
    } catch (error) {
        showNotification('Error loading user data', 'error');
    }
}

// Handle profile form submission
document.getElementById('profileForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('user'));
    const updatedUser = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };

    try {
        const response = await fetch(`http://localhost:8081/api/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser)
        });

        if (response.ok) {
            const updatedUserData = await response.json();
            localStorage.setItem('user', JSON.stringify({
                ...user,
                fullName: updatedUserData.fullName,
                email: updatedUserData.email
            }));
            showNotification('Profile updated successfully!', 'success');
        } else {
            showNotification('Error updating profile', 'error');
        }
    } catch (error) {
        showNotification('Error updating profile', 'error');
    }
});

// Load user's pets
async function loadUserPets(userId) {
    try {
        const response = await fetch(`http://localhost:8081/api/pets`);
        const pets = await response.json();
        
        const petsGrid = document.getElementById('myPetsGrid');
        petsGrid.innerHTML = pets.map(pet => createPetCard(pet)).join('');
    } catch (error) {
        showNotification('Error loading pets', 'error');
    }
}

// Create pet card
function createPetCard(pet) {
    return `
        <div class="pet-card">
            <div class="pet-image">
                <img src="${pet.imageUrl || 'https://via.placeholder.com/300x200'}" alt="${pet.name}">
            </div>
            <div class="pet-info">
                <h3>${pet.name}</h3>
                <p class="pet-breed">${pet.breed} ${pet.species}</p>
                <p class="pet-age">${pet.age} years old</p>
                <div class="pet-actions">
                    <button onclick="editPet(${pet.petId})" class="edit-button">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button onclick="deletePet(${pet.petId})" class="delete-button">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Load user's reminders
function loadUserReminders(userId) {
    // In production, this would be an API call
    const reminders = JSON.parse(localStorage.getItem('reminders') || '[]')
        .filter(reminder => reminder.userId === userId)
        .sort((a, b) => new Date(a.reminderDate) - new Date(b.reminderDate));

    const remindersList = document.getElementById('remindersList');
    remindersList.innerHTML = reminders.map(reminder => createReminderItem(reminder)).join('');
}

// Create reminder item
function createReminderItem(reminder) {
    return `
        <div class="reminder-item ${reminder.isCompleted ? 'completed' : ''}">
            <div class="reminder-info">
                <h4>${reminder.type}</h4>
                <p>${reminder.petName}</p>
                <p>${formatDate(reminder.reminderDate)} at ${reminder.reminderTime}</p>
            </div>
            <div class="reminder-actions">
                <button onclick="toggleReminder(${reminder.id})" class="complete-button">
                    <i class="fas fa-check"></i>
                </button>
                <button onclick="deleteReminder(${reminder.id})" class="delete-button">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

// Load adoption history
function loadAdoptionHistory(userId) {
    // In production, this would be an API call
    const adoptions = JSON.parse(localStorage.getItem('adoptions') || '[]')
        .filter(adoption => adoption.userId === userId)
        .sort((a, b) => new Date(b.adoptionDate) - new Date(a.adoptionDate));

    const adoptionHistory = document.getElementById('adoptionHistory');
    adoptionHistory.innerHTML = adoptions.map(adoption => createAdoptionItem(adoption)).join('');
}

// Create adoption history item
function createAdoptionItem(adoption) {
    return `
        <div class="adoption-item">
            <div class="adoption-info">
                <h4>${adoption.petName}</h4>
                <p>Adopted on: ${formatDate(adoption.adoptionDate)}</p>
                <p>Status: <span class="status ${adoption.status.toLowerCase()}">${adoption.status}</span></p>
            </div>
        </div>
    `;
}

// Show add pet modal
function showAddPetModal() {
    document.getElementById('addPetModal').style.display = 'flex';
}

// Show add reminder modal
function showAddReminderModal() {
    const user = JSON.parse(localStorage.getItem('user'));
    const pets = JSON.parse(localStorage.getItem('pets') || '[]')
        .filter(pet => pet.userId === user.id);

    const petSelect = document.getElementById('reminderPet');
    petSelect.innerHTML = pets.map(pet => 
        `<option value="${pet.id}">${pet.name}</option>`
    ).join('');

    document.getElementById('addReminderModal').style.display = 'flex';
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Add new pet
async function addNewPet(event) {
    event.preventDefault();
    
    const newPet = {
        name: document.getElementById('petName').value,
        species: document.getElementById('petSpecies').value,
        breed: document.getElementById('petBreed').value,
        age: parseInt(document.getElementById('petAge').value),
        gender: document.getElementById('petGender').value
    };

    try {
        const response = await fetch('http://localhost:8081/api/pets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPet)
        });

        if (response.ok) {
            const user = JSON.parse(localStorage.getItem('user'));
            loadUserPets(user.id);
            closeModal('addPetModal');
            showNotification('Pet added successfully!', 'success');
        } else {
            showNotification('Error adding pet', 'error');
        }
    } catch (error) {
        showNotification('Error adding pet', 'error');
    }
}

// Add new reminder
function addNewReminder(event) {
    event.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('user'));
    const pets = JSON.parse(localStorage.getItem('pets') || '[]');
    const selectedPet = pets.find(pet => pet.id === parseInt(document.getElementById('reminderPet').value));

    const newReminder = {
        id: Date.now(),
        userId: user.id,
        petId: selectedPet.id,
        petName: selectedPet.name,
        type: document.getElementById('reminderType').value,
        reminderDate: document.getElementById('reminderDate').value,
        reminderTime: document.getElementById('reminderTime').value,
        isCompleted: false
    };

    // In production, this would be an API call
    const reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    reminders.push(newReminder);
    localStorage.setItem('reminders', JSON.stringify(reminders));

    loadUserReminders(user.id);
    closeModal('addReminderModal');
    showNotification('Reminder added successfully!', 'success');
}

// Toggle reminder completion
function toggleReminder(reminderId) {
    const reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    const reminder = reminders.find(r => r.id === reminderId);
    
    if (reminder) {
        reminder.isCompleted = !reminder.isCompleted;
        localStorage.setItem('reminders', JSON.stringify(reminders));
        loadUserReminders(JSON.parse(localStorage.getItem('user')).id);
    }
}

// Delete reminder
function deleteReminder(reminderId) {
    if (confirm('Are you sure you want to delete this reminder?')) {
        const reminders = JSON.parse(localStorage.getItem('reminders') || '[]')
            .filter(r => r.id !== reminderId);
        localStorage.setItem('reminders', JSON.stringify(reminders));
        loadUserReminders(JSON.parse(localStorage.getItem('user')).id);
        showNotification('Reminder deleted successfully!', 'success');
    }
}

// Delete pet
async function deletePet(petId) {
    if (confirm('Are you sure you want to delete this pet?')) {
        try {
            const response = await fetch(`http://localhost:8081/api/pets/${petId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                const user = JSON.parse(localStorage.getItem('user'));
                loadUserPets(user.id);
                showNotification('Pet deleted successfully!', 'success');
            } else {
                showNotification('Error deleting pet', 'error');
            }
        } catch (error) {
            showNotification('Error deleting pet', 'error');
        }
    }
}

// Update profile picture
function updateProfilePicture(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const user = JSON.parse(localStorage.getItem('user'));
            user.profilePicture = e.target.result;
            localStorage.setItem('user', JSON.stringify(user));
            document.getElementById('profilePicture').src = e.target.result;
            showNotification('Profile picture updated successfully!', 'success');
        };
        reader.readAsDataURL(file);
    }
}

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
} 