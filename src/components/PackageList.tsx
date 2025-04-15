import React, { useEffect, useState } from "react";
import { useMUD } from "../MUDContext";
import { useMUDSync } from "../MUDSyncContext";
import PackageEntry from "./PackageEntry";
import { toHex } from "viem";
import MUDSyncStatus from "./MUDSyncStatus";
import { EveScrollBar } from "./elements";
import { EveInput, EveButton } from "@eveworld/ui-components";

const PackageList: React.FC = () => {
  const { systemCalls } = useMUD();
  const { syncedAtLeastOnce, live } = useMUDSync();

  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState<string>("");

  const handleSearch = (str: string) => {
    setSearchString(str);
  };

  useEffect(() => {
    if (syncedAtLeastOnce) {
      setIsLoading(false);
    }
  }, [live]);

  return (
    <>
      <div className="Quantum-Container flex flex-row items-center space-between gap-40">
        <span className="text-xl">Package List</span>
        <span className="flex-auto">
          <EveInput
            inputType="string"
            defaultValue={""}
            placeholder="search"
            onChange={(str) => handleSearch(String(str || ""))}
            fieldName="search"
          />
        </span>
      </div>
      {isLoading ? (
        <div className="Quantum-Container font-normal text-xs !py-4">
          <MUDSyncStatus />
        </div>
      ) : (
        <div className="Quantum-Container font-normal text-xs !py-4">
          <EveScrollBar maxHeight="260px" id="smartassembly-inventory">
            <div className="grid grid-cols-3 gap-4">
              {systemCalls
                .getAllPackages()
                .filter((pack) =>
                  //@ts-ignore
                  String(pack.value.name)
                    .toLowerCase()
                    .includes(searchString.toLowerCase())
                )
                .map((pack) => {
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
