import { useEffect, useId, useRef, useState } from "react";
import type { FC } from "react";
import dynamic from "next/dynamic";
import Typewriter from "typewriter-effect";
import { isMobile } from "react-device-detect";
import MetaMaskOnboarding from "@metamask/onboarding";
import { toast } from "react-toastify";

import { useApp } from "@/libs/context/app";

const WelcomeButton = dynamic(() => import("./WelcomeButton"), {
  ssr: false,
});

const suspendMsg = process.env.suspendMsg;
const suspendMode = !!suspendMsg?.length;

const MainBanner: FC = () => {
  const [isWelcomeButtonShowed, setIsWelcomeButtonShowed] = useState(false);
  const { currentAccount } = useApp();
  const toastId = useId();

  const onboarding = useRef<MetaMaskOnboarding>();

  const startOnboarding = () => {
    onboarding.current?.startOnboarding();
  };

  useEffect(() => {
    if (isMobile) {
      toast.warn(
        "Mobile version is available only within Metamask App Browser",
        { toastId, autoClose: false }
      );
    }
  }, [toastId]);

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
    <div className="container flex h-full flex-col items-center justify-center">
      <div className="flex flex-col gap-y-6">
        <h1 className="text-center text-3xl font-bold text-primary-500">
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

        <p className="max-w-2xl text-center">
          <b>Dogma</b> is a trustless, permissionless, fully decentralized, and
          governance-minimized financial protocol for stablecoins and synthetic
          asset issuance.
        </p>
      </div>

      <WelcomeButton
        className="mt-8"
        currentAccount={currentAccount}
        startOnboarding={startOnboarding}
        show={isWelcomeButtonShowed && !suspendMode}
      />
      {suspendMode && <div>{suspendMsg}</div>}
    </div>
  );
};

export default MainBanner;
