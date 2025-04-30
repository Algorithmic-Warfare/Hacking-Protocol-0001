import { Zapp } from "@parcnet-js/app-connector";

export const zAppConfig: ZappConfig = createZappConfig(
  "Hacking-Protocol-0001",
  "Hacking-Protocol-0001"
);

export type ZappConfig = Zapp & {
  collection: string;
};

function createZappConfig(appName: string, collection: string): ZappConfig {
  return {
    name: appName,
    permissions: {
      REQUEST_PROOF: { collections: [collection] },
      SIGN_POD: {},
      READ_POD: { collections: [collection] },
      INSERT_POD: { collections: [collection] },
    },
    collection,
  };
}

export const expectedItemId = 101566323435732540889167848324699621054641644394678449818508966615754276560108n; // Silicates
const expectedItemAmount = 1000n; // 1000