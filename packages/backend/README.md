# Cromwell Application Backend

This backend is an API server for the mock "Profile Management" application and is intended to be run in conjunction with the associated frontend.

For further details, see the README in the project root.

## Scripts

```npm run start```

Starts the server, listening on `localhost:3002` by default

```npm run test```

Runs test suites, utilising the `local_test.db` database. The relevant test files can be found at: `./src/routes/`

```npm run db:reset```

Resets the database to its initial state, using the script located at: `./src/db/reset.ts` 

```npm run db:reset```

Resets the test database to its initial state, using the script located at: `./src/db/resetTest.ts` 

```npm run db:migrate```

Applies a migration to database, based on the schema located at: `./src/db/schema.ts` 

```npm run db:migrate```

Applies a migration to the database, based on the schema located at: `./src/db/schema.ts` 

```npm run db:studio```

Starts a local dev server for Drizzle Studio
