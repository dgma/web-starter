const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  sentry: {
    hideSourceMaps: true,
    disableServerWebpackPlugin: !process.env.SENTRY_DSN,
    disableClientWebpackPlugin: !process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
  env: {
    deploymentNetwork: process.env.DEPLOYMENT_NETWORK_NAME,
    chainId: process.env.CHAIN_ID_HEX,
    rpc: process.env.RPC,
    suspendMsg: process.env.SUSPEND_WEBSITE_MSG,
  },
};

module.exports = withSentryConfig(nextConfig, { silent: true });
