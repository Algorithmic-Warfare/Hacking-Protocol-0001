import React, { useEffect, useState } from "react";
import { useMUD } from "../MUDContext";
import { useMUDSync } from "../MUDSyncContext";
import PackageEntry from "./PackageEntry";
import { toHex } from "viem";
import MUDSyncStatus from "./MUDSyncStatus";
import { EveScrollBar } from "./elements";

const PackageList: React.FC = () => {
  const { systemCalls } = useMUD();
  const { syncedAtLeastOnce, live } = useMUDSync();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (syncedAtLeastOnce) {
      setIsLoading(false);
      console.log(systemCalls.getAllPackages());
    }
  }, [live]);

  return (
    <>
      <div className="Quantum-Container Title">Package List</div>
      {isLoading ? (
        <div className="Quantum-Container font-normal text-xs !py-4">
          <MUDSyncStatus />
        </div>
      ) : (
        <div className="Quantum-Container font-normal text-xs !py-4">
          <EveScrollBar maxHeight="260px" id="smartassembly-inventory">
            <div className="grid grid-cols-3 gap-4">
              {systemCalls.getAllPackages().map((pack) => {
                const { id } = pack.key;

                //@ts-ignore
                const { name, author, entries } = pack.value;
                return (
                  <PackageEntry
                    id={BigInt(id)}
                    name={String(name)}
                    author={toHex(author)}
                    entries={entries}
                    key={BigInt(id)}
                  />
                );
              })}
            </div>
          </EveScrollBar>
        </div>
      )}
    </>
  );
};

export default PackageList;
