import { ethers } from 'ethers';

export const provider = new ethers.providers.JsonRpcProvider('http://65.108.80.182:8080');
export const wallet = ethers.Wallet.createRandom().connect(provider);