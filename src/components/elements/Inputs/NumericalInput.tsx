import * as NumberField from "@base_ui/react/NumberField";
import React from "react";

interface EveInputProps {
  defaultValue: number;
  fieldName: string;
  onChange: (value: number) => void;
  vertical?: boolean;
}

const EveNumericalInput: React.FC<EveInputProps> = React.memo(
  ({ fieldName, onChange, defaultValue, vertical }) => {
    const fieldId = fieldName.replace(/\s/g, "");

    return (
      <div className="TextField grid my-1 w-full gap-2" id={`edit-${fieldId}`}>
        <span className="text-xs font-bol uppercase">{fieldName}</span>
        <NumberField.Root
          id={`input-${fieldId}`}
          aria-label={`numerical-input-${fieldId}`}
          min={0}
          onValueChange={(val) => onChange(val || 0)}
        >
          <NumberField.Group
            className={
              `flex flex-${vertical? "col": "row"} justify-between border border-brightquantum p-1`
            }
          >
            <NumberField.Decrement
              className={
                "text-sm leading-4 uppercase font-bold px-2 mobile:px-0 py-1 border border-brightquantum self-stretch;"
              }
            >
              &minus;
            </NumberField.Decrement>
            <NumberField.Input
              placeholder={String(defaultValue)}
              className="outline-none focus:outline-none text-center bg-crude"
            />
            <NumberField.Increment
              className={
                "text-sm leading-4 uppercase font-bold px-2 mobile:px-0 py-1 border border-brightquantum self-stretch;"
              }
            >
              +
            </NumberField.Increment>
          </NumberField.Group>
        </NumberField.Root>
      </div>
    );
  }
);

export default EveNumericalInput;
