import { FC, useState } from "react";
import { EveButton } from "@eveworld/ui-components";
import { useZupassContext } from "./ZupassContext";

interface SaveTransactionButtonProps {
  transaction: {
    tribesmenAddress: string;
    inventoryItemId: bigint;
    inventoryItemAmount: bigint;
    timestamp: number;
    transactionType: number;
    ssuId: bigint;
  };
}

export const SaveTransactionButton: FC<SaveTransactionButtonProps> = ({
  transaction,
}) => {
  const [loading, setLoading] = useState(false);
  const { podVault } = useZupassContext();

  const handleSaveTransaction = async () => {
    try {
      setLoading(true);
      const client = await podVault.connect();
      const pod = await client.issueTransactionPod({
        itemId: transaction.inventoryItemId,
        itemQuantity: transaction.inventoryItemAmount,
        transacteeAddress: transaction.tribesmenAddress,
        transactionType: transaction.transactionType,
        timestamp: BigInt(transaction.timestamp),
        ssuId: transaction.ssuId,
      });
      console.log(pod);
    } catch (error) {
      console.error("Failed to save transaction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EveButton
      typeClass="primary"
      onClick={handleSaveTransaction}
      disabled={loading}
    >
      {loading ? "Wait..." : "Save proof"}
    </EveButton>
  );
};
