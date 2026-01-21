# Nodejs Typescript Starter

# Setup from scratch

## Create project

- create the project root dir

```bash
mkdir <project-name>
cd <project-name>
```

- create a sample starter file

```bash
echo 'consol.log("Hello world.")' > src/main.ts
```

- initialize npm

```bash
npm init -y
```

- add readme

```bash
touch README.md
```

- initialize `.gitignore`

```bash
npx gitignore node
```

- initialize git

```bash
git init
```

## Lint: `eslint`

Required for linting and tools like editor, lsp to work.

```bash
npm install --save-dev eslint
npm init @eslint/config@latest
```

Setup scripts in `package.json`.

```json
# package.json

"scripts": {
  "lint": "npx eslint ./src/."
}
```

Lint project files from terminal.

```bash
npm run lint

# with fix written to files
npm run lint -- --fix
```

## Format: `prettier`

Required for formatting and tools like editor, lsp to work.

```bash
npm install --save-dev prettier eslint-config-prettier
touch .prettierrc
touch .prettierignore
```

Adjust `eslint` config file as mentioned in [documentation](https://github.com/prettier/eslint-config-prettier?tab=readme-ov-file#installation).

Setup scripts in `package.json`.

```json
# package.json

"scripts": {
  "format": "npx prettier ./src/."
}
```

Format project files from terminal.

```bash
npm run format -- --check

# with fix written to files
npm run format -- --write
```

## Typescript

```bash
npm install --save-dev typescript tsx tsc-alias
npm install --save-dev @types/node
```

- `typescript`: typescript compiler
- `tsx`: typescript runner for development environment
  - runs `.ts` without needing compilation to `.js`
- `tsc-alias`: needed for build if using path aliases in `tsconfig.json`
- `@types/node`: community built type definitions for node

Configure typescript compiler.

```bash
npx tsc --init
```

Adjust `tsconfig.json`.

```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    "rootDir": "./src",
    "outDir": "./dist",
    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "nodenext",
    "target": "esnext",
    // "types": [],
    // For nodejs:
    // "lib": [
    //   "esnext"
    // ],
    // "types": [
    //   "node"
    // ],
    // and npm install -D @types/node
    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    // Style Options
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,
    // Recommended Options
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
    // custom
    // path alias
    "moduleResolution": "nodenext",
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  },
  "include": [
    "src/**/*.ts"
  ]
}
```

## Environment

```bash
npm install @dotenvx/dotenvx cross-env
```

- `dotenvx`: loading environment files in required order
- `cross-env`: cli for passing variables for commands in npm scripts
  - sets `NODE_ENV` for `dotenvx`

There are many different strategies to load environment variables.

Example environment files:
  - `env`
  - `env.development`
  - `env.production`
  - `env.test`

Environment setter example (`package.json`):

```json
"scripts": {
  "env": "npx cross-env NODE_ENV=production",
  "build": "npm run env -- npx tsc && npx tsc-alias",
  "start": "npm run env -- node dist/app.js",
  "dev:env": "npx cross-env NODE_ENV=development",
  "dev": "npm run dev:env -- tsx --watch src/app.ts",
  "dev:db:migrate": "npm run dev:env -- npx prisma migrate dev",
  "dev:db:generate": "npm run dev:env -- npx prisma generate",
  "dev:db:reset": "npm run dev:env -- npx prisma migrate reset"
}
```

Loader example:

```ts
import dotenvx from "@dotenvx/dotenvx";
dotenvx.config({ convention: "nextjs", });
```
