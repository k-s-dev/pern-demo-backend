# PERN demo

> **Postgresql** **Expressjs** **React** **Nodejs**
>
> A sample PERN stack project setup built with Nextjs app router and Typescript,
> deployed on Vercel
>
> This is an extension of [Nextjs demo monorepo](https://github.com/k-s-dev/nextjs-demo).

- _Frontend_: **Next**/**React**
  - [repo](https://github.com/k-s-dev/pern-demo-frontend)
  - deployment
    - [production](): main branch
    - [preview](): dev branch
- _Backend_: **Nodejs**/**Expressjs**
  - [repo](https://github.com/k-s-dev/pern-demo-backend)
  - deployment
    - [production](): main branch
    - [preview](): dev branch
  - _db_: `postgresql`
    - _production_: hosted on **Neon**
    - _development & test_: local
    - _orm_: **Prisma**

## Features

- Typescript and validation checks on backend and frontend
  - Frontend extends types and schemas from backend
- Auth: implemented using `better-auth`
  - sign in: email/password, OAuth
  - verification emails
  - sessions: token cookie based, verified on backend
  - authorization (permissions): custom role based checks
- Frontend
  - Forms: validation both on client and server

## Workflow

### Pre build check list

#### Backend

- check env variables
  - `env_samples/` folder is available in git repo
  - if needed, create env samples: `npm run env:create:samples`

- setup db
  - npm scripts for prisma cli commands are available

- `npm run check`
  - runs all checks sequentially and stops at first error
    - `npm run check:format && npm run check:lint && npm run check:types`
  - rerun after resolving until all checks pass
  - format errors can be fixed by **prettier**
    - `npm run fix:format`
  - lint and typescript errors are better fixed manually

- run tests: **vitest**
  - `npm run test`

#### Frontend

- backend dependencies
  - sync types and validation schemas with backend
    - `npm run update:definitions`
  - check backend server is running

- check env variables
  - `env_samples/` folder is available in git repo
  - if needed, create env samples: `npm run env:create:samples`

- `npm run check`
  - runs all checks sequentially and stops at first error
    - `npm run check:format && npm run check:lint && npm run check:types`
  - rerun after resolving until all checks pass
  - format errors can be fixed by **prettier**
    - `npm run fix:format`
  - lint and typescript errors are better fixed manually

- run tests
  - start backend server with configured environment for db
    - default: separate db for test environment
    - make sure `env.test` points to the right backend instance
  - component tests: **jest**
    - `npm run test:jest`
  - e2e tests: **cypress**
    - `npm run test`: build and start the server using test env
    - `npm run test:cypress:run` or `npm run test:cypress:open`
