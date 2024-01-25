import { type FC } from "react";
import LinkedIn from "/linkedin.svg";
import Twitter from "/twitter.svg";
import Telegram from "/telegram.svg";

type SocImgProps = {
  src: string;
  alt: string;
  href?: string;
};

const SocialImg: FC<SocImgProps> = ({ src, alt, href = "#" }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <img
        alt={alt}
        height={40}
        src={src}
        width={40}
        className="dark:fill-white fill-black"
      />
    </a>
  );
};

const SocialIcons = () => {
  return (
    <div className="flex flex-col items-center gap-y-6">
      <h4 className="font-extrabold text-primary-500">Follow Us</h4>
      <ul className="flex flex-row gap-4">
        <li>
          <SocialImg
            src={Twitter}
            href="https://twitter.com/DogmaLabs"
            alt="Twitter"
          />
        </li>
        <li>
          <SocialImg
            src={LinkedIn}
            href="https://www.linkedin.com/company/dogma-labs/"
            alt="LinkedIn"
          />
        </li>
        <li>
          <SocialImg
            src={Telegram}
            href="https://t.me/dogmaprotocol"
            alt="Telegram"
          />
        </li>
      </ul>
    </div>
  );
};

export default SocialIcons;
