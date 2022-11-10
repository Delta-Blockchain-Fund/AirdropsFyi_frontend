# Delta Fund Frontend

This is the frontend for the Airdrop application. It is a Next.js TypeScript application.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can edit any file in the components/pages/styles folder and the page will automatically update.

## How to build

```bash
npm run build
# or
yarn build
```

And then run the production server:

```bash
npm run start
# or
yarn start
```

And now a production build is running on [http://localhost:3000](http://localhost:3000)

## Project structure

- **.next** - Next.js build output
- **components** - React components
- **node_modules** - Node.js dependencies
- **pages** - Next.js pages and subpages
- **public** - Static files
- **styles** - Global/component/page styles
- **.env.local** - Environment variables
- **.env.local.example** - Environment variables example
- **.eslintrc.js** - ESLint configuration, ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code
- **.gitignore** - Files and folders to ignore in Git
- **next-env.d.ts** - Next.js types
- **next.config.js** - Next.js configuration
- **package.json** - This project's dependencies and scripts
- **README.md** - This file
- **tsconfig.json** - TypeScript configuration
- **yarn.lock** - Yarn lockfile, contains exact versions of all dependencies

## Environment variables

The `.env.local.example` file contains all the environment variables that are required to run the application. You can copy the file and rename it to `.env.local`, then fill in the values.

- **NEXT_PUBLIC_BACKEND_URL** - The URL of the backend API
- **NEXT_PUBLIC_RECAPTCHA_SITE_KEY** - The reCAPTCHA site key, this is used together with the reCAPTCHA secret key in the backend to verify if a user is a bot or not. You can get a reCAPTCHA site key [here](https://www.google.com/recaptcha/admin/create)
