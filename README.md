# back-end

## Endpoints

| Type | Endpoint           | Token Required | Description                                                                                                                                                |
|------|--------------------|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET  | /                  | no             | Root Route                                                                                                                                                 |
| POST | /api/auth/register | no             | accepts an object { username: string, password: string } and returns a new user plus a token                                                               |
| POST | /api/auth/login    | no             | accepts an object { username: string, password: string } and returns a token if user exists in database and password matches what is found in the database |
