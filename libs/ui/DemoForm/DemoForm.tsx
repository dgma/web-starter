
import type { FC, Dispatch, SetStateAction } from 'react';
import { MouseEvent, useRef, useCallback, useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ethers } from 'ethers'

import Button from '@/libs/ui/Button';
import { useNetworkProvider } from '@/libs/network';
import { useWallet } from '@/libs/wallet';
import { toBigNumERC20, fromBigNumERC20 } from '@/libs/decimals';

import deploymentLock from '@dgma/protocol/deployment-lock.json'
import vaultFacetAbi from '@dgma/protocol/abi/contracts/app/facets/vaults.sol/VaultFacet.json';

import styles from './DemoForm.module.css';

const appDiamondAddress = deploymentLock.rabbit.AppDiamond.address;
const tokenAddress = deploymentLock.rabbit.USDgmTokenDiamond.address;

const wait = (ms: number) => new Promise((res) => {
  setTimeout(res, ms);
});

function useVault() {
  const { provider } = useNetworkProvider();
  return useMemo(() => {
    const signer = provider?.getSigner();
    return new ethers.Contract(appDiamondAddress, vaultFacetAbi, signer)
  }, [provider]);
}

async function safeContractCall<T = ethers.providers.TransactionResponse>(contractCall: Promise<T>) {
  try {
    const result = await contractCall;
    return result;
  } catch (error) {
    toast.error((error as any)?.reason || 'Something went wrong')
  }
}

interface DemoFormProps {
  setTransactionPending: Dispatch<SetStateAction<boolean>>
  isTransactionPending: boolean
  isConnectedToProperNetwork: boolean
}

const DemoForm: FC<DemoFormProps> = ({setTransactionPending, isTransactionPending, isConnectedToProperNetwork}) => {

  const { provider } = useNetworkProvider();
  const { currentAccount } = useWallet();

  const contract = useVault();

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
    const collateral = await safeContractCall<ethers.BigNumber>(contract.balanceOfDeposit());
    if (!!collateral) {
      setCollateral(fromBigNumERC20(collateral).toString());
    }
  }, [contract])

  const updateDebtInfo = useCallback(async () => {
    const debt = await safeContractCall<ethers.BigNumber>(contract.balanceOfDebt());
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
        const ts = await safeContractCall(contract.deposit({value: ethers.utils.parseEther(val)}));
        await ts?.wait(1);
        updateDepositInfo();
        (depositInput.current as HTMLInputElement).value = "";
      }
      handleLoading(promise())
    }
  }
  const withdraw = async (event: MouseEvent<HTMLButtonElement>) => {
    const promise = async () => {
      const ts = await safeContractCall(contract.withdraw());
      await ts?.wait(1);
      updateDepositInfo();
    }
    handleLoading(promise())
  }
  const mint = async (event: MouseEvent<HTMLButtonElement>) => {
    const val = mintInput?.current?.value;
    if (val) {
      const promise = async () => {
        const ts = await safeContractCall(contract.mint(toBigNumERC20(val), tokenAddress));
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
        const ts = await safeContractCall(contract.burn(toBigNumERC20(val), tokenAddress));
        await ts?.wait(1);
        updateDebtInfo();
        (burnInput.current as HTMLInputElement).value = "";
      }
      handleLoading(promise())
    }
  }

  const handleGetPigmy = useCallback(async () => {
    try {
      const promise = async () => {
        const addr = await provider?.getSigner().getAddress();
        const res  = await fetch(`${window.location.origin}/api/getTokens?addr=${addr}`);
        if (res.status === 200) {
          await wait(10000);
          toast.success('100 PIGMY sent to your wallet!')
        } else {
          toast.error('Not enough coins in faucet')
        }
      }
      handleLoading(promise())
    } catch (error) {
      toast.error('Something went wrong')
    }
  }, [provider, handleLoading]);

  const addUSDgmToken = async () => {
    try {
      await provider?.send(
        'wallet_watchAsset',
        [
          {
            type: 'ERC20',
            options: {
              address: tokenAddress,
              symbol: 'USDgm',
              decimals: 18,
            },
          }
        ]
      )
    } catch (error) {
      toast.error('Something went wrong')
    }
  };

  const isFormDisabled = isTransactionPending || !isConnectedToProperNetwork || !currentAccount

  return (
    <div className={styles.root}>
      <h3>PIGMY/USDgm Vault</h3>
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
      <div className={styles.utilsGroup}>
        <Button onClick={handleGetPigmy} disabled={isFormDisabled}> Get PIGMY </Button>
        <Button onClick={addUSDgmToken} disabled={isFormDisabled}>Add USDgm to metamask</Button>
      </div>
    </div>
  )
};

export default DemoForm;