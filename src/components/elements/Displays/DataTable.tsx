import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React from "react";

import { ClickToCopy } from "@eveworld/ui-components";
// Define a more flexible type for our data structure
type PrimitiveValue = string | number | bigint | boolean | undefined | null;

interface DataEntry {
  key: {
    [keyName: string]: PrimitiveValue;
  };
  value: {
    [valueName: string]: PrimitiveValue;
  };
}

interface DataTableProps {
  data: DataEntry[];
}

const EveDataTable: React.FC<DataTableProps> = ({ data }) => {
  // Extract all possible key and value fields
  const keyFields = data.length > 0 ? Object.keys(data[0].key) : [];
  const valueFields = data.length > 0 ? Object.keys(data[0].value) : [];

  // Helper function to safely render cell content
  const renderCellContent = (value: PrimitiveValue) => {
    // Handle different types of values
    if (value === undefined || value === null) {
      return <span style={{ color: "gray" }}>N/A</span>;
    }

    // Convert bigint and other types to string for display
    if (typeof value === "bigint") {
      return value.toString();
    }

    // For boolean, render as string
    if (typeof value === "boolean") {
      return value.toString();
    }

    // For numbers, ensure they're rendered correctly
    if (typeof value === "number") {
      return value.toLocaleString();
    }

    // Default case for strings
    return value;
  };

  return (
    <TableContainer component={Paper} className="bg-brightquantum">
      <Table sx={{ minWidth: 650 }} aria-label="data table">
        <TableHead>
          <TableRow>
            {/* Render key field headers */}
            {keyFields.map((field) => (
              <TableCell key={`key-${field}`}>{field}</TableCell>
            ))}

            {/* Render value field headers */}
            {valueFields.map((field) => (
              <TableCell key={`value-${field}`}>{field}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((entry, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* Render key field values */}
              {keyFields.map((field) => (
                <TableCell key={`key-${field}-${index}`}>
                  {renderCellContent(entry.key[field])}
                  <ClickToCopy text={entry.key[field]?.toString()} />
                </TableCell>
              ))}

              {/* Render value field values */}
              {valueFields.map((field) => (
                <TableCell key={`value-${field}-${index}`}>
                  {renderCellContent(entry.value[field])}
                  <ClickToCopy text={entry.key[field]?.toString()} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EveDataTable;
