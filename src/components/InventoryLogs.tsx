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

const InventoryLogs = () => {
  const { systemCalls } = useMUD();
  const { smartAssembly, smartCharacter, loading } = useSmartObject();
  const { syncedAtLeastOnce, live } = useMUDSync();
  const { notify, handleClose } = useNotification();

  const [storageTransactions, setStorageTransactions] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState<string>("");

  const smartAssemblyId = smartAssembly?.id;
  const smartCharacterAddress = smartCharacter?.address;

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

    setStorageTransactions(
      systemCalls
        .getAllStorageTransactions()
        .filter((transaction) => {
          //@ts-ignore
          const smartStorageUnitId = transaction.value?.smartStorageUnitId;

          if (smartStorageUnitId) {
            //@ts-ignore
            return BigInt(smartStorageUnitId) === BigInt(smartAssemblyId);
          }

          return false;
        })
        .filter((transaction) => {
          //@ts-ignore
          const inventoryItemId = transaction.value?.inventoryItemId;

          if (inventoryItemId) {
            return inventoryItemId.toString().includes(searchString);
          }
          return true;
        })
    );
  }, [live, loading, searchString]);

  return (
    <EveLoadingAnimation position="diagonal">
      <div className="grid border border-brightquantum bg-crude overflow-auto">
        <div className="justify-start p-2">
          <EveButton
            typeClass="primary"
            className="primary-sm"
            onClick={() =>
              (window.location.href = `/?smartObjectId=${smartAssembly?.id}`)
            }
            id="inventory-logs"
          >
            {"<"}
          </EveButton>
        </div>
        <div className="bg-brightquantum text-crude flex items-stretch justify-between px-2 py-1 font-semibold">
          <span className="uppercase">{smartAssembly?.name}</span>
          <span className="flex flex-row items-center">
            {abbreviateAddress(smartAssembly?.id)}
            <ClickToCopy text={smartAssembly?.id} className="text-crude" />{" "}
          </span>
        </div>
        <div className="Quantum-Container flex flex-row items-center space-between gap-40">
          <span className="text-xl">Inventory Logs</span>
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
            <div className="Quantum-Container font-normal text-xs !py-4">
              {storageTransactions
                .sort(
                  (a, b) =>
                    Number(b.value?.timestamp) - Number(a.value?.timestamp)
                )
                .map((transaction, index) => {
                  const address = transaction.value?.tribesmenAddress;
                  const inventoryItemId = transaction.value?.inventoryItemId;
                  const inventoryItemAmount =
                    transaction.value?.inventoryItemAmount;
                  const timestamp = transaction.value?.timestamp;
                  const transactionType = transaction.value?.transactionType;

                  const transactionTypeLabel =
                    transactionType === 0 ? "DEPOSIT" : "WITHDRAWAL";

                  return (
                    <div
                      key={index}
                      className="border-b border-brightquantum py-2 px-4 flex flex-col gap-2 overflow-auto"
                    >
                      <div className="flex justify-between overflow-hidden">
                        <span className="font-semibold">Transaction Type:</span>
                        <span className="text-brightquantum truncate">
                          {transactionTypeLabel}
                        </span>
                      </div>
                      <div className="flex justify-between overflow-hidden">
                        <span className="font-semibold">Address:</span>
                        <span className="truncate">{String(address)}</span>
                        <ClickToCopy
                          text={String(address)}
                          className="text-brightquantum"
                        />
                      </div>
                      <div className="flex justify-between overflow-hidden">
                        <span className="font-semibold">
                          Inventory Item ID:
                        </span>
                        <span className="truncate">
                          {String(inventoryItemId)}
                        </span>
                        <ClickToCopy
                          text={String(inventoryItemId)}
                          className="text-brighquantum"
                        />
                      </div>
                      <div className="flex justify-between overflow-hidden">
                        <span className="font-semibold">Amount:</span>
                        <span className="truncate">
                          {String(inventoryItemAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between overflow-hidden">
                        <span className="font-semibold">Timestamp:</span>
                        <span className="truncate">{timestamp.toString()}</span>
                      </div>
                    </div>
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
