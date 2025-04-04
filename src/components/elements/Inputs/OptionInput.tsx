import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { EveBox } from "../index";

// Define a generic type that allows for any object with string keys and number values
interface EveOptionInputProps<OptionType extends Record<string, number>> {
  label: string;
  options: OptionType;
  onSelect: (option: OptionType[keyof OptionType]) => void;
}

// Use a generic component with correctly inferred type
const EveOptionInput = <OptionType extends Record<string, number>>({
  label,
  options,
  onSelect,
}: EveOptionInputProps<OptionType>) => {
  // State to manage the selected option key
  const [selectedType, setSelectedType] = useState<
    OptionType[keyof OptionType]
  >(Object.values(options)[0] as OptionType[keyof OptionType]);

  useEffect(() => {
    // Use the numeric value associated with the selected key
    onSelect(selectedType);
  }, [selectedType, options, onSelect]);

  // Handler for option change
  const handleChange = (
    event: SelectChangeEvent<OptionType[keyof OptionType]>
  ) => {
    setSelectedType(event.target.value as OptionType[keyof OptionType]);
  };

  return (
    <EveBox>
      <FormControl fullWidth>
        <Select value={selectedType} label={label} onChange={handleChange}>
          {Object.keys(options).map((type) => (
            <MenuItem key={type} value={options[type]}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </EveBox>
  );
};

export default EveOptionInput;
