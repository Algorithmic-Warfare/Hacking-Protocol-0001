import React from "react";

import { ClickToCopy } from "@eveworld/ui-components";

interface EveKeyListProps {
  keyName: string;
  list: string[];
}

const EveKeyList: React.FC<EveKeyListProps> = ({ keyName, list }) => {
  return (
    <div className="grid border border-brightquantum p-2 my-1 w-full gap-2">
      <span className="text-s font-bol uppercase">{keyName}</span>
      {list.map((item, index) => (
        <div key={index} className="flex">
          <span className="text-xs font-bol uppercase">{item}</span>
          <ClickToCopy text={item} />
        </div>
      ))}
    </div>
  );
};

export default EveKeyList;
