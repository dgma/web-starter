import type { FC } from "react";
import { useRef, useCallback } from "react";

import Button from "@/libs/ui/Button";
import { useApp } from "@/libs/context/app";

import {
  useBurn,
  useDeposit,
  useGetBalanceOfCollateral,
  useGetBalanceOfDebt,
  useGetMaxMint,
  useMint,
  useWithdraw,
} from "@/app/feature/vault";
import { useGetLatestEthPrice } from "@/app/feature/oracles";

import styles from "./VaultDesk.module.css";

const VaultDesk: FC = () => {
  const {
    currentAccount,
    setTransactionPending,
    isTransactionPending,
    isConnectedToProperNetwork,
  } = useApp();

  const depositInput = useRef<HTMLInputElement>(null);
  const withdrawInput = useRef<HTMLInputElement>(null);
  const mintInput = useRef<HTMLInputElement>(null);
  const burnInput = useRef<HTMLInputElement>(null);

  const handleLoading = useCallback(
    async (wait: Promise<any>) => {
      setTransactionPending(true);
      await wait;
      setTransactionPending(false);
    },
    [setTransactionPending]
  );

  const availableToMint = useGetMaxMint();
  const balanceOfCollateral = useGetBalanceOfCollateral();
  const balanceOfDebt = useGetBalanceOfDebt();
  const { latestEthPrice: collateralPrice } = useGetLatestEthPrice();
  const { deposit } = useDeposit();
  const { withdraw } = useWithdraw();
  const { burn } = useBurn();
  const { mint } = useMint();

  const onDepositClick = async () => {
    const val = depositInput?.current?.value;
    if (val) {
      const promise = async () => {
        await deposit(val);
        balanceOfCollateral.mutate();
        availableToMint.mutate();
        (depositInput.current as HTMLInputElement).value = "";
      };
      handleLoading(promise());
    }
  };
  const onWithdrawClick = async () => {
    const val = withdrawInput?.current?.value;
    if (val) {
      const promise = async () => {
        await withdraw(val);
        balanceOfCollateral.mutate();
        availableToMint.mutate();
        (withdrawInput.current as HTMLInputElement).value = "";
      };
      handleLoading(promise());
    }
  };
  const onMintClick = async () => {
    const val = mintInput?.current?.value;
    if (val) {
      const promise = async () => {
        await mint(val);
        balanceOfDebt.mutate();
        availableToMint.mutate();
        (mintInput.current as HTMLInputElement).value = "";
      };
      handleLoading(promise());
    }
  };
  const onBurnClick = async () => {
    const val = burnInput?.current?.value;
    if (val) {
      const promise = async () => {
        await burn(val);
        balanceOfDebt.mutate();
        availableToMint.mutate();
        (burnInput.current as HTMLInputElement).value = "";
      };
      handleLoading(promise());
    }
  };

  const isFormDisabled =
    isTransactionPending || !isConnectedToProperNetwork || !currentAccount;

  return (
    <div className={styles.root}>
      <p>You need to deposit PIGMY as collateral in order to mint USDgm</p>
      <p
        className={styles.padding}
      >{`PIGMY oracle price is ${collateralPrice} USD`}</p>
      <div className={styles.row}>
        <div className={styles.group}>
          <p className={styles.vaultInfoTitle}>PIGMY locked in vault:</p>
          <p className={styles.vaultInfoValue}>{balanceOfCollateral.data}</p>
        </div>
        <div className={styles.group}>
          <p className={styles.vaultInfoTitle}>Issued USDgm debt:</p>
          <p className={styles.vaultInfoValue}>{balanceOfDebt.data}</p>
        </div>
        <div className={styles.group}>
          <p className={styles.vaultInfoTitle}>Available to mint</p>
          <p className={styles.vaultInfoValue}>{availableToMint.data}</p>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.group}>
          <input
            type="number"
            placeholder="amount to deposit, PIGMY"
            className={styles.input}
            ref={depositInput}
            disabled={isFormDisabled}
          />
          <Button
            className={styles.btn}
            onClick={onDepositClick}
            disabled={isFormDisabled}
          >
            Deposit
          </Button>
        </div>
        <div className={styles.group}>
          <input
            type="number"
            placeholder="amount to withdraw, PIGMY"
            ref={withdrawInput}
            className={styles.input}
            disabled={isFormDisabled}
          />
          <Button
            className={styles.btn}
            onClick={onWithdrawClick}
            disabled={isFormDisabled}
          >
            Withdraw
          </Button>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.group}>
          <input
            type="number"
            placeholder="amount to mint, USDgm"
            className={styles.input}
            ref={mintInput}
            disabled={isFormDisabled}
          />
          <Button
            className={styles.btn}
            onClick={onMintClick}
            disabled={isFormDisabled}
          >
            Mint
          </Button>
        </div>
        <div className={styles.group}>
          <input
            type="number"
            placeholder="amount to burn, USDgm"
            className={styles.input}
            ref={burnInput}
            disabled={isFormDisabled}
          />
          <Button
            className={styles.btn}
            onClick={onBurnClick}
            disabled={isFormDisabled}
          >
            Burn
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VaultDesk;
