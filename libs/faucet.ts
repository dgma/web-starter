import { ethers } from 'ethers';

export const provider = new ethers.providers.JsonRpcProvider('https://dgma.dev:8443');
export const wallet = ethers.Wallet.createRandom().connect(provider);