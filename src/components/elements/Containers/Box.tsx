import React, { ReactNode } from "react";

interface EveBoxProps {
  children: ReactNode;
}

const EveBox: React.FC<EveBoxProps> = ({ children }) => {
  return <div className="border border-brightquantum p-2">{children}</div>;
};

export default React.memo(EveBox);
