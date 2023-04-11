import useSWR from 'swr'

import { synth, collateralToken } from '@/libs/constants'
import { useApp } from '@/libs/context/app'
import useVault from '@/libs/hooks/useVault'

const useIsVaultOpened = () => {
  const { currentAccount, provider, isConnectedToProperNetwork } = useApp()
  const contract = useVault(provider);

  const fetcher = () => {
    if (isConnectedToProperNetwork) {
      console.log('check', isConnectedToProperNetwork)
      return contract.isAccountOpened(synth, collateralToken, currentAccount)
    }
    return false;
  }

  const { data: isVaultOpened, mutate } = useSWR(() => currentAccount ? 'vault.isOpened' : null, fetcher)

  return { isVaultOpened, mutate }
}

export default useIsVaultOpened
