import React, { ReactNode } from "react";

interface EveLabelProps {
  fieldName: string;
  children: ReactNode;
}

const EveLabel: React.FC<EveLabelProps> = ({
  fieldName,
  children,
}: EveLabelProps) => {
  const fieldId = fieldName.replace(/\s/g, "");
  return (
    <div className="TextField grid my-1 w-full gap-2" id={`label-${fieldId}`}>
      <span className="text-xs font-bol uppercase">{fieldName}</span>
      {children}
    </div>
  );
};

export default React.memo(EveLabel);
