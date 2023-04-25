import type { FC } from "react";
import { toast } from "react-toastify";
import { useApp } from "@/libs/context/app";
import Button from "@/libs/ui/Button";
import { chainName, chainId, rpc, nativeCurrency } from "@/libs/constants";
import styles from "./DemoSetup.module.css";

interface DemoSetupProps {}

const DemoSetup: FC<DemoSetupProps> = () => {
  const { provider, isConnectedToProperNetwork } = useApp();

  const addNetwork = async () => {
    try {
      await provider?.send("wallet_addEthereumChain", [
        {
          chainId,
          chainName,
          nativeCurrency,
          rpcUrls: [rpc],
        },
      ]);
    } catch (error) {
      toast.error(
        "Adding network was unsuccessful, please refresh page and try again"
      );
    }
  };

  if (!isConnectedToProperNetwork) {
    return (
      <div className={styles.root}>
        <p>{`Insure that you metamask wallet connected to the ${chainName} network`}</p>
        <Button onClick={addNetwork} className={styles.addNetwork}>
          {`Switch to the ${chainName} network`}
        </Button>
      </div>
    );
  }

  return null;
};

export default DemoSetup;
