type PackageStruct = {
  entries: PackageEntryStruct[];
};

type PackageEntryStruct = {
  itemId: bigint;
  amount: bigint;
};

type PackageAbi = Array<[bigint, bigint]>;

export type { PackageAbi, PackageStruct, PackageEntryStruct };
