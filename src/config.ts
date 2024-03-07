import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { http } from "wagmi";
import { hardhat } from "wagmi/chains";

// 1. Get projectId at https://cloud.walletconnect.com
export const projectId = "YOUR_PROJECT_ID";

// 2. Create wagmiConfig
const metadata = {
  name: "App Name",
  description: "App description",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const config = defaultWagmiConfig({
  chains: [hardhat], // required
  projectId, // required
  metadata, // required
  transports: {
    [hardhat.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
