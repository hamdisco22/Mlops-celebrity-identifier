"use client";

import React from "react";
import {
  Box,
  Card,
  Chip,
  Stack,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BoltIcon from "@mui/icons-material/Bolt";
import ShieldIcon from "@mui/icons-material/Shield";
import InsightsIcon from "@mui/icons-material/Insights";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

export default function ModernHero({
  onGetStarted,
}: {
  onGetStarted: () => void;
}) {
  return (
    <Card
      sx={{
        borderRadius: 5,
        overflow: "hidden",
        position: "relative",
        border: "1px solid rgba(255,255,255,0.10)",
        background:
          "linear-gradient(180deg, rgba(11,16,32,0.92), rgba(11,16,32,0.70))",
      }}
    >
      {/* subtle grid */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.22,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          pointerEvents: "none",
        }}
      />
      {/* glow blobs */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(900px 380px at 18% 20%, rgba(124,58,237,0.30), transparent 60%), radial-gradient(900px 380px at 82% 30%, rgba(34,211,238,0.22), transparent 60%), radial-gradient(800px 420px at 55% 110%, rgba(244,114,182,0.14), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ position: "relative", p: { xs: 3, md: 5 } }}>
        <Stack spacing={3}>
          {/* top chips */}
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip
              icon={<BoltIcon />}
              label="Real-time inference"
              variant="outlined"
              sx={{ fontWeight: 900 }}
            />
            <Chip
              icon={<InsightsIcon />}
              label="MLOps dashboard"
              variant="outlined"
              color="secondary"
              sx={{ fontWeight: 900 }}
            />
            <Chip
              icon={<ShieldIcon />}
              label="Monitoring + alerts"
              variant="outlined"
              sx={{ fontWeight: 900 }}
            />
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            {/* left */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 950,
                  letterSpacing: -1.2,
                  lineHeight: 1.02,
                }}
              >
                Identify celebrities{" "}
                <Box component="span" sx={{ color: "secondary.main" }}>
                  instantly
                </Box>
                .
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 1.5, maxWidth: 780, fontSize: { xs: 15, md: 16 } }}
              >
                Upload a photo → get structured identity details → ask questions →
                track model performance, drift, latency, and deployments like a
                production MLOps platform.
              </Typography>

              <Stack direction="row" spacing={1.5} sx={{ mt: 3, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={onGetStarted}
                  startIcon={<AutoAwesomeIcon />}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    background:
                      "linear-gradient(135deg, rgba(124,58,237,1), rgba(34,211,238,1))",
                  }}
                >
                  Start Identification
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  href="#dashboard"
                  sx={{ borderRadius: 3, px: 3 }}
                >
                  Open Dashboard
                </Button>
              </Stack>
            </Box>

            {/* right */}
            <Box
              sx={{
                width: { xs: "100%", md: 420 },
                borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.03)",
                p: 2.5,
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="overline" color="text.secondary">
                    What you get
                  </Typography>
                  <Chip
                    icon={<TrackChangesIcon />}
                    label="Production-ready"
                    size="small"
                    color="primary"
                    sx={{ fontWeight: 900 }}
                  />
                </Stack>

                <Divider sx={{ opacity: 0.25 }} />

                <Stack spacing={1.2}>
                  <FeatureRow title="Face overlay & clean preview" desc="Zoom / fit image viewer for clarity." />
                  <FeatureRow title="Top-K predictions + confidence" desc="Candidate ranking returned by the backend." />
                  <FeatureRow title="Live MLOps metrics panel" desc="Latency p95, drift score, cost & alerts." />
                  <FeatureRow title="Pipeline + deployments" desc="Training timeline, model versions, promote/retrain." />
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}

function FeatureRow({ title, desc }: { title: string; desc: string }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(0,0,0,0.15)",
        p: 1.5,
      }}
    >
      <Typography sx={{ fontWeight: 900 }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
        {desc}
      </Typography>
    </Box>
  );
}
