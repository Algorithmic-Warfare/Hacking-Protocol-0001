import { useCallback, useState } from "react";
import { connect as connectZapp, ParcnetAPI } from "@parcnet-js/app-connector";
import * as p from "@parcnet-js/podspec";
import { zAppConfig } from "./config";
import { POD, PODEntries } from "@pcd/pod";
import { PodVaultClient, TransactionPodEntries, createPodVaultClient } from "./podVaultClient";

export type PodVaultStatus = "offline" | "connecting" | "connected";

const query = p.pod({
  entries: {},
});

export interface PodVault extends PodVaultClient {
  status: PodVaultStatus;
  pods: p.PODData[];
  connect: () => Promise<PodVaultClient>;
}

export function usePodVault(): PodVault {
  const [status, setStatus] = useState<PodVaultStatus>("offline");
  const [pods, setPods] = useState<p.PODData[]>([]);
  const [client, setClient] = useState<PodVaultClient>();

  const connect = useCallback(async () => {
    if (client) return client;
    const iframeContainer = document.getElementById("zupass-container");
    if (!iframeContainer) {
      throw new Error("Could not find zupass-container element");
    }
    setStatus("connecting");
    const z = await connectZapp(
      zAppConfig,
      iframeContainer,
      "https://zupass.org"
    );
    const sub = await z.pod.collection(zAppConfig.collection).subscribe(query);
    const pods = await z.pod.collection(zAppConfig.collection).query(query);
    setPods(pods);
    sub.on("update", (pods) => {
      setPods(pods);
    });
    setStatus("connected");
    const newClient = createPodVaultClient(z);
    setClient(newClient);
    return newClient;
  }, [client]);

  const store = useCallback(
    async (pod: POD) => {
      if (!client) {
        throw new Error("Zapp not connected");
      }
      return client.store(pod);
    },
    [client]
  );

  const prove = useCallback(
    async (proofRequestJson: string) => {
      if (!client) {
        throw new Error("Zapp not connected");
      }
      return client.prove(proofRequestJson);
    },
    [client]
  );

  const remove = useCallback(
    async (signature: string) => {
      if (!client) {
        throw new Error("Zapp not connected");
      }
      return client.remove(signature);
    },
    [client]
  );

  const issueTransactionPod = useCallback(
    async (transaction: TransactionPodEntries) => {
      if (!client) {
        throw new Error("Zapp not connected");
      }
      return client.issueTransactionPod(transaction);
    },
    [client]
  );

  return { status, pods, connect, store, prove, remove, issueTransactionPod };
}
