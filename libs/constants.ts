import deploymentLock from "@dgma/protocol/deployment-lock.json";
import pkg from "package.json";

import fakeOracle from "@dgma/protocol/abi/contracts/emulation/fakeOracles/IFakeOracle.sol/IFakeOracle.json";
import vaultFacet from "@dgma/protocol/abi/contracts/app/facets/vault/vaults.sol/VaultFacet.json";

type deploymentNetwork = "sepolia.dev" | "goerli.stg";
export const deploymentNetwork = process.env
  .deploymentNetwork as deploymentNetwork;

const currenciesForChain = {
  sepolia: {
    name: "SepoliaETH",
    symbol: "ETH",
    decimals: 18,
  },
  goerli: {
    name: "GoerliETH",
    symbol: "GETH",
    decimals: 18,
  },
};
export const chainId = process.env.chainId;
export const chainName = deploymentNetwork.split(".")[0] as
  | "sepolia"
  | "goerli";
export const nativeCurrency = currenciesForChain[chainName];
export const rpc = process.env.rpc;

if (typeof window !== "undefined") {
  (window as any).__app_conf = {
    deploymentNetwork,
    chainId,
    rpc,
    version: pkg.version,
  };
}

export const collateralOracle =
  deploymentLock[deploymentNetwork].ETHFakeOracle.address;
export const synth =
  deploymentLock[deploymentNetwork].USDgmTokenDiamond.address;
export const collateralToken = deploymentLock[deploymentNetwork].WETH10.address;
export const appDiamond = deploymentLock[deploymentNetwork].AppDiamond.address;

export const abis = {
  vaultFacet,
  fakeOracle,
};
