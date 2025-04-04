import React from "react";

interface EveSectionProps {
  sectionName: string;
}

const EveSection: React.FC<EveSectionProps> = ({ sectionName }) => {
  const sectionId = sectionName.replace(/\s/g, "");
  return (
    <div className="TextField grid my-1 w-full gap-2" id={`label-${sectionId}`}>
      <h2 className="text-xl font-bold">{sectionName}</h2>
    </div>
  );
};

export default React.memo(EveSection);
