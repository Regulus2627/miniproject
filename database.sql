-- Create the database
CREATE DATABASE pawcare;

-- Connect to the database
\c pawcare;

-- Create enum types
CREATE TYPE gender_type AS ENUM ('Male', 'Female', 'Other');
CREATE TYPE pet_status AS ENUM ('Available', 'Adopted', 'Pending');
CREATE TYPE reminder_type AS ENUM ('Vaccination', 'Checkup', 'Grooming', 'Medication', 'Other');
CREATE TYPE care_type AS ENUM ('Vaccination', 'Checkup', 'Grooming', 'Medicine');

-- Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pets table
CREATE TABLE pets (
    pet_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50) NOT NULL,
    breed VARCHAR(100),
    age INTEGER,
    gender gender_type NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    status pet_status DEFAULT 'Available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- New fields for stray animals
    location_found VARCHAR(255),
    health_condition TEXT,
    is_vaccinated BOOLEAN,
    is_neutered BOOLEAN,
    special_needs TEXT,
    temperament VARCHAR(50),
    size VARCHAR(20),
    coat_type VARCHAR(50),
    is_good_with_children BOOLEAN,
    is_good_with_other_pets BOOLEAN,
    estimated_age VARCHAR(50),
    rescue_date DATE,
    last_vaccination_date DATE,
    next_vaccination_due DATE,
    medical_history TEXT,
    dietary_requirements TEXT,
    exercise_needs TEXT,
    grooming_needs TEXT
);

-- Adoptions table
CREATE TABLE adoptions (
    adoption_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    pet_id INTEGER REFERENCES pets(pet_id),
    adoption_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'Pending',
    living_situation TEXT,
    experience TEXT,
    time_commitment TEXT,
    vet_reference VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reminders table
CREATE TABLE reminders (
    reminder_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    pet_id INTEGER REFERENCES pets(pet_id),
    type reminder_type NOT NULL,
    reminder_date DATE NOT NULL,
    reminder_time TIME NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pet Care History table
CREATE TABLE care_history (
    care_id SERIAL PRIMARY KEY,
    pet_id INTEGER REFERENCES pets(pet_id),
    care_date DATE NOT NULL,
    care_type VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_pets_status ON pets(status);
CREATE INDEX idx_pets_species ON pets(species);
CREATE INDEX idx_adoptions_user ON adoptions(user_id);
CREATE INDEX idx_adoptions_pet ON adoptions(pet_id);
CREATE INDEX idx_reminders_user ON reminders(user_id);
CREATE INDEX idx_reminders_pet ON reminders(pet_id);
CREATE INDEX idx_care_history_pet ON care_history(pet_id);

-- Insert sample data
INSERT INTO users (username, email, password_hash, full_name, phone, address) VALUES
('john_doe', 'john@example.com', 'hashed_password_1', 'John Doe', '123-456-7890', '123 Main St'),
('jane_smith', 'jane@example.com', 'hashed_password_2', 'Jane Smith', '098-765-4321', '456 Oak Ave');

-- Insert sample pets
INSERT INTO pets (name, species, breed, age, gender, description, image_url, location_found, health_condition, is_vaccinated, is_neutered, temperament, size, rescue_date) VALUES
('Luna', 'Cat', 'Stray', 2, 'Female', 'Sweet and affectionate cat found in downtown area', 'https://placekitten.com/300/200', 'Downtown', 'Healthy', true, true, 'Friendly', 'Medium', '2023-01-15'),
('Max', 'Dog', 'Mixed Breed', 1, 'Male', 'Playful and friendly puppy found near park', 'https://placedog.net/300/200', 'Central Park', 'Healthy', true, true, 'Energetic', 'Medium', '2023-02-20'),
('Bella', 'Cat', 'Stray', 3, 'Female', 'Elegant cat found in residential area', 'https://placekitten.com/301/200', 'Residential Area', 'Healthy', true, true, 'Calm', 'Small', '2023-03-10');

-- Insert sample reminders
INSERT INTO reminders (user_id, pet_id, type, reminder_date, reminder_time) VALUES
(1, 1, 'Vaccination', CURRENT_DATE + INTERVAL '1 month', '10:00:00'),
(1, 2, 'Checkup', CURRENT_DATE + INTERVAL '2 months', '14:00:00');

-- Insert sample care history
INSERT INTO care_history (pet_id, care_date, care_type, description) VALUES
(1, CURRENT_DATE - INTERVAL '1 month', 'Vaccination', 'Annual vaccination completed'),
(2, CURRENT_DATE - INTERVAL '2 weeks', 'Checkup', 'Regular health checkup'); 