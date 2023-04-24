import type { FC } from "react";
import { useApp } from "@/libs/context/app";
import { DemoSetup } from "@/libs/ui/DemoSetup";
import { DemoVault } from "@/libs/ui/DemoVault";
import { Account } from "@/libs/ui/Account";
import SyncLoader from "react-spinners/SyncLoader";
import styles from "./Demo.module.css";

interface DemoProps {}

const Demo: FC<DemoProps> = () => {
  const { showLoader } = useApp();

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
      <DemoVault />
    </div>
  );
};

export default Demo;
