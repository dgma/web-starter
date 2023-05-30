import { w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { configureChains, createConfig } from "wagmi";
import { sepolia, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

export const CHAINS = [sepolia, goerli];
export const WALLET_CONNECT_PROJECT_ID = process.env.web3ModalProjectId ?? "";

const { publicClient } = configureChains(CHAINS, [
  w3mProvider({ projectId: WALLET_CONNECT_PROJECT_ID }),
  publicProvider(),
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors: w3mConnectors({
    projectId: WALLET_CONNECT_PROJECT_ID,
    version: 1,
    chains: CHAINS,
  }),
});

export default wagmiConfig;
