import { ethers } from 'ethers';

export const provider = new ethers.providers.JsonRpcProvider('https://dgma.dev:8443');
export const wallet = new ethers.Wallet(process.env.FACET_WALLET_PK as string, provider);