"use client";

import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopBar />
        <Box sx={{ px: { xs: 2, md: 3 }, py: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
}
