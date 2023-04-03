import useSWRMutation from 'swr/mutation'

import { UIError } from "@/app/error-handling";

import { useApp } from "@/libs/context/app";
import { synth } from '@/libs/constants';

const useAddUSDgmToWallet = () => {
  const { walletApp } = useApp();

  const fetcher = async () => {
    try {
      await (walletApp() as any)?.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: synth,
            symbol: 'USDgm',
            decimals: 18,
          },
        }
      })
    } catch (error) {
      throw new UIError('Error when adding token', error)
    }
  }

  const { trigger } = useSWRMutation<void, UIError | string>(
    'wallet.addUSDgmToWallet',
    fetcher,
    {
      throwOnError: false,
    }
  )

  return { addUSDgmToWallet: trigger }
}

export default useAddUSDgmToWallet
