import React, { useState } from "react";
import { EveButton } from "@eveworld/ui-components";
import { useZupassContext } from "./ZupassContext";

interface ProveButtonProps {
  onClick?: () => void;
  className?: string;
}

const ProveButton: React.FC<ProveButtonProps> = ({ className }) => {
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const { proved, prove } = useZupassContext();

  const handleClick = async () => {
    setLoading(true);
    const r = await prove();
    setLoading(false);
    setFailed(!r);
  };

  if (proved) return null;

  return (
    <EveButton
      typeClass="secondary"
      onClick={handleClick}
      className={className}
      disabled={loading}
    >
      {loading ? "Wait..." : failed ? "Failed" : "Prove"}
    </EveButton>
  );
};

export default ProveButton;
