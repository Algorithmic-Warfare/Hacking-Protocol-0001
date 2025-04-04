import type { InventoryItem } from "@eveworld/types";
import type { PackageAbi } from "../mud/types";

// Write a function that converts a list of InventoryItem to a PackageAbi
export function convertToPackageAbi(items: InventoryItem[]): PackageAbi {
  return items.map((item) => [BigInt(item.itemId), BigInt(item.quantity)]);
}
