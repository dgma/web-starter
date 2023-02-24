import { useCallback } from 'react';
import { ethers } from 'ethers';
import Head from 'next/head'
import Button from '@/libs/ui/Button';
import { useNetworkProvider } from '@/libs/network';
import deploymentLock from '@dgma/protocol/deployment-lock.json';
import faucetAbi from '@dgma/protocol/abi/contracts/faucet.sol/Faucet.json';
import styles from '@/styles/main.module.css'

const faucetAddress = deploymentLock.rabbit.Faucet.address;

const btnStyle = {
  'margin-top': '5rem'
}

export default function Demo() {

  const { getProvider } = useNetworkProvider();

  const handleDepositPigmy = async () => {
    const signer = (await getProvider()).getSigner();
    const contract = new ethers.Contract(faucetAddress, faucetAbi, signer);
    const ts = await contract.deposit({value: ethers.utils.parseEther("100")});
    await ts.wait(1);
  }
  
  return (
    <>
      <Head>
        <title>Dogma Protocol</title>
        <meta name="description" content="Home for synthetics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Button onClick={handleDepositPigmy}> Deposit 100 PIGMY to the faucet </Button>
      </main>
    </>    
  )
}
