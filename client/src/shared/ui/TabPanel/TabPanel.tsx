import { Box } from "@mui/material";
import { FC } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  label: string;
}

export const TabPanel: FC<TabPanelProps> = ({ children, value, index, label }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${label}-tabpanel-${index}`}
      aria-labelledby={`${label}-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};