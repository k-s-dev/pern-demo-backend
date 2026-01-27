# Express Typescript Starter

## Setup from scratch

### Init from nodejs-typescript template

```bash
project_path=<...>
repo='git@github.com:k-s-dev/starter-templates.git'
git clone --branch=nodejs-ts ${repo} ${project_path}
cd "${project_path}"
git branch --unset-upstream
git branch --move main
npm install
```

### Installations

- `express`
  - middleware
    - `cors`
    - `helmet`: http headers settings
    - logger: `pino`
  - data
    - validation: `valibot`
    - orm: `prisma`

#### Express

```bash
npm install \
  express \
  cors \
  helmet

npm install --save-dev \
  @types/express \
  @types/cors \
  @types/helmet
```

Setup express app with minimal middleware, routes and error-handler.

#### Logger

```bash
npm install pino-http pino-pretty
```

Setup logger service ([pino](https://getpino.io/#/docs/web?id=pino-with-express)).

#### Data

- install `prisma` and `valibot`

```bash
npm install @prisma/client @prisma/adapter-pg pg valibot
npm install prisma @types/node @types/pg --save-dev
```

- initialize `prisma` configuration

```bash
npx prisma init --datasource-provider postgresql \
  --output ./src/prisma/generated
```

- adjust `src/common/config.ts` for db url
- adjust `prisma.config.ts`
  - e.g. adjust paths to keep all prisma related files in `/src/prisma`
- adjust `package.json` scripts for db/orm/prisma ops
