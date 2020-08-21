# back-end

## Endpoints

API requires a jsonwebtoken sent by the server to be sent in the Authorization header to be received.

| Type   | Endpoint           | Token Required | Description                                                                                                                                                |
|--------|--------------------|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET    | /                  | no             | Root Route                                                                                                                                                 |
| POST   | /api/auth/register | no             | accepts an object { username: string, password: string } and returns a new user plus a token                                                               |
| POST   | /api/auth/login    | no             | accepts an object { username: string, password: string } and returns a token if user exists in database and password matches what is found in the database |
| GET    | /api/saved/        | yes            | returns an array of objects saved to the current user of the token received.                                                                               |
| POST   | /api/saved/        | yes            | accepts an object { strain: string, strain_type: string, description: text, effects: an array of strings, helps: an array of strings } and will save it to user of token received.                    |
| DELETE | /api/saved/:id     | yes            | will delete a saved object by id if the user.id matches the user_id of the saved object.                                                                   |
