import type { FC } from "react";
import Typewriter from "typewriter-effect";
import { Web3Button } from "@web3modal/react";

const suspendMsg = process.env.suspendMsg;
const suspendMode = !!suspendMsg?.length;

const MainBanner: FC = () => {
  return (
    <div className="container flex h-full flex-col items-center justify-center">
      <div className="flex flex-col gap-y-6">
        <h1 className="text-center text-3xl font-bold text-primary-500">
          <Typewriter
            onInit={(typewriter) => {
              typewriter.typeString("Welcome to Dogma").start();
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

      <div className="mt-8">
        <Web3Button />
      </div>

      {suspendMode && <div>{suspendMsg}</div>}
    </div>
  );
};

export default MainBanner;
