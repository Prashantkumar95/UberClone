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
```json
{
  "fullname": {
    "firstname": "John", // minimum 3 characters
    "lastname": "Doe" // minimum 3 characters
  },
  "email": "john.doe@example.com", // must be a valid email
  "password": "password123" // minimum 6 characters
}
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60c72b2f9b1e8b001c8e4e1a",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Status Codes
- `201 Created`: User successfully registered.
- `400 Bad Request`: Validation errors in the request body.

### Endpoint
`POST /users/register`

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
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60c72b2f9b1e8b001c8e4e1a",
    "fullname": {
      "firstname": "johndoe",
      "lastname": "doe"
    },
    "email": "johndoe@example.com"
  }
}
```

### Status Codes
- `200 OK`: User successfully logged in.
- `400 Bad Request`: Validation errors in the request body.
- `401 Unauthorized`: Invalid email or password.

### Endpoint
`POST /users/login`

## `/users/profile` Endpoint

### Description
This endpoint is used to get the profile of the logged-in user.

### Method
`GET`

### Response
- `200 OK`: The user's profile was successfully retrieved. The response will contain the user details.
- `401 Unauthorized`: The user is not authenticated.

### Example Response
```json
{
  "_id": "60c72b2f9b1e8b001c8e4e1a",
  "fullname": {
    "firstname": "johndoe",
    "lastname": "doe"
  },
  "email": "johndoe@example.com"
}
```

### Status Codes
- `200 OK`: User profile successfully retrieved.
- `401 Unauthorized`: User not authenticated.

### Endpoint
`GET /users/profile`

## `/users/logout` Endpoint

### Description
This endpoint is used to log out the currently logged-in user and blacklist the token provided in cookies or headers.

### Method
`GET`

### Authentication
This endpoint requires a valid JWT token.

### Response
- `200 OK`: The user was successfully logged out. The response will contain a success message.

### Example Response
```json
{
  "message": "Logged out successfully"
}
```

### Status Codes
- `200 OK`: User successfully logged out.
- `401 Unauthorized`: User not authenticated.

### Endpoint
`GET /users/logout`

## `/captains/register` Endpoint

### Description
This endpoint is used to register a new captain.

### Method
`POST`

### Request Body
The request body should be a JSON object containing the following fields:
- `fullname`: An object containing:
  - `firstname`: The first name of the captain (minimum 3 characters).
  - `lastname`: The last name of the captain (minimum 3 characters).
- `email`: The email address of the captain (must be a valid email).
- `password`: The password for the captain (minimum 6 characters).
- `vehicle`: An object containing:
  - `color`: The color of the vehicle (minimum 3 characters).
  - `plate`: The plate number of the vehicle (minimum 3 characters).
  - `capacity`: The capacity of the vehicle (must be greater than 0).
  - `vehicleType`: The type of the vehicle (must be one of 'car', 'motorcycle', 'auto').

### Response
- `201 Created`: The captain was successfully created. The response will contain the captain details.
- `400 Bad Request`: The request was invalid. The response will contain the validation errors.

### Example Response
```json
{
  "_id": "60c72b2f9b1e8b001c8e4e1a",
  "fullname": {
    "firstname": "john",
    "lastname": "doe"
  },
  "email": "johndoe@example.com",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Status Codes
- `201 Created`: Captain successfully created.
- `400 Bad Request`: Validation errors in the request body.

### Endpoint
`POST /captains/register`
 