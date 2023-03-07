import { createContext, useEffect, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider';

export type Provider = ethers.providers.Web3Provider | undefined;

export interface NetworkProviderContext {
  provider: Provider;
  isConnectionInProcess: boolean;
}

export const NetworkContext = createContext<NetworkProviderContext>({
  provider: undefined,
  isConnectionInProcess: false,
})

const NetworkProvider: FC<PropsWithChildren> = ({ children }) => {
  const [provider, setProvider] = useState<Provider>();
  const [isConnectionInProcess, setIsConnectionInProcess] = useState(true);

  useEffect(
    () => {
      detectEthereumProvider()
        .then(
          (metaMaskProvider) => {
            if (metaMaskProvider) {
              setProvider(new ethers.providers.Web3Provider(metaMaskProvider));
            }
            setIsConnectionInProcess(false); 
          }
        )
    },
    []
  )

  return (
    <NetworkContext.Provider value={{ provider, isConnectionInProcess }}>
      {children}
    </NetworkContext.Provider>
  )
}

export default NetworkProvider
