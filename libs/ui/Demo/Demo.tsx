import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import Link from 'next/link';
import { DemoForm } from '@/libs/ui/DemoForm';
import { Nav } from '@/libs/ui/Nav';
import { Account } from '@/feature/wallet';
import Button from '@/libs/ui/Button';
import { useNetworkProvider } from '@/libs/network';
import deploymentLock from '@dgma/protocol/deployment-lock.json';
import faucetAbi from '@dgma/protocol/abi/contracts/faucet.sol/Faucet.json';
import styles from './Demo.module.css'

const faucetAddress = deploymentLock.rabbit.Faucet.address;

export default function Demo() {

  const [isTransactionPending, setTransactionPending] = useState(false);

  const { getProvider } = useNetworkProvider();

  const handleGetPigmy = useCallback(
    async () => {
      const signer = (await getProvider()).getSigner();
      const contract = new ethers.Contract(faucetAddress, faucetAbi, signer);
      setTransactionPending(true);
      const ts = await contract.withdraw();
      await ts.wait(1);
      setTransactionPending(false);
    },
    [setTransactionPending, getProvider]
  );

  const handleDepositPigmy = useCallback(
    async () => {
      const signer = (await getProvider()).getSigner();
      const contract = new ethers.Contract(faucetAddress, faucetAbi, signer);
      setTransactionPending(true);
      const ts = await contract.deposit({value: ethers.utils.parseEther("100")});
      await ts.wait(1);
      setTransactionPending(false);
    },
    [setTransactionPending, getProvider]
  )
  
  return (
    <div className={styles.root}>
      <span className={styles.nav}>
        <Link href="/">Back to home</Link>
      </span>
      <div className={styles.setup}>
        <Account pending={isTransactionPending} />
        <div className={styles.network}>
          <p>
            Insure that you metamask wallet connected to the Rabbit network
          </p>
          <p>
            Use <a className={styles.guideLink} href="https://support.metamask.io/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC">this guide</a> to add test network manually
          </p>
          <div className={styles.networkParams}>
            <p>
              Network params:
            </p>
            <p>
              RPC: http://65.108.80.182:8080
            </p>
            <p>
              Chain Id: 189385242
            </p>
            <p>
              Token: PYGMY
            </p>
          </div>
        </div>
        <Button onClick={handleGetPigmy}> Get some PIGMY from the faucet </Button>
        <Button className={styles.depositBtn} onClick={handleDepositPigmy}> Deposit 100 PIGMY to the faucet </Button>
      </div>
      <DemoForm setTransactionPending={setTransactionPending} isTransactionPending={isTransactionPending} />
      <Nav isShowed/>
    </div>
  )
}
