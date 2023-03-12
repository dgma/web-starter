
import type { FC } from 'react';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import Typewriter from 'typewriter-effect';
import { ethers } from 'ethers'

import Button from '@/libs/ui/Button';
import VaultDesk from './components/VaultDesk';
import { useApp } from '@/libs/context/app';
import { wait, safeContractCall } from '@/libs/utils';
import useVault from '@/libs/hooks/useVault';
import { synth, collateralToken } from '@/libs/constants';

import styles from './DemoVault.module.css';

interface DemoVaultProps {}

const DemoVault: FC<DemoVaultProps> = () => {

  const { 
    provider, 
    isConnectedToProperNetwork,
    setTransactionPending, 
    isTransactionPending,
    currentAccount, 
    walletApp,
    vaultOpened, 
    setVaultOpened,
  } = useApp();

  const contract = useVault(provider);

  const handleOpenVault = useCallback(async () => {
      setTransactionPending(true);
      const ts = await safeContractCall(
        contract.open(
          synth,
          collateralToken,
          {value: ethers.utils.parseEther("0.1")}
        )
      );
      await ts?.wait(1);
      setTransactionPending(false);
      setVaultOpened(true)
    },
    [setTransactionPending, contract, setVaultOpened]
  )

  const handleGetPigmy = useCallback(async () => {
    try {
      setTransactionPending(true);
      const addr = await provider?.getSigner().getAddress();
      const res  = await fetch(`${window.location.origin}/api/getTokens?addr=${addr}`);
      if (res.status === 200) {
        await wait(10000);
        toast.success('100 PIGMY sent to your wallet!')
      } else {
        toast.error('Not enough coins in faucet')
      }
      setTransactionPending(false);
    } catch (error) {
      toast.error('Something went wrong')
    }
  }, [provider, setTransactionPending]);

  const addUSDgmToken = async () => {
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
      // provider api does not support sending non-array params yet
      // await provider?.send(
      //   'wallet_watchAsset',
      //   [
      //     {
      //       type: 'ERC20',
      //       options: {
      //         address: tokenAddress,
      //         symbol: 'USDgm',
      //         decimals: 18,
      //       },
      //     }
      //   ]
      // )
    } catch (error) {
      toast.error('Error when adding token')
    }
  };

  const isFormDisabled = isTransactionPending || !isConnectedToProperNetwork || !currentAccount;

  const renderVault = () => {
    return (
      vaultOpened
      ? <VaultDesk />
      : (
        <div className={styles.group}>
          <div className={styles.grow}>
            <Typewriter
              onInit={(typewriter) => {
                typewriter.typeString('In order to operate with Vault you need to open it')
                  .start();
              }}
              options={{
                delay: 85,
              }}
            />
          </div>
          <Button onClick={handleOpenVault} disabled={isFormDisabled}> Open Vault </Button>
        </div>
      )
    )
  }

  return (
    <div className={styles.root}>
      <h3>PIGMY/USDgm Market</h3>
      {renderVault()}
      <div className={styles.group}>
        <Button onClick={handleGetPigmy} disabled={isFormDisabled}> Get PIGMY </Button>
        <Button onClick={addUSDgmToken} disabled={isFormDisabled}>Add USDgm to metamask</Button>
      </div>
    </div>
  )
};

export default DemoVault;