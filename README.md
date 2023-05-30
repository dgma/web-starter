[![Dev ENV](https://github.com/dgma/web/actions/workflows/release.dev.yml/badge.svg)](https://github.com/dgma/web/actions/workflows/release.dev.yml)

[![Stage ENV](https://github.com/dgma/web/actions/workflows/release.stage.yml/badge.svg)](https://github.com/dgma/web/actions/workflows/release.stage.yml)

## Before you start

1. This project uses GitHub Packages as a private NPM registry. You need to authenticate to GitHub Packages before you can install dependencies. To do that you need to create `.npmrc` file in the root of the project and add the following line to it:

```bash
//npm.pkg.github.com/:_authToken=<your-token>
@dgma:registry=https://npm.pkg.github.com
```

Replace `<your-token>` with your personal access token. You can read about how to create this token [here](https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages#authenticating-to-github-packages).

2. Install the dependencies:

```bash
npm install
```

3. Create `.env` file in the root of the project and add the following variables to it:

```bash
DEPLOYMENT_NETWORK_NAME=sepolia.dev # or goerli.stage
CHAIN_ID_HEX='0xCHAIN_ID_HEX'
FAUCET_WALLET_PK='0xFAUCET_WALLET_PK' # private key of the faucet wallet
RPC=https://example.com # Blockchain network URL
SUSPEND_WEBSITE_MSG=false 
NEXT_PUBLIC_WEB3_MODAL_PROJECT_ID=0x000 # Wallet connect project ID
```

Ask the team for the values of these variables.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the running website.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
