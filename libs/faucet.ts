import { ethers } from "ethers";
import { alchemyPrivateRpc } from "@/libs/constants";

export const provider = new ethers.providers.JsonRpcProvider(alchemyPrivateRpc);
export const wallet = new ethers.Wallet(
  process.env.FAUCET_WALLET_PK as string,
  provider
);
