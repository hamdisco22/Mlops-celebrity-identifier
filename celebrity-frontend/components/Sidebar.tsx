"use client";

import React from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RadarIcon from "@mui/icons-material/Radar";
import TimelineIcon from "@mui/icons-material/Timeline";
import SettingsIcon from "@mui/icons-material/Settings";

const items = [
  { label: "Identify", icon: <PersonSearchIcon />, href: "#identify" },
  { label: "Dashboard", icon: <DashboardIcon />, href: "#dashboard" },
  { label: "Monitoring", icon: <RadarIcon />, href: "#monitoring" },
  { label: "Pipeline", icon: <TimelineIcon />, href: "#pipeline" },
  { label: "Settings", icon: <SettingsIcon />, href: "#settings" },
];

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: { xs: 0, md: 280 },
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        borderRight: "1px solid",
        borderColor: "divider",
        p: 2,
        position: "sticky",
        top: 0,
        height: "100vh",
        background: "rgba(15,22,41,0.55)",
        backdropFilter: "blur(14px)",
      }}
    >
      <Box sx={{ px: 1, pb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 900 }}>
          Celebrity MLOps
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Identify • Explain • Monitor
        </Typography>

        <Box sx={{ mt: 1.5, display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip label="Groq" size="small" />
          <Chip label="Vision+QA" size="small" color="secondary" />
          <Chip label="MLOps" size="small" />
        </Box>
      </Box>

      <List sx={{ mt: 1 }}>
        {items.map((it) => (
          <ListItemButton
            key={it.label}
            component="a"
            href={it.href}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&:hover": { background: "rgba(124,58,237,0.10)" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 38 }}>{it.icon}</ListItemIcon>
            <ListItemText
              primary={it.label}
              primaryTypographyProps={{ fontWeight: 750 }}
            />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ mt: "auto", p: 1.5, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
        <Typography variant="body2" sx={{ fontWeight: 800 }}>
          Pro tip
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Upload a clear face photo for best accuracy. Use the QA box to ask about the detected celebrity.
        </Typography>
      </Box>
    </Box>
  );
}
