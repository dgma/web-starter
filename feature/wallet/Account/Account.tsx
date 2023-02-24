import type { FC } from 'react';
import Button from '@/libs/ui/Button';
import ClockLoader from "react-spinners/ClockLoader";
import styles from './Account.module.css';

import { useWallet } from '../useWallet';

interface AccountProps {
  pending: boolean
}

export const Account: FC<AccountProps> = ({ pending }) => {
  const { connectToMetaMask, currentAccount } = useWallet();

  const accountClassName = pending ? styles.spaceRight : '';

  if (currentAccount) {
    return (
      <div className={styles.accountContainer}>
        <p className={accountClassName}>Address: {currentAccount}</p>
        <ClockLoader
          loading={pending}
          color={"#037dd6"}
          size={20}
        />
      </div>
    );
  }

  return (
    <Button onClick={connectToMetaMask} className={styles.walletBtn}>
      Connect to MetaMask
    </Button>
  );
}
