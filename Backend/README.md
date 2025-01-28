# API Documentation

## `/users/register` Endpoint

### Description
This endpoint is used to register a new user.

### Method
`POST`

### Request Body
The request body should be a JSON object containing the following fields:
- `fullname`: An object containing:
  - `firstname`: The first name of the user (minimum 3 characters).
  - `lastname`: The last name of the user (minimum 3 characters).
- `email`: The email address of the user (must be a valid email).
- `password`: The password for the user (minimum 6 characters).

### Response
- `201 Created`: The user was successfully created. The response will contain the authentication token and user details.
- `400 Bad Request`: The request was invalid. The response will contain the validation errors.

### Example Request
- `user`: (object):
  - `firstname`: (string,required) The first name of the user (minimum 3 characters).
  - `lastname`: (string) The last name of the user (minimum 3 characters).
- `email`: (string, User's email address) The email address of the user (must be a valid email).
- `password`:(string) The password for the user (minimum 6 characters).
- `token`:(string) JWt token

## `/users/login` Endpoint

### Description
This endpoint is used to log in an existing user.

### Method
`POST`

### Request Body
The request body should be a JSON object containing the following fields:
- `email`: The email address of the user (must be a valid email).
- `password`: The password for the user (minimum 6 characters).

### Response
- `200 OK`: The user was successfully logged in. The response will contain the authentication token and user details.
- `400 Bad Request`: The request was invalid. The response will contain the validation errors.
- `401 Unauthorized`: The email or password was incorrect.

### Example Request
```json
{
  "email": "test@test.com",
  "password": "test_password"
}
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60c72b2f9b1e8b001c8e4e1a",
    "fullname": {
      "firstname": "test_firstname",
      "lastname": "test_lastname"
    },
    "email": "test@test.com"
  }
}
```

### Status Codes
- `200 OK`: User successfully logged in.
- `400 Bad Request`: Validation errors in the request body.
- `401 Unauthorized`: Invalid email or password.

### Endpoint
`POST /users/login`
