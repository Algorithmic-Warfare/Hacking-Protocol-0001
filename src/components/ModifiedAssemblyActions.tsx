import { Modal } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import {
  AbiItem,
  BaseError,
  ContractFunctionRevertedError,
  encodeFunctionData,
  getAbiItem,
} from "viem";

import {
  useSmartObject,
  useConnection,
  useWorld,
  useNotification,
} from "@eveworld/contexts";
import { Actions, Severity, State } from "@eveworld/types";
import { EveInput, EveButton } from "@eveworld/ui-components";
import { Close } from "@eveworld/ui-components/assets";
import { SYSTEM_IDS, getDappUrl, getSystemId, isOwner } from "@eveworld/utils";

/**
 * Handles actions for a smart storage unit, such as editing unit details, bringing online/offline, and accessing dApp link.
 *
 * Renders buttons for editing unit details, bringing the unit online/offline, and accessing the dApp link. It also includes a modal for editing unit details.
 *
 * @returns JSX.Element
 */
const ModifiedAssemblyActions = React.memo(() => {
  const [showEditUnit, setShowEditUnit] = useState<boolean>(false);

  const { smartAssembly } = useSmartObject();
  const { walletClient, publicClient, isCurrentChain, defaultNetwork } =
    useConnection();
  const { world } = useWorld();
  const { handleSendTx, notify } = useNotification();

  if (smartAssembly === undefined || smartAssembly === null) return <></>;

  const isEntityOwner: boolean = isOwner(
    smartAssembly,
    walletClient?.account?.address
  );

  return (
    <div
      className="Quantum-Container font-semibold grid grid-cols-3 gap-2"
      id="SmartObject-Actions"
    >
      <EveButton
        typeClass="primary"
        className="primary-sm"
        onClick={() =>
          (window.location.href = `/inventory-overview?smartObjectId=${smartAssembly.id}`)
        }
        id="inventory-logs"
        disabled={true}
      >
        Overview
      </EveButton>
      <EveButton
        typeClass="primary"
        className="primary-sm"
        onClick={() =>
          (window.location.href = `/inventory-packages?smartObjectId=${smartAssembly.id}`)
        }
        id="inventory-packages"
        disabled={isEntityOwner}
      >
        Packages
      </EveButton>
      <EveButton
        typeClass="primary"
        className="primary-sm"
        onClick={() =>
          (window.location.href = `/inventory-logs?smartObjectId=${smartAssembly.id}`)
        }
        id="inventory-logs"
      >
        Logs
      </EveButton>
    </div>
  );
});

export default React.memo(ModifiedAssemblyActions);
