import React from "react";
import * as p from "@parcnet-js/podspec";
import { usePodVault } from "./usePodVault";
import { ZupassContext } from "./ZupassContext";
import { TransactionType } from "./podVaultClient";
import { expectedItemId, expectedItemQuantity } from "./config";

interface ZupassContextProvider {
  children: React.ReactNode;
}

const proofRequest: p.PodspecProofRequest = {
  pods: {
    pod1: {
      pod: {
        entries: {
          itemId: {
            type: "string",
            isMemberOf: [{ type: "string", value: expectedItemId.toString() }],
          },
          transactionType: {
            type: "int",
            isMemberOf: [
              { type: "int", value: BigInt(TransactionType.Deposit) },
            ],
          },
          itemQuantity: {
            type: "int",
            inRange: {
              min: expectedItemQuantity,
              max: 9223372036854775807n,
            },
          },
          pod_type: {
            type: "string",
            isMemberOf: [
              { type: "string", value: "hacking-protocol.transaction" },
            ],
          },
        },
      },
      revealed: {
        transacteeAddress: true,
      },
    },
  },
};

export const ZupassContextProvider: React.FC<ZupassContextProvider> = ({
  children,
}) => {
  const podVault = usePodVault();
  const [proved, setProved] = React.useState(false);

  const prove = React.useCallback(async () => {
    const client = await podVault.connect();
    const proof = await client.prove(proofRequest);
    console.log("proof", proof);
    setProved(proof);
    return proof;
  }, [podVault.connect]);

  React.useEffect(() => {
    console.log("podVault.pods", podVault.pods);
    console.log("proofRequest", proofRequest);
  }, [podVault.pods]);

  return (
    <>
      <ZupassContext.Provider
        value={{
          podVault,
          proved,
          prove,
        }}
      >
        {children}
      </ZupassContext.Provider>
    </>
  );
};
