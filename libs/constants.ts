import deploymentLock from "@dgma/protocol/deployment-lock.json";
import pkg from "package.json";

import fakeOracle from "@dgma/protocol/abi/contracts/emulation/fakeOracles/IFakeOracle.sol/IFakeOracle.json";
import vaultFacet from "@dgma/protocol/abi/contracts/app/facets/vault/vaults.sol/VaultFacet.json";

type deploymentNetwork = "sepolia.dev" | "goerli.stg";
export const deploymentNetwork = process.env
  .deploymentNetwork as deploymentNetwork;

export const chainId = process.env.chainId;

const chainConfigs = {
  sepolia: {
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "ETH",
      decimals: 18,
    },
    chainId,
    rpc: [`https://api.infura.io/v1/jsonrpc/sepolia`],
    blockExplorerUrls: ["https://sepolia.etherscan.io/"],
  },
  goerli: {
    nativeCurrency: {
      name: "GoerliETH",
      symbol: "ETH",
      decimals: 18,
    },
    chainId,
    rpc: [`https://api.infura.io/v1/jsonrpc/goerli`],
    blockExplorerUrls: ["https://goerli.etherscan.io/"],
  },
};
export const chainShortName = deploymentNetwork.split(".")[0] as
  | "sepolia"
  | "goerli";
export const metamaskChainConfig = chainConfigs[chainShortName];
export const alchemyPrivateRpc = process.env.rpc;

if (typeof window !== "undefined") {
  (window as any).__app_conf = {
    deploymentNetwork,
    chainId,
    alchemyPrivateRpc,
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
