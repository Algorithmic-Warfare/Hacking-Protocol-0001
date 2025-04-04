import { EveButton, EveInput } from "@eveworld/ui-components";
import React, { useState } from "react";
import { useMUD } from "../MUDContext";
import { Hex } from "viem";
import { useNotification, useSmartObject } from "@eveworld/contexts";
import { EveNumericalInput } from "./elements";
import { Severity } from "@eveworld/types";

interface PackageEntryProps {
  id: bigint;
  name: string;
  author: Hex;
  entries: bigint[];
}

const PackageEntry: React.FC<PackageEntryProps> = ({
  id,
  name,
  author,
  entries,
}) => {
  const { notify, handleClose } = useNotification();
  const { systemCalls } = useMUD();
  const { smartAssembly } = useSmartObject();
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);

  const handleDispense = async () => {
    if (!smartAssembly) return;
    const { id: smartAssemblyId } = smartAssembly;

    notify({
      type: Severity.Info,
      message: "Dispensing package materials ..."
    })
    await systemCalls.dispensePackageMaterials(
      BigInt(smartAssemblyId),
      id,
      BigInt(selectedQuantity)
    );
    handleClose();
  };

  const handleUnregister = async () => {
    notify({
      type: Severity.Info,
      message: "Unregistering package..."
    })
    await systemCalls.unregisterPackage(id);
    handleClose();
  };

  return (
    <>
      <div className="border border-brightquantum p-2 shadow-sm bg-crude">
        <h3 className="font-bold text-sm mb-2">{name || "N/A"}</h3>
        <div className="text-xs mb-2 flex flex-row items-center">
          <EveNumericalInput
            fieldName="Quantity"
            defaultValue={selectedQuantity}
            onChange={(value) => {
              setSelectedQuantity(Number(value));
            }}
            vertical={true}
          />
        </div>
        <div className="text-xs mb-2 flex flex-row">
          <EveButton
            typeClass="primary"
            onClick={handleDispense}
            className="primary-sm mb-2"
            disabled={false}
            id="dispense-package"
          >
            Dispense
          </EveButton>
          <EveButton
            typeClass="tertiary"
            onClick={handleUnregister}
            className="primary-sm mb-2"
            disabled={false}
            id="unregister-package"
          >
            Remove
          </EveButton>
        </div>
      </div>
    </>
  );
};

export default PackageEntry;
