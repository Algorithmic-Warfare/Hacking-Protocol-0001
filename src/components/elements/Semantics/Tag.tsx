import { X } from "lucide-react";
import React from "react";

type EveTagProps = {
  index: number;
  item: string;
  onRemove: (index: number) => void;
};

const EveTag: React.FC<EveTagProps> = React.memo(
  ({ index, item, onRemove }) => {
    return (
      <div className="QuantumContainer flex flex-wrap gap-2">
        <div className="flex items-center flex-wrap bg-gray-200 rounded-full px-3 py-1 text-sm">
          {item}
          <button
            onClick={() => onRemove(index)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }
);

export default EveTag;
