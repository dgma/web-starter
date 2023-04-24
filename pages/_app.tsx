import { SWRConfig } from "swr";
import type { AppProps } from "next/app";

import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

import { AppProvider } from "@/libs/context/app";

import { handleGlobalSWRError } from "@/app/error-handling";

import pkg from "package.json";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        onError: handleGlobalSWRError,
      }}
    >
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </SWRConfig>
  );
}
