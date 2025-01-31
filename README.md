# Instructions

This folder contains a complete and working copy of the app from the **Security** workshop.

In order for the app to function, it requires a `.env` file in the `api/` folder, containing four variables:

```bash
PORT=3000
DB_URL=[valid PostgreSQL connection string]
BCRYPT_SALT_ROUNDS=10
SECRET_TOKEN=<secret token>
```
