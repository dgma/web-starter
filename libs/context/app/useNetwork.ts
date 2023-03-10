import { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider';

export const useNetwork = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | undefined>();
  const [isConnectedToProperNetwork, setIsConnectedToProperNetwork] = useState(true);

  useEffect(
    () => {
      detectEthereumProvider()
        .then(
          (metaMaskProvider) => {
            if (metaMaskProvider) {
              setProvider(new ethers.providers.Web3Provider(metaMaskProvider));
            }
          }
        )
    },
    []
  )

  return {
    provider, 
    isConnectedToProperNetwork, 
    setIsConnectedToProperNetwork 
  }
}
