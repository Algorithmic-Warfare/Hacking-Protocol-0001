import { ParcnetAPI } from "@parcnet-js/app-connector";
import { POD, PODEntries } from "@pcd/pod";
import { zAppConfig } from "./config";
import * as p from "@parcnet-js/podspec";

export enum TransactionType {
  Deposit = 0,
  Withdraw = 1,
}

export type TransactionPodEntries = {
  transactionType: TransactionType;
  itemId: bigint;
  itemQuantity: bigint;
  transacteeAddress: string;
  ssuId: bigint;
  timestamp: bigint;
};

export interface PodVaultClient {
  store: (pod: POD) => Promise<void>;
  prove: (request: p.PodspecProofRequest) => Promise<boolean>;
  remove: (signature: string) => Promise<void>;
  issueTransactionPod: (transaction: TransactionPodEntries) => Promise<POD>;
}

export function createPodVaultClient(api: ParcnetAPI): PodVaultClient {
  const store = async (pod: POD) => {
    await api.pod.collection(zAppConfig.collection).insert({
      entries: pod.content.asEntries(),
      signature: pod.signature,
      signerPublicKey: pod.signerPublicKey,
    });
  };

  const prove = async (request: p.PodspecProofRequest) => {
    const r = await api.gpc.prove({ request });
    return r.success;
  };

  const remove = async (signature: string) => {
    await api.pod.collection(zAppConfig.collection).delete(signature);
  };

  const issueTransactionPod = async (transaction: TransactionPodEntries) => {
    console.log("issueTransactionPod", transaction.itemId);
    const podData: PODEntries = {
      pod_type: { type: "string", value: "hacking-protocol.transaction" },
      transactionType: {
        type: "int",
        value: BigInt(transaction.transactionType),
      },
      itemId: { type: "string", value: transaction.itemId.toString() },
      itemQuantity: {
        type: "int",
        value: transaction.itemQuantity,
      },
      transacteeAddress: {
        type: "string",
        value: transaction.transacteeAddress,
      },
      ssuId: { type: "string", value: transaction.ssuId.toString() },
      timestamp: {
        type: "date",
        value: new Date(Number(transaction.timestamp) * 1000),
      },
    };
    const signedPod = await api.pod.sign(podData);
    return POD.load(
      signedPod.entries,
      signedPod.signature,
      signedPod.signerPublicKey
    );
  };

  return { store, prove, remove, issueTransactionPod };
}
