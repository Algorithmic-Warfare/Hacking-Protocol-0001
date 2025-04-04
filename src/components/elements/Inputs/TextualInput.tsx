import { TextField } from "@mui/material";
import React from "react";

export interface EveTextualInputProps {
  fieldName: string;
  defaultValue?: string;
  placeholder?: string;
  multiline?: boolean;
  onChange: (value: string) => void;
}

const EveTextualInput = React.forwardRef<
  HTMLInputElement,
  EveTextualInputProps
>(({ fieldName, placeholder, multiline, defaultValue, onChange }, ref) => {
  const fieldId = fieldName.replace(/\s/g, "");

  return (
    <TextField
      multiline={multiline}
      minRows={multiline ? 5 : undefined}
      id={`input-${fieldId}`}
      placeholder={placeholder ?? fieldName}
      defaultValue={defaultValue}
      className="flex-grow"
      onChange={(e) => onChange(e.target.value)}
      autoComplete="off"
      autoFocus
      inputRef={ref}
    />
  );
});

export default EveTextualInput;
