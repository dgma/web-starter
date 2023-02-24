import { createContext, useCallback, useRef } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider';

export type GetProvider = () => Promise<ethers.providers.JsonRpcProvider>;

export interface NetworkProviderContext {
  getProvider: GetProvider;
}

export const NetworkContext = createContext<NetworkProviderContext>({
  getProvider: () => Promise.resolve(new ethers.providers.JsonRpcProvider()),
})

const NetworkProvider: FC<PropsWithChildren> = ({ children }) => {
  const providerRef = useRef<ethers.providers.JsonRpcProvider>()

  const getProvider = useCallback(async () => {
    if (!providerRef.current) {
      const metaMaskProvider = await detectEthereumProvider()

      if (!metaMaskProvider) {
        throw new Error('Please, install MetaMask')
      }

      providerRef.current = new ethers.providers.Web3Provider(metaMaskProvider)
    }

    return providerRef.current
  }, [])

  return (
    <NetworkContext.Provider value={{ getProvider }}>
      {children}
    </NetworkContext.Provider>
  )
}

export default NetworkProvider
