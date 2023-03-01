import type { FC } from 'react';
import ClockLoader from "react-spinners/ClockLoader";
import Button from '@/libs/ui/Button';
import { useWallet } from '@/libs/wallet';

import styles from './Account.module.css';


interface AccountProps {
  pending: boolean;
}

const Account: FC<AccountProps> = ({ pending }) => {
  const { connectToMetaMask, currentAccount } = useWallet();

  const accountClassName = pending ? `${styles.content} ${styles.spaceRight}` : styles.content;

  if (currentAccount) {
    return (
      <div className={styles.accountContainer}>
        <p className={accountClassName}>Address: {currentAccount}</p>
        <ClockLoader
          loading={pending}
          color={"gray"}
          size={20}
        />
      </div>
    );
  }

  return (
    <div className={styles.btnWrapper}>
      <Button onClick={connectToMetaMask} className={styles.walletBtn}>
        Connect to MetaMask
      </Button>
    </div>
  );
}

export default Account
