
import type { FC } from 'react';
import { MouseEvent, useRef, useCallback, useState, useEffect } from 'react';
import { ethers } from 'ethers'

import Button from '@/libs/ui/Button';
import { useApp } from '@/libs/context/app';
import { toBigNumERC20, fromBigNumERC20 } from '@/libs/decimals';
import useVault from '@/libs/hooks/useVault';
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

  const depositInput = useRef<HTMLInputElement>(null);
  const mintInput = useRef<HTMLInputElement>(null);
  const burnInput = useRef<HTMLInputElement>(null);

  const [collateral, setCollateral] = useState("0");
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
    if (!!collateral) {
      setCollateral(fromBigNumERC20(collateral).toString());
    }
  }, [contract])

  const updateDebtInfo = useCallback(async () => {
    const debt = await safeContractCall<ethers.BigNumber>(contract.balanceOfDebt(synth, collateralToken));
    if (debt) {
      setDebt(fromBigNumERC20(debt).toString());
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
        const ts = await safeContractCall(contract.mint(synth, collateralToken, toBigNumERC20(val)));
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
        const ts = await safeContractCall(contract.burn(synth, collateralToken, toBigNumERC20(val)));
        await ts?.wait(1);
        updateDebtInfo();
        (burnInput.current as HTMLInputElement).value = "";
      }
      handleLoading(promise())
    }
  }

  const isFormDisabled = isTransactionPending || !isConnectedToProperNetwork || !currentAccount

  return (
    <div className={styles.root}>
      <p>You need to deposit PIGMY as collateral in order to mint USDgm</p>
      <p className={styles.padding}>Minting Ratio is 1:1</p>
      <div className={styles.row}>
        <div className={styles.group}>
          <p className={styles.vaultInfoTitle}>PIGMY locked in vault:</p>
          <p className={styles.vaultInfoValue}>{collateral}</p>
        </div>
        <div className={styles.group}>
          <p className={styles.vaultInfoTitle}>Issued USDgm debt:</p>
          <p className={styles.vaultInfoValue}>{debt}</p>
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