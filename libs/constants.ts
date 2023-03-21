import deploymentLock from '@dgma/protocol/deployment-lock.json';

import fakeOracle from '@dgma/protocol/abi/contracts/emulation/fakeOracles/IFakeOracle.sol/IFakeOracle.json';
import vaultFacet from '@dgma/protocol/abi/contracts/app/facets/vault/vaults.sol/VaultFacet.json';

export const collateralOracle = deploymentLock.rabbit.ETHFakeOracle.address;
export const synth = deploymentLock.rabbit.USDgmTokenDiamond.address;
export const collateralToken = deploymentLock.rabbit.WETH10.address;
export const appDiamond = deploymentLock.rabbit.AppDiamond.address;

export const abis = {
  vaultFacet,
  fakeOracle,
}