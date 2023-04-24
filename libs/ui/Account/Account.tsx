import type { FC } from "react";
import ClockLoader from "react-spinners/ClockLoader";
import Button from "@/libs/ui/Button";
import { useApp } from "@/libs/context/app";

import styles from "./Account.module.css";

const Account: FC<{}> = () => {
  const { connectToMetaMask, currentAccount, isTransactionPending } = useApp();

  const accountClassName = isTransactionPending
    ? `${styles.content} ${styles.spaceRight}`
    : styles.content;

  if (currentAccount) {
    return (
      <div className={styles.accountContainer}>
        <p className={accountClassName}>Address: {currentAccount}</p>
        <ClockLoader loading={isTransactionPending} color={"gray"} size={20} />
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
};

export default Account;
