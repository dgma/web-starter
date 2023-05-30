import { SWRConfig } from "swr";
import type { AppProps } from "next/app";
import { EthereumClient } from "@web3modal/ethereum";
import { Web3Modal, Web3ModalProps } from "@web3modal/react";
import { WagmiConfig } from "wagmi";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { AppProvider } from "@/libs/context/app";

import { handleGlobalSWRError } from "@/app/error-handling";

import wagmiConfig, { CHAINS, WALLET_CONNECT_PROJECT_ID } from "@/wagmi.config";

import "@/styles/globals.css";

const web3ModalTheme: Web3ModalProps["themeVariables"] = {
  "--w3m-accent-color": "#22c55e",
  "--w3m-background-color": "#22c55e",
  "--w3m-button-border-radius": "0.25rem",
  "--w3m-text-medium-regular-weight": "700",
};

const ethereumClient = new EthereumClient(wagmiConfig, CHAINS);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        onError: handleGlobalSWRError,
      }}
    >
      <WagmiConfig config={wagmiConfig}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>

        <ToastContainer theme="colored" />
      </WagmiConfig>

      <Web3Modal
        projectId={WALLET_CONNECT_PROJECT_ID}
        ethereumClient={ethereumClient}
        themeVariables={web3ModalTheme}
      />
    </SWRConfig>
  );
}
