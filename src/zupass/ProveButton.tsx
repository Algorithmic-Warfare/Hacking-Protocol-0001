import React from "react";
import { EveButton } from "@eveworld/ui-components";
import { useZupassContext } from "./ZupassContext";

interface ProveButtonProps {
  onClick?: () => void;
  className?: string;
}

const ProveButton: React.FC<ProveButtonProps> = ({ className }) => {
  const { podVault, proved } = useZupassContext();

  const handleClick = async () => {
    if (podVault.status === "offline") {
      await podVault.connect();
    }
  };

  if (proved) return null;

  return (
    <EveButton
      typeClass="secondary"
      onClick={handleClick}
      className={className}
    >
      Prove
    </EveButton>
  );
};

export default ProveButton;
