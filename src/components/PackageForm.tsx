import React, { useState } from "react";
import { EveInput, EveButton } from "@eveworld/ui-components";
import { useMUD } from "../MUDContext";
import { useNotification, useSmartObject } from "@eveworld/contexts";
import { PackageAbi } from "../mud/types";
import { Severity } from "@eveworld/types";

type PackageFormProps = {
  pack: PackageAbi;
};

const PackageForm: React.FC<PackageFormProps> = ({ pack }) => {
  const { notify, handleClose } = useNotification();
  const [isNotEmpty, setIsNotEmpty] = useState<boolean>(false);
  const [packageName, setPackageName] = useState<string>("");
  const { smartAssembly } = useSmartObject();
  const { systemCalls } = useMUD();
  const handleEdit = (str: string) => {
    setPackageName(str);
    if (str.length > 0) {
      setIsNotEmpty(true);
    }
    if (str.length === 0) {
      setIsNotEmpty(false);
    }
  };

  const handleSubmit = async () => {
    if (!isNotEmpty) {
      alert("Please enter a package name");
      return;
    }
    if (!smartAssembly) {
      alert("Smart Assembly not found");
      return;
    }
    if (!pack.length) {
      alert("Package is empty");
      return;
    }

    notify({
      type: Severity.Info,
      message: "Registering package...",
    });

    await systemCalls.registerPackage(
      BigInt(smartAssembly?.id),
      packageName,
      pack
    );
    handleClose();

    // Redirect to home page
    window.location.href = `/inventory-packages?smartObjectId=${smartAssembly.id}`;
  };
  return (
    <>
      <div className="Quantum-Container Title">
        <span className={"text-xl"}> Register Package</span>
      </div>
      <div
        className="Quantum-Container font-normal text-xs !py-4"
        id="smartassembly-description"
      >
        <div className="flex flex-row gap-2">
          <EveInput
            inputType="string"
            placeholder="Type Package Name"
            onChange={(str) => handleEdit(String(str || ""))}
            fieldName="Package Name"
            defaultValue={""}
          />
          <EveButton
            typeClass="secondary"
            onClick={handleSubmit}
            className="primary-sm"
            disabled={false}
            id="register-package"
          >
            Register
          </EveButton>
        </div>
      </div>
    </>
  );
};

export default PackageForm;
