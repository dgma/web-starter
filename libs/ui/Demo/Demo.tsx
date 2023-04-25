import type { FC } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useApp } from "@/libs/context/app";
import { DemoSetup } from "@/libs/ui/DemoSetup";
import { DemoVault } from "@/libs/ui/DemoVault";
import { Account } from "@/libs/ui/Account";
import { useIsVaultOpened } from "@/app/feature/vault";
import SyncLoader from "react-spinners/SyncLoader";
import styles from "./Demo.module.css";

interface DemoProps {}

const Demo: FC<DemoProps> = () => {
  const { isNetworkVerificationInProgress } = useApp();

  const { isVaultOpened, isLoading } = useIsVaultOpened();

  const showLoader = isLoading || isNetworkVerificationInProgress;

  useEffect(() => {
    if (!showLoader) {
      toast.info(
        "This is a demo app, don't hesitate to refresh the page is something goes wrong"
      );
    }
  }, [showLoader]);

  if (showLoader) {
    return (
      <div className={styles.overlay}>
        <SyncLoader color={"gray"} />
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <Account />
      <DemoSetup />
      <DemoVault isVaultOpened={isVaultOpened} />
    </div>
  );
};

export default Demo;
