import deploymentLock from '@dgma/protocol/deployment-lock.json';
import pkg from 'package.json';

import fakeOracle from '@dgma/protocol/abi/contracts/emulation/fakeOracles/IFakeOracle.sol/IFakeOracle.json';
import vaultFacet from '@dgma/protocol/abi/contracts/app/facets/vault/vaults.sol/VaultFacet.json';

type NetworkName = 'rabbit.dev' | 'rabbit.stg'
export const networkName = process.env.networkName as NetworkName;
export const chainId = process.env.chainId;
export const rpc = process.env.rpc;

if (typeof window !== 'undefined') {
  (window as any).__app_conf = {
    networkName,
    chainId,
    rpc,
    version: pkg.version
  }
}

export const collateralOracle = deploymentLock[networkName].ETHFakeOracle.address;
export const synth = deploymentLock[networkName].USDgmTokenDiamond.address;
export const collateralToken = deploymentLock[networkName].WETH10.address;
export const appDiamond = deploymentLock[networkName].AppDiamond.address;

export const abis = {
  vaultFacet,
  fakeOracle,
}