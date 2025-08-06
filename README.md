# PawCare - Pet Care Management System

A modern web application for pet adoption and care management. This application helps pet owners manage their pets' care schedules, find new companions, and keep track of important pet-related tasks.

## Features

- Pet Adoption Platform
- Pet Care Reminders
- Vaccination Tracking
- Grooming Schedule Management
- Pet Care History
- User Authentication
- Responsive Design

## Tech Stack

- Frontend:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Font Awesome Icons
  - Google Fonts

- Backend:
  - Java 11
  - Spring Boot 2.7.0
  - Spring Security
  - Spring Data JPA
  - MySQL Database
  - JWT Authentication

## Prerequisites

- Java JDK 11 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher
- Modern web browser

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pawcare.git
   cd pawcare
   ```

2. Set up the database:
   - Create a MySQL database named 'pawcare'
   - Run the SQL script in `database.sql`

3. Configure the application:
   - Update the database credentials in `src/main/resources/application.properties`
   - Update the JWT secret key in the same file

4. Build the application:
   ```bash
   mvn clean install
   ```

5. Run the application:
   ```bash
   mvn spring-boot:run
   ```

6. Access the application:
   - Open your web browser
   - Navigate to `http://localhost:8080`

## Project Structure

```
pawcare/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── pawcare/
│   │   │           ├── config/
│   │   │           ├── controller/
│   │   │           ├── model/
│   │   │           ├── repository/
│   │   │           ├── service/
│   │   │           └── PawCareApplication.java
│   │   └── resources/
│   │       ├── static/
│   │       ├── templates/
│   │       └── application.properties
│   └── test/
├── database.sql
├── index.html
├── styles.css
├── script.js
├── pom.xml
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

