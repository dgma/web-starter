import useSWR from 'swr'
import { ethers } from 'ethers'

import useOracle from '@/libs/hooks/useOracle';
import { useApp } from '@/libs/context/app';

const useGetLatestEthPrice = () => {
  const {
    provider,
  } = useApp()

  const oracle = useOracle(provider)

  const fetcher = async () => {
    const latestEthPrice = await oracle.latestRoundData()
    return ethers.utils.formatEther(latestEthPrice)
  }

  const { data } = useSWR('oracle.latestEthPrice', fetcher, { refreshInterval: 60000 })

  return { latestEthPrice: data }
}

export default useGetLatestEthPrice
