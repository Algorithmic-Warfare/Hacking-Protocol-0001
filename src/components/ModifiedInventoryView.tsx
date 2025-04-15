import React, { useState } from "react";
import {
  Severity,
  SmartAssemblyType,
  type InventoryItem,
} from "@eveworld/types";
import { formatM3, isOwner } from "@eveworld/utils";
import { EveLinearBar, EveButton, EveInput } from "@eveworld/ui-components";
import { useNotification } from "@eveworld/contexts";
import { WalletClient } from "viem";
import { useMUD } from "../MUDContext";
import { ethers } from "ethers";
import { EveNumericalInput, EveScrollBar } from "./elements";

const ModifiedInventoryView = React.memo(
  ({
    smartAssembly,
    walletClient,
    isEphemeralInventory,
  }: {
    smartAssembly: SmartAssemblyType<"SmartStorageUnit">;
    walletClient: WalletClient;
    isEphemeralInventory: boolean;
  }): JSX.Element => {
    if (!smartAssembly) return <></>;
    const {
      storageItems,
      ephemeralInventoryList,
      storageCapacity,
      usedCapacity,
    } = smartAssembly.inventory;

    let isEntityOwner: boolean = isOwner(
      smartAssembly,
      walletClient?.account?.address
    );
    const { notify, handleClose } = useNotification();
    const { systemCalls } = useMUD();

    const [searchString, setSearchString] = useState<string>("");

    const handleSearch = (str: string) => {
      setSearchString(str);
    };

    const playerInventory = ephemeralInventoryList.find((x) => {
      return (
        ethers.getAddress(x.ownerId) ==
        ethers.getAddress(walletClient?.account?.address as string)
      );
    });

    // If owner, return persistent storage items
    // If player, return own ephemeral storage items

    const inventoryItems = !isEphemeralInventory
      ? storageItems?.map((item: any) => {
          return item;
        })
      : playerInventory?.ephemeralInventoryItems?.map((item) => {
          return item;
        });

    const storageCap = !isEphemeralInventory
      ? storageCapacity
      : playerInventory?.storageCapacity;
    const usedCap = !isEphemeralInventory
      ? usedCapacity
      : playerInventory?.usedCapacity;

    const handleDeposit = async (
      inventoryItemId: bigint,
      inventoryItemAmount: bigint
    ) => {
      if (ethers.getNumber(inventoryItemAmount) == 0) {
        notify({
          type: Severity.Error,
          message: "No item selected to deposit",
        });
      } else {
        notify({
          type: Severity.Info,
          message: "Depositing inventory items...",
        });
        await systemCalls.deposit(
          BigInt(smartAssembly.id),
          inventoryItemId,
          inventoryItemAmount
        );
        handleClose();
      }
    };

    const handleWithdraw = async (
      inventoryItemId: bigint,
      inventoryItemAmount: bigint
    ) => {
      if (ethers.getNumber(inventoryItemAmount) == 0) {
        notify({
          type: Severity.Error,
          message: "No item selected to withdraw",
        });
      } else {
        notify({
          type: Severity.Info,
          message: "Withdrawing inventory items...",
        });
        await systemCalls.withdraw(
          BigInt(smartAssembly.id),
          inventoryItemId,
          inventoryItemAmount
        );
        handleClose();
      }
    };

    return (
      <>
        <div className="Quantum-Container flex flex-row items-center space-between gap-0">
          <span className="text-l">
            {isEphemeralInventory ? "Your Inventory" : "Storage Inventory"}
          </span>
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
        <EveScrollBar maxHeight="260px" id="smartassembly-inventory">
          <div className="Quantum-Container text-xs flex flex-col !py-4 gap-2 min-h-full">
            {!inventoryItems || inventoryItems.length === 0 ? (
              <div>Empty</div>
            ) : (
              inventoryItems
                ?.filter((item) =>
                  //@ts-ignore
                  String(item.name)
                    .toLowerCase()
                    .includes(searchString.toLowerCase())
                )
                .map((item, index) => (
                  <div key={index}>
                    <InventoryItem
                      item={item}
                      isEntityOwner={isEntityOwner}
                      actionName={isEphemeralInventory ? "Deposit" : "Withdraw"}
                      actionHandler={
                        isEphemeralInventory ? handleDeposit : handleWithdraw
                      }
                    />
                  </div>
                ))
            )}
          </div>
        </EveScrollBar>

        <div className="Quantum-Container Title">Inventory Capacity</div>
        <div
          className="Quantum-Container text-2xs font-bold py-2"
          id="smartassembly-invcapacity"
        >
          <EveLinearBar
            nominator={formatM3(usedCap ?? BigInt(0))}
            denominator={formatM3(storageCap ?? BigInt(0))}
            label={`m3`}
          />
        </div>
      </>
    );
  }
);

const InventoryItem = ({
  isEntityOwner,
  item,
  actionName,
  actionHandler,
}: {
  isEntityOwner: boolean;
  item: InventoryItem;
  actionName: string;
  actionHandler: (
    inventoryItemId: bigint,
    inventoryItemAmount: bigint
  ) => Promise<void>;
}) => {
  const { typeId, name, quantity, itemId } = item;

  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);

  const handleAction = () => {
    return actionHandler(BigInt(itemId), BigInt(selectedQuantity));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full justify-between font-bold">
        <span>{name ?? `Item Type ${typeId}`}</span>
        <span>{quantity}</span>
      </div>
      <span className="text-2xs">ID: {typeId}</span>
      {isEntityOwner ? (
        <></>
      ) : (
        <>
          <EveNumericalInput
            fieldName="Quantity"
            defaultValue={selectedQuantity}
            onChange={(value) => {
              if (Number(value) <= quantity) {
                setSelectedQuantity(Number(value));
              } else {
                setSelectedQuantity(quantity);
              }
            }}
          />
          <EveButton typeClass="tertiary" onClick={handleAction}>
            {actionName}
          </EveButton>
        </>
      )}
    </div>
  );
};

export default ModifiedInventoryView;
