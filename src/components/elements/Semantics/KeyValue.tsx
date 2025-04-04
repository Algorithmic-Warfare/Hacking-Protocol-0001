import React from "react";

import { ClickToCopy } from "@eveworld/ui-components";

interface EveKeyValueProps {
  keyName: string;
  value: string;
}

const EveKeyValue: React.FC<EveKeyValueProps> = ({ keyName, value }) => {
  return (
    <div className="grid border border-brightquantum p-2 my-1 w-full gap-2">
      <span className="text-s font-bol uppercase">{keyName}</span>
      <div className="flex">
        <span className="">{value}</span>
        <ClickToCopy text={value} />
      </div>
    </div>
  );
};

export default EveKeyValue;
