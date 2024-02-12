# User Verification App
This is a user verification application that verifies user emails before storing them in the database.

## Description
This application allows users to sign up, verify their email addresses, log in, and perform various user-related operations. It implements email verification using randomly generated codes and provides endpoints for user authentication.

## Endpoints
**Public Endpoints**
***POST /users***

- Creates a new user.
- Enforces email verification by sending a verification email.
- Body:
json
```json
    {
  "email": "user@example.com",
  "password": "password",
  "firstName": "John",
  "lastName": "Doe",
  "country": "USA",
  "image": "avatar.jpg"
}
```
***GET /users/verify/:code***

Verifies the user's email using the verification code sent via email.
POST /users/login

Authenticates users with their email and password.
Returns a JWT token upon successful authentication.
Private Endpoints
***GET /users/me***

Retrieves the currently logged-in user's information.
***GET /users***

Retrieves information about all users.
***GET /users/:id***

Retrieves information about a specific user by ID.
***DELETE /users/:id***

Deletes a user by ID.
***PUT /users/:id***

Updates a user's information by ID.
Optional Endpoint
***POST /users/reset_password***

Resets a user's password.
Sends a password reset link to the user's email address.
***POST /users/reset_password/:code***

# Resets a User's Password

Resets a user's password using the password reset code sent via email.

## Frontend Repository

The frontend repository for this application can be found [here](link_to_frontend_repository).

## Setup

1. Clone the frontend repository.
2. Clone this repository.
3. Install dependencies using `npm install`.
4. Set up environment variables (e.g., database connection, email configuration).
5. Run the application using `npm start`.

## Technologies Used

- Node.js
- Express.js
- Sequelize (ORM)
- PostgreSQL (Database)
- Nodemailer (Email sending)
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- Crypto module for generating random codes

## Contributors

- [Jesús Aguilar](https://github.com/JesusAguilarAliaga)

## License

This project is licensed under the MIT License - see the [LICENSE](link_to_license_file) file for details.
