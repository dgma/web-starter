import Image from "next/image";

import LinkedIn from "./assets/linkedin.svg";
import Twitter from "./assets/twitter.svg";
import Telegram from "./assets/telegram.svg";

const SocialIcons = () => {
  return (
    <div className="flex flex-col items-center gap-y-6">
      <h4 className="font-extrabold text-primary-500">Follow Us</h4>
      <ul className="flex flex-row gap-4">
        <li>
          <a
            href="https://twitter.com/DogmaLabs"
            target="_blank"
            rel="noreferrer"
          >
            <Image alt="Twitter" height={40} src={Twitter} width={40} />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/company/dogma-labs/"
            target="_blank"
            rel="noreferrer"
          >
            <Image height={40} alt="LinkedIn" src={LinkedIn} width={40} />
          </a>
        </li>
        <li>
          <a href="https://t.me/dogmaprotocol" target="_blank" rel="noreferrer">
            <Image height={40} alt="LinkedIn" src={Telegram} width={40} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialIcons;
