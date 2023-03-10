import deploymentLock from '@dgma/protocol/deployment-lock.json'

export const synth = deploymentLock.rabbit.USDgmTokenDiamond.address;
export const collateralToken = deploymentLock.rabbit.WETH10.address;
export const appDiamond = deploymentLock.rabbit.AppDiamond.address;