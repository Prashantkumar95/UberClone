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
