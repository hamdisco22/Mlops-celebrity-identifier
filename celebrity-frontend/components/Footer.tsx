"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "#f3f4f6",
      }}
    >
      <Typography variant="body2" align="center" color="text.secondary">
        © {new Date().getFullYear()} Celebrity Identifier — MLOps Dashboard
      </Typography>
    </Box>
  );
}
