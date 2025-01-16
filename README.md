
# Doh Eain REST API Task

- CRUD endpoints for events (create, read, update, delete)
- Authentication middleware
- Input validation and proper error handling
- Event filtering by date range and category
- Basic rate limiting
- Database migrations and seeders
- Unit tests for the API endpoints



## Run Locally

Clone the project

```bash
  git clone https://github.com/khaing17/doh_eain_api_test.git
```

Go to the project directory

```bash
  cd doh_eain_api_test
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Migration

```bash
  npx prisma migrate dev
```

Seeding database

```bash
  npx prisma db seed
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

I use postgresql for database

`DATABASE_URL="postgresql://dbusername:dbpassword@localhost:5432/yourdb"`


## Running Tests

To run tests, run the following command

```bash
  npm run test
```

