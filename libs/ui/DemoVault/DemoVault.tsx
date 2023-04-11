import type { FC } from 'react';
import { useCallback } from 'react';
import Typewriter from 'typewriter-effect';

import { useIsVaultOpened, useOpenVault } from '@/app/feature/vault';
import { useGetPigmy } from '@/app/feature/demo';
import { useAddUSDgmToWallet } from '@/app/feature/wallet';

import Button from '@/libs/ui/Button';
import { useApp } from '@/libs/context/app';

import VaultDesk from './components/VaultDesk';

import styles from './DemoVault.module.css';

const DemoVault: FC = () => {

  const {
    isConnectedToProperNetwork,
    isTransactionPending,
    currentAccount,
  } = useApp();

  const { isVaultOpened } = useIsVaultOpened();
  const { openVault } = useOpenVault()
  const { getPigmy } = useGetPigmy()
  const { addUSDgmToWallet } = useAddUSDgmToWallet()

  const handleOpenVault = useCallback(() => {
    openVault()
  }, [openVault])

  const handleGetPigmy = useCallback(() => {
    getPigmy()
  }, [getPigmy]);

  const addUSDgmToken = useCallback(() => {
    addUSDgmToWallet()
  }, [addUSDgmToWallet]);

  const isFormDisabled = isTransactionPending || !isConnectedToProperNetwork || !currentAccount;

  const renderVault = () => {
    return (
      isVaultOpened
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
