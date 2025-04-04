import React from "react";

interface EveProgreeBarProps {
  nominator: number;
  denominator: number;
  label?: string;
}

const EveProgressBar: React.FC<EveProgreeBarProps> = React.memo(
  ({ nominator, denominator, label }) => {
    const percentage =
      denominator === 0 && nominator === 0
        ? "0%"
        : `${(nominator / denominator) * 100}%`;

    return (
      <>
        <div className="w-full h-4 Quantum-Container !p-0.5 my-2 ">
          <div
            className={`h-full Quantum-Container !p-0 bg-brightquantum`}
            style={{ width: percentage, maxWidth: "100%" }}
            id="progress-bar"
          />
        </div>
        {Intl.NumberFormat().format(nominator)} /{" "}
        {Intl.NumberFormat().format(denominator)} {label}
      </>
    );
  }
);

export default EveProgressBar;
