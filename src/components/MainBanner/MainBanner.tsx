import type { FC } from "react";
import Typewriter from "typewriter-effect";

const MainBanner: FC = () => {
  return (
    <h1 className="text-center text-3xl font-bold dark:text-white text-black">
      <Typewriter
        onInit={(typewriter) => {
          typewriter.typeString("Welcome to Dogma Labs").start();
        }}
        options={{
          delay: 85,
        }}
      />
    </h1>
  );
};

export default MainBanner;
