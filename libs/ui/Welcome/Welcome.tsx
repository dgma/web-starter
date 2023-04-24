import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import dynamic from "next/dynamic";
import Typewriter from "typewriter-effect";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useApp } from "@/libs/context/app";

import styles from "./Welcome.module.css";

const WelcomeButton = dynamic(() => import("./WelcomeButton"), {
  ssr: false,
});

const suspend = process.env.suspend === "true";

const Welcome: FC = () => {
  const [isWelcomeButtonShowed, setIsWelcomeButtonShowed] = useState(false);
  const { currentAccount } = useApp();

  const onboarding = useRef<MetaMaskOnboarding>();

  const startOnboarding = () => {
    onboarding.current?.startOnboarding();
  };

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled() && currentAccount) {
      onboarding.current?.stopOnboarding();
    }
  }, [currentAccount]);

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("Welcome to Dogma")
              .callFunction(() => {
                setIsWelcomeButtonShowed(true);
              })
              .start();
          }}
          options={{
            delay: 85,
          }}
        />
      </h1>
      <WelcomeButton
        currentAccount={currentAccount}
        startOnboarding={startOnboarding}
        show={isWelcomeButtonShowed && !suspend}
      />
      {suspend && <div>We are migrating to the new network. ETA: 26.04 </div>}
    </div>
  );
};

export default Welcome;
