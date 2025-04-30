import React from "react";
import { usePodVault } from "./usePodVault";
import { ZupassContext } from "./ZupassContext";

interface ZupassContextProvider {
  children: React.ReactNode;
}

export const ZupassContextProvider: React.FC<ZupassContextProvider> = ({
  children,
}) => {
  const podVault = usePodVault();

  React.useEffect(() => {
    console.log("pods", podVault.pods);
  }, [podVault]);

  return (
    <>
      <ZupassContext.Provider
        value={{
          podVault,
          proved: false,
        }}
      >
        {children}
      </ZupassContext.Provider>
    </>
  );
};
