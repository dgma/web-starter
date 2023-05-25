import type { FC } from "react";
import Button from "@/libs/ui/Button";

interface OpenAppButtonProps {
  className?: string;
  openApp: () => void;
}

const OpenAppButton: FC<OpenAppButtonProps> = ({ className, openApp }) => {
  const onClick = () => {
    openApp();
  };

  return (
    <Button onClick={onClick} className={className}>
      Open Demo App
    </Button>
  );
};

export default OpenAppButton;
