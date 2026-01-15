"use client";

import React from "react";
import {
  Box,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ColorModeContext } from "./Providers";

export default function TopBar() {
  const { mode, toggle } = React.useContext(ColorModeContext);

  return (
    <Box
      sx={{
        px: { xs: 2, md: 3 },
        py: 1.5,
        display: "flex",
        alignItems: "center",
        gap: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "rgba(15,22,41,0.55)",
        backdropFilter: "blur(14px)",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.1 }}>
          Celebrity Identifier
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Vision recognition + QA + MLOps dashboard
        </Typography>
      </Box>

      <TextField
        placeholder="Search celebrity, model version, run id..."
        sx={{ width: { xs: 220, md: 420 } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      <Chip
        label={mode === "dark" ? "Dark" : "Light"}
        size="small"
        color="secondary"
        variant="outlined"
      />

      <IconButton onClick={toggle} aria-label="toggle theme">
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Box>
  );
}
