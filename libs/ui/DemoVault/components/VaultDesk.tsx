
import type { FC } from 'react';
import { MouseEvent, useRef, useCallback, useState, useEffect } from 'react';
import { ethers } from 'ethers'

import Button from '@/libs/ui/Button';
import { useApp } from '@/libs/context/app';
import useVault from '@/libs/hooks/useVault';
import useOracle from '@/libs/hooks/useOracle';
import { synth, collateralToken } from '@/libs/constants';
import { safeContractCall } from '@/libs/utils';

import styles from './VaultDesk.module.css';

interface VaultDeskProps {}

const VaultDesk: FC<VaultDeskProps> = () => {

  const { 
    currentAccount, 
    provider, 
    setTransactionPending, 
    isTransactionPending, 
    isConnectedToProperNetwork 
  } = useApp();

  const contract = useVault(provider);
  const oracle = useOracle(provider);

  const depositInput = useRef<HTMLInputElement>(null);
  const mintInput = useRef<HTMLInputElement>(null);
  const burnInput = useRef<HTMLInputElement>(null);

  const [collateral, setCollateral] = useState("0");
  const [collateralPrice, setCollateralPrice] = useState("0");
  const [debt, setDebt] = useState("0");

  const handleLoading = useCallback(
    async (wait: Promise<any>) => {
      setTransactionPending(true);
      await wait;
      setTransactionPending(false);
    },
    [setTransactionPending]
  );

  const updateDepositInfo = useCallback(async () => {
    const collateral = await safeContractCall<ethers.BigNumber>(contract.balanceOfDeposit(synth, collateralToken));
    const price = await safeContractCall<ethers.BigNumber>(oracle.latestRoundData());
    if (price) {
      setCollateralPrice(ethers.utils.formatEther(price));
    }
    if (!!collateral) {
      setCollateral(ethers.utils.formatEther(collateral));
    }
  }, [contract, oracle])

  const updateDebtInfo = useCallback(async () => {
    const debt = await safeContractCall<ethers.BigNumber>(contract.balanceOfDebt(synth, collateralToken));
    if (debt) {
      setDebt(ethers.utils.formatEther(debt));
    }
  }, [contract])

  useEffect(
    () => {
      if (isConnectedToProperNetwork && currentAccount) {
        updateDepositInfo();
        updateDebtInfo();
      }
    },
    [updateDepositInfo, updateDebtInfo, isConnectedToProperNetwork, currentAccount]
  )

  const deposit = async (event: MouseEvent<HTMLButtonElement>) => {
    const val = depositInput?.current?.value;
    if (val) {
      const promise = async () => {
        const ts = await safeContractCall(
          contract.depositNative(synth, collateralToken, {value: ethers.utils.parseEther(val)})
        );
        await ts?.wait(1);
        updateDepositInfo();
        (depositInput.current as HTMLInputElement).value = "";
      }
      handleLoading(promise())
    }
  }
  const withdraw = async (event: MouseEvent<HTMLButtonElement>) => {
    const promise = async () => {
      const ts = await safeContractCall(contract.withdrawNative(synth, collateralToken));
      await ts?.wait(1);
      updateDepositInfo();
    }
    handleLoading(promise())
  }
  const mint = async (event: MouseEvent<HTMLButtonElement>) => {
    const val = mintInput?.current?.value;
    if (val) {
      const promise = async () => {
        const ts = await safeContractCall(contract.mint(synth, collateralToken, ethers.utils.parseUnits(val)));
        await ts?.wait(1);
        updateDebtInfo();
        (mintInput.current as HTMLInputElement).value = "";
      }
      handleLoading(promise())
    }
  }
  const burn = async (event: MouseEvent<HTMLButtonElement>) => {
    const val = burnInput?.current?.value;
    if (val) {
      const promise = async () => {
        const ts = await safeContractCall(contract.burn(synth, collateralToken, ethers.utils.parseUnits(val)));
        await ts?.wait(1);
        updateDebtInfo();
        (burnInput.current as HTMLInputElement).value = "";
      }
      handleLoading(promise())
    }
  }

  const isFormDisabled = isTransactionPending || !isConnectedToProperNetwork || !currentAccount;
  const availableToMint = Number(collateral) * Number(collateralPrice) - Number(debt);

  return (
    <div className={styles.root}>
      <p>You need to deposit PIGMY as collateral in order to mint USDgm</p>
      <p className={styles.padding}>{`PIGMY oracle price is ${collateralPrice} USD`}</p>
      <div className={styles.row}>
        <div className={styles.group}>
          <p className={styles.vaultInfoTitle}>PIGMY locked in vault:</p>
          <p className={styles.vaultInfoValue}>{collateral}</p>
        </div>
        <div className={styles.group}>
          <p className={styles.vaultInfoTitle}>Issued USDgm debt:</p>
          <p className={styles.vaultInfoValue}>{debt}</p>
        </div>
        <div className={styles.group}>
          <p className={styles.vaultInfoTitle}>Available to mint</p>
          <p className={styles.vaultInfoValue}>{availableToMint}</p>
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
            onClick={deposit}
            disabled={isFormDisabled}
          >
              Deposit
          </Button>
        </div>
        <div className={styles.group}>
          <input 
            type="string" 
            value={"max available amount"}
            className={styles.input} 
            disabled={true}/>
          <Button 
            className={styles.btn} 
            onClick={withdraw}
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
            disabled={isFormDisabled}/>
          <Button 
            className={styles.btn} 
            onClick={mint}
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
            disabled={isFormDisabled}/>
          <Button 
            className={styles.btn} 
            onClick={burn}
            disabled={isFormDisabled}
          >
            Burn
          </Button>
        </div>
      </div>
    </div>
  )
};

export default VaultDesk;