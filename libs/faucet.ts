import { ethers } from "ethers";
import { rpc } from "@/libs/constants";

export const provider = new ethers.providers.JsonRpcProvider(rpc);
export const wallet = new ethers.Wallet(
  process.env.FAUCET_WALLET_PK as string,
  provider
);
