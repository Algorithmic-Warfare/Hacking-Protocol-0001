import React, { ReactNode } from "react";

interface EveTextFieldStyleWrapProps {
  children: ReactNode;
}

const EveTextFieldStyleWrap: React.FC<EveTextFieldStyleWrapProps> = React.memo(
  ({ children }) => {
    return <div className="TextField flex my-1 w-full gap-2">{children}</div>;
  }
);

export default EveTextFieldStyleWrap;
