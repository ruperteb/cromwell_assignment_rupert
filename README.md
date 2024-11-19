# Cromwell Application Assignment

This monorepo contains the frontend and backend projects required to complete the task assigned to me as part of my ongoing Cromwell application. The requirements of the test have been incorporated into a mock "Profile Management" application, allowing users to register and login to view, edit and delete their profiles (as well as some additional functionality for "admin" users).

**Features include:**

***Frontend***

- A [Next.js](https://nextjs.org/) (App Router + TypeScript) based application, incorporating client and server components, as well as custom middleware
- Usage of the [MUI](https://mui.com/material-ui/) library / system for components and styling
- [Redux](https://redux.js.org/) integration for managing application state, including the use of 'asyncThunks' and RTK Query
- Validation of 'form' inputs using [zod](https://zod.dev/)
- Responsive layout / design
- Up to 5 pages / routes (depending on whether a user is authenticated and what their 'role' is), along with functional navigation

***Backend***

- A simple Express server, based on a 'route' and 'controller' architecture
- Cookie / JWT based authentication / authorisation, utilising [Jose](https://www.npmjs.com/package/jose) and [Bcrypt](https://www.npmjs.com/package/bcrypt)
- API endpoints for registration, login and session validation, including authorisation middleware to protect routes based on 'role'
- A set of API endpoints allowing a standard user to retrieve, update and delete their own profile, as well as additonal endpoints for an 'admin' user to perform the same actions on any other user and retrieve all users at once
- The usage of [Drizzle ORM](https://orm.drizzle.team/) for interaction with a local SQLITE database (included in the repo)
- Testing of API endpoints with [Jest](https://jestjs.io/) and [Supertest](https://www.npmjs.com/package/supertest), using a seperate 'test' database

## Project Structure

The project is structured like a generic npm workspaces monorepo, with the individual workspaces found at the following locations: 

- Frontend: `./packages/frontend`
- Backend: `./packages/backend`

## Setup

The only prerequite required to run the combined application should be to install the project dependencies. However, as the frontend application makes use of the newest version of Next.js (which in turn uses the React 19 RC as a dependency), the `--legacy-peer-deps` flag should be included when installing these dependencies: 

*i.e. from the project root, run the following command:*

```npm i --legacy-peer-deps```

*Note: The project's .env files (and all relevant default variables) have been included in source control for the sake of convenience*

## Admin User

The login credentials for the "admin" user are as follows:

- email: `jdoe@cromwell.com`
- password: `admin@123`

Logging in as this user will provide access to additional functionality, allowing navigation to the "Users" page (showing a list of all profiles) and subsequently, to an individual user's profile page

## Scripts

```npm run start```

Runs the backend and frontend (dev server) applications concurrently. By default. the frontend will be available at `localhost:3000`

```npm run backend:start```

Runs the backend application

```npm run frontend:dev```

Runs the frontend dev server

__Additional scripts are available in each workspace project__