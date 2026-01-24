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
