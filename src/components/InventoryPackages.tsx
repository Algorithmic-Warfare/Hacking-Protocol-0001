import { useMUD } from "../MUDContext";
import { useSmartObject, useNotification } from "@eveworld/contexts";
import { Severity } from "@eveworld/types";
import { useMUDSync } from "../MUDSyncContext";
import { useEffect, useState } from "react";
import {
  ClickToCopy,
  EveButton,
  EveInput,
  EveLoadingAnimation,
} from "@eveworld/ui-components";
import { toHex } from "viem";
import React from "react";
import { EveScrollBar } from "./elements";
import { abbreviateAddress } from "@eveworld/utils";
import PackageEntry from "./PackageEntry";

const InventoryLogs = () => {
  const { systemCalls } = useMUD();
  const { syncedAtLeastOnce, live } = useMUDSync();

  const { smartAssembly, smartCharacter, loading } = useSmartObject();
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState<string>("");
  const { notify, handleClose } = useNotification();

  const handleSearch = (str: string) => {
    setSearchString(str);
  };

  useEffect(() => {
    if (loading) {
      notify({ type: Severity.Info, message: "Loading..." });
    } else {
      handleClose();
    }
    if (syncedAtLeastOnce) {
      setIsLoading(false);
    }
    if (syncedAtLeastOnce) {
      setIsLoading(false);
    }
  }, [live]);

  return (
    <EveLoadingAnimation position="diagonal">
      <div className="grid border border-brightquantum bg-crude overflow-auto">
        <div className="Quantum-Container flex flex-row items-center space-between">
          <div className="justify-start p-2">
            <EveButton
              typeClass="primary"
              className="primary-sm"
              onClick={() =>
                (window.location.href = `/?smartObjectId=${smartAssembly?.id}`)
              }
              id="back"
            >
              {"<"}
            </EveButton>
          </div>
          <div className="justify-end p-2">
            <EveButton
              typeClass="primary"
              className="primary-sm"
              onClick={() =>
                (window.location.href = `/package-creator?smartObjectId=${smartAssembly?.id}`)
              }
              id="package-creator"
            >
              {"+"}
            </EveButton>
          </div>
        </div>
        <div className="bg-brightquantum text-crude flex items-stretch justify-between px-2 py-1 font-semibold">
          <span className="uppercase">{smartAssembly?.name}</span>
          <span className="flex flex-row items-center">
            {abbreviateAddress(smartAssembly?.id)}
            <ClickToCopy text={smartAssembly?.id} className="text-crude" />{" "}
          </span>
        </div>
        <div className="Quantum-Container flex flex-row items-center space-between gap-40">
          <span className="text-xl">Inventory Packages</span>
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
            Loading...
          </div>
        ) : (
          <EveScrollBar maxHeight="520px" id="smartassembly-inventory">
            <div className="Quantum-Container font-normal text-xs !py-4 flex flex-col gap-2 min-h-full">
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
        )}
      </div>
    </EveLoadingAnimation>
  );
};

export default React.memo(InventoryLogs);
