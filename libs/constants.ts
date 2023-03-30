import deploymentLock from '@dgma/protocol/deployment-lock.json';

import fakeOracle from '@dgma/protocol/abi/contracts/emulation/fakeOracles/IFakeOracle.sol/IFakeOracle.json';
import vaultFacet from '@dgma/protocol/abi/contracts/app/facets/vault/vaults.sol/VaultFacet.json';

type NetworkName = 'rabbit.dev' | 'rabbit.stg'
export const networkName: NetworkName = process?.env?.NETWORK_NAME as NetworkName || 'rabbit.dev';
export const chainId = process?.env?.CHAIN_ID_HEX || '0x658d8';
export const rpc = process?.env?.RPC || 'https://dev.dgma.dev:8441';

console.log(`
  config:
  networkName: ${networkName}
  chainId: ${chainId}
  rpc: ${rpc}
`)

export const collateralOracle = deploymentLock[networkName]?.ETHFakeOracle?.address;
export const synth = deploymentLock[networkName]?.USDgmTokenDiamond?.address;
export const collateralToken = deploymentLock[networkName]?.WETH10?.address;
export const appDiamond = deploymentLock[networkName]?.AppDiamond?.address;

export const abis = {
  vaultFacet,
  fakeOracle,
}