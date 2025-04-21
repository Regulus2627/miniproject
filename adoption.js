// Sample pet data (replace with API call in production)
const pets = [
    {
        id: 1,
        name: 'Luna',
        species: 'Cat',
        breed: 'Stray',
        age: 2,
        gender: 'Female',
        description: 'Sweet and affectionate cat found in downtown area',
        imageUrl: 'https://placekitten.com/300/200',
        locationFound: 'Downtown',
        healthCondition: 'Healthy',
        isVaccinated: true,
        isNeutered: true,
        temperament: 'Friendly',
        size: 'Medium',
        rescueDate: '2023-01-15'
    },
    {
        id: 2,
        name: 'Max',
        species: 'Dog',
        breed: 'Mixed Breed',
        age: 1,
        gender: 'Male',
        description: 'Playful and friendly puppy found near park',
        imageUrl: 'https://placedog.net/300/200',
        locationFound: 'Central Park',
        healthCondition: 'Healthy',
        isVaccinated: true,
        isNeutered: true,
        temperament: 'Energetic',
        size: 'Medium',
        rescueDate: '2023-02-20'
    },
    {
        id: 3,
        name: 'Bella',
        species: 'Cat',
        breed: 'Stray',
        age: 3,
        gender: 'Female',
        description: 'Elegant cat found in residential area',
        imageUrl: 'https://placekitten.com/301/200',
        locationFound: 'Residential Area',
        healthCondition: 'Healthy',
        isVaccinated: true,
        isNeutered: true,
        temperament: 'Calm',
        size: 'Small',
        rescueDate: '2023-03-10'
    }
];

// Function to create pet cards
function createPetCard(pet) {
    return `
        <div class="pet-card">
            <div class="pet-image">
                <img src="${pet.imageUrl}" alt="${pet.name}" onerror="this.src='images/default-pet.jpg'">
            </div>
            <div class="pet-info">
                <h3>${pet.name}</h3>
                <p class="pet-breed">${pet.breed} ${pet.species}</p>
                <p class="pet-age">${pet.age} years old</p>
                <p class="pet-description">${pet.description}</p>
                <div class="pet-details">
                    <span><i class="fas fa-map-marker-alt"></i> ${pet.locationFound}</span>
                    <span><i class="fas fa-heart"></i> ${pet.healthCondition}</span>
                    <span><i class="fas fa-syringe"></i> ${pet.isVaccinated ? 'Vaccinated' : 'Not Vaccinated'}</span>
                </div>
                <div class="pet-traits">
                    <span class="trait">${pet.temperament}</span>
                    <span class="trait">${pet.size}</span>
                </div>
                <button class="adopt-button" onclick="showAdoptionForm(${pet.id})">Adopt ${pet.name}</button>
            </div>
        </div>
    `;
}

// Function to filter pets
function filterPets() {
    const species = document.getElementById('species').value;
    const age = document.getElementById('age').value;
    const size = document.getElementById('size').value;
    const temperament = document.getElementById('temperament').value;

    let filteredPets = pets;

    if (species) {
        filteredPets = filteredPets.filter(pet => pet.species === species);
    }

    if (age) {
        filteredPets = filteredPets.filter(pet => {
            switch(age) {
                case 'young': return pet.age <= 1;
                case 'adult': return pet.age > 1 && pet.age <= 7;
                case 'senior': return pet.age > 7;
            }
        });
    }

    if (size) {
        filteredPets = filteredPets.filter(pet => pet.size === size);
    }

    if (temperament) {
        filteredPets = filteredPets.filter(pet => pet.temperament === temperament);
    }

    displayPets(filteredPets);
}

// Function to display pets
function displayPets(petsToShow) {
    const petsGrid = document.getElementById('petsGrid');
    petsGrid.innerHTML = petsToShow.map(pet => createPetCard(pet)).join('');
}

// Function to show adoption form
function showAdoptionForm(petId) {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        showLoginModal();
        return;
    }

    // Create and show adoption form modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Adoption Application</h2>
            <form id="adoptionForm" onsubmit="submitAdoptionForm(event, ${petId})">
                <div class="form-group">
                    <label for="livingSituation">Living Situation:</label>
                    <textarea id="livingSituation" required></textarea>
                </div>
                <div class="form-group">
                    <label for="experience">Previous Pet Experience:</label>
                    <textarea id="experience" required></textarea>
                </div>
                <div class="form-group">
                    <label for="timeCommitment">Time Commitment:</label>
                    <textarea id="timeCommitment" required></textarea>
                </div>
                <div class="form-group">
                    <label for="vetReference">Veterinarian Reference:</label>
                    <input type="text" id="vetReference" required>
                </div>
                <div class="form-buttons">
                    <button type="submit" class="submit-button">Submit Application</button>
                    <button type="button" class="cancel-button" onclick="closeModal()">Cancel</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

// Function to submit adoption form
function submitAdoptionForm(event, petId) {
    event.preventDefault();
    
    const formData = {
        petId: petId,
        livingSituation: document.getElementById('livingSituation').value,
        experience: document.getElementById('experience').value,
        timeCommitment: document.getElementById('timeCommitment').value,
        vetReference: document.getElementById('vetReference').value,
        userId: JSON.parse(localStorage.getItem('user')).id,
        status: 'Pending'
    };

    // In production, this would be an API call
    console.log('Adoption application submitted:', formData);
    
    // Show success message
    showNotification('Adoption application submitted successfully!', 'success');
    closeModal();
}

// Function to show login modal
function showLoginModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Login Required</h2>
            <p>Please log in to submit an adoption application.</p>
            <div class="modal-buttons">
                <button onclick="window.location.href='login.html'" class="login-button">Login</button>
                <button onclick="closeModal()" class="cancel-button">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Function to close modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Function to show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    console.log('Initial pets:', pets);
    
    const petsGrid = document.getElementById('petsGrid');
    console.log('Pets grid element:', petsGrid);
    
    if (petsGrid) {
        displayPets(pets);
    } else {
        console.error('Pets grid element not found!');
    }

    // Add event listeners to filters
    const speciesFilter = document.getElementById('species');
    const ageFilter = document.getElementById('age');
    const sizeFilter = document.getElementById('size');
    const temperamentFilter = document.getElementById('temperament');

    console.log('Filter elements:', {
        species: speciesFilter,
        age: ageFilter,
        size: sizeFilter,
        temperament: temperamentFilter
    });

    if (speciesFilter) speciesFilter.addEventListener('change', filterPets);
    if (ageFilter) ageFilter.addEventListener('change', filterPets);
    if (sizeFilter) sizeFilter.addEventListener('change', filterPets);
    if (temperamentFilter) temperamentFilter.addEventListener('change', filterPets);
}); 