import { useMUD } from "../MUDContext";
import {
  useSmartObject,
  useNotification,
  useConnection,
} from "@eveworld/contexts";
import { Severity, SmartAssemblyType } from "@eveworld/types";
import { useMUDSync } from "../MUDSyncContext";
import { useEffect, useState } from "react";
import {
  ClickToCopy,
  ErrorNotice,
  ErrorNoticeTypes,
  EveButton,
  EveInput,
  EveLoadingAnimation,
} from "@eveworld/ui-components";
import { toHex } from "viem";
import React from "react";
import { EveScrollBar } from "./elements";
import { abbreviateAddress } from "@eveworld/utils";
import PackageEntry from "./PackageEntry";
import { InventoryView } from "@eveworld/ui-components";
import PackageForm from "./PackageForm";
import { convertToPackageAbi } from "./utils";
import { ethers } from "ethers";

const PackageCreator = () => {
  const { defaultNetwork, gatewayConfig, walletClient } = useConnection();
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

  if ((!loading && !smartAssembly) || !smartAssembly?.isValid) {
    return <ErrorNotice type={ErrorNoticeTypes.SMART_ASSEMBLY} />;
  }
  const { ephemeralInventoryList } = (
    smartAssembly as SmartAssemblyType<"SmartStorageUnit">
  ).inventory;

  const playerInventory = ephemeralInventoryList.find((x) => {
    return (
      ethers.getAddress(x.ownerId) ==
      ethers.getAddress(walletClient?.account?.address as string)
    );
  });

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
        </div>
        <div className="bg-brightquantum text-crude flex items-stretch justify-between px-2 py-1 font-semibold">
          <span className="uppercase">{smartAssembly?.name}</span>
          <span className="flex flex-row items-center">
            {abbreviateAddress(smartAssembly?.id)}
            <ClickToCopy text={smartAssembly?.id} className="text-crude" />{" "}
          </span>
        </div>
        <PackageForm
          pack={convertToPackageAbi(
            playerInventory?.ephemeralInventoryItems || []
          )}
        />
        <InventoryView
          smartAssembly={smartAssembly as SmartAssemblyType<"SmartStorageUnit">}
          walletClient={walletClient!}
        />
      </div>
    </EveLoadingAnimation>
  );
};

export default React.memo(PackageCreator);
