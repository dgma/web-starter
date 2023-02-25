
import type { FC, Dispatch, SetStateAction } from 'react';
import { MouseEvent, useRef, useCallback } from 'react';
import { ethers } from 'ethers'

import Button from '@/libs/ui/Button';
import { useNetworkProvider } from '@/libs/network'
import { toBigNumERC20 } from '@/libs/decimals';

import deploymentLock from '@dgma/protocol/deployment-lock.json'
import vaultFacetAbi from '@dgma/protocol/abi/contracts/app/facets/vaults.sol/VaultFacet.json';
import styles from './DemoForm.module.css';

const appDiamondAddress = deploymentLock.rabbit.AppDiamond.address;
const tokenAddress = deploymentLock.rabbit.USDgmTokenDiamond.address;

const wait = (ms: number) => new Promise((res) => {
  setTimeout(res, ms);
})

interface DemoFormProps {
  setTransactionPending: Dispatch<SetStateAction<boolean>>
  isTransactionPending: boolean
}

const DemoForm: FC<DemoFormProps> = ({setTransactionPending, isTransactionPending}) => {

  const provider = useNetworkProvider().provider as ethers.providers.JsonRpcProvider;

  const depositInput = useRef<HTMLInputElement>(null);
  const mintInput = useRef<HTMLInputElement>(null);
  const burnInput = useRef<HTMLInputElement>(null);

  const handleLoading = useCallback(
    async (ts: any) => {
      setTransactionPending(true);
      await ts.wait(1);
      setTransactionPending(false);
    },
    [setTransactionPending]
  )

  const deposit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const val = depositInput?.current?.value;
    const signer = provider.getSigner();
    const contract = new ethers.Contract(appDiamondAddress, vaultFacetAbi, signer);
    if (val) {
      handleLoading(await contract.deposit({value: ethers.utils.parseEther(val)}))
    }
  }
  const withdraw = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const signer = provider.getSigner();
    const contract = new ethers.Contract(appDiamondAddress, vaultFacetAbi, signer);
    handleLoading(await contract.withdraw())
  }
  const mint = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const val = mintInput?.current?.value;
    const signer = provider.getSigner();
    const contract = new ethers.Contract(appDiamondAddress, vaultFacetAbi, signer)
    if (val) {
      handleLoading(await contract.mint(toBigNumERC20(val), tokenAddress))
    }
  }
  const burn = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const val = burnInput?.current?.value;
    const signer = provider.getSigner();
    const contract = new ethers.Contract(appDiamondAddress, vaultFacetAbi, signer);
    if (val) {
      handleLoading(await contract.burn(toBigNumERC20(val), tokenAddress))
    }
  }

  const handleGetPigmy = async () => {
    setTransactionPending(true);
    const addr = await provider.getSigner().getAddress();
    const result = await fetch(`${window.location.origin}/api/getTokens?addr=${addr}`);
    await wait(20000);
    setTransactionPending(false);
  };

  const addUSDgmToken = async () => {
    const { ethereum } = window as any
    await ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: 'USDgm',
          decimals: 18,
        },
      },
    })
  }

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>PIGMY/USDgm Vault</h3>
      <p>You need to deposit PIGMY as collateral in order to mint USDgm</p>
      <p>Minting Ratio is 1:1</p>
      <div className={styles.row}>
        <div className={styles.group}>
          <input 
            type="number" 
            placeholder="amount to deposit, PIGMY" 
            className={styles.input} 
            ref={depositInput}
            disabled={isTransactionPending}
          />
          <Button 
            className={styles.btn} 
            onClick={deposit}
            disabled={isTransactionPending}
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
            disabled={isTransactionPending}
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
            disabled={isTransactionPending}/>
          <Button 
            className={styles.btn} 
            onClick={mint}
            disabled={isTransactionPending}
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
            disabled={isTransactionPending}/>
          <Button 
            className={styles.btn} 
            onClick={burn}
            disabled={isTransactionPending}
          >
            Burn
          </Button>
        </div>
      </div>
      <div className={styles.utilsGroup}>
        <Button onClick={handleGetPigmy}> Get PIGMY </Button>
        <Button onClick={addUSDgmToken}>Add USDgm to metamask</Button>
      </div>
    </div>
  )
};

export default DemoForm;