import { useWallet } from '../useWallet';

import styles from './ConnectToMetaMask.module.css';

export const ConnectToMetaMask = () => {
  const { connectToMetaMask, currentAccount } = useWallet();

  if (currentAccount) {
    return <p>Address: {currentAccount}</p>;
  }

  return (
    <button className={styles.main} onClick={connectToMetaMask}>
      Connect to MetaMask
    </button>
  );
}
