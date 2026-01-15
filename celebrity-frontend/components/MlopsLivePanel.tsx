"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
  Button,
} from "@mui/material";

const API_BASE = "http://localhost:5000";

type Metrics = {
  model_version: string;
  stage: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  latency_p95_ms: number;
  cost_per_1k_usd: number;
  drift_score: number;
  last_train: string;
  alerts: string[];
};

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
}) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.03)",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 900, mt: 0.5 }}>
        {value}
      </Typography>
      {hint ? (
        <Typography variant="caption" color="text.secondary">
          {hint}
        </Typography>
      ) : null}
    </Box>
  );
}

export default function MlopsLivePanel() {
  const [data, setData] = React.useState<Metrics | null>(null);
  const [loading, setLoading] = React.useState(true);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const r = await fetch(`${API_BASE}/api/metrics`);
      const j = await r.json();
      setData(j);
    } catch {
      // fallback “demo metrics” if endpoint not ready yet
      setData({
        model_version: "v2.1.0",
        stage: "Production",
        accuracy: 0.925,
        precision: 0.903,
        recall: 0.887,
        f1: 0.895,
        latency_p95_ms: 210,
        cost_per_1k_usd: 0.18,
        drift_score: 0.12,
        last_train: "2026-01-14 23:18",
        alerts: ["No critical alerts"],
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMetrics();
    const id = setInterval(fetchMetrics, 7000); // live polling
    return () => clearInterval(id);
  }, []);

  const triggerRetrain = async () => {
    try {
      await fetch(`${API_BASE}/api/retrain`, { method: "POST" });
      fetchMetrics();
      alert("Retrain triggered ✅");
    } catch {
      alert("Retrain endpoint not available yet.");
    }
  };

  const promoteModel = async () => {
    try {
      await fetch(`${API_BASE}/api/promote`, { method: "POST" });
      fetchMetrics();
      alert("Model promotion triggered ✅");
    } catch {
      alert("Promote endpoint not available yet.");
    }
  };

  if (!data) return null;

  const driftColor =
    data.drift_score < 0.2 ? "success" : data.drift_score < 0.4 ? "warning" : "error";

  return (
    <Card
      sx={{
        borderRadius: 4,
        background:
          "linear-gradient(180deg, rgba(11,16,32,0.80), rgba(11,16,32,0.55))",
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 950 }}>
              Live MLOps Panel
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Real-time metrics • drift • latency • cost • alerts
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <Chip label={data.stage} color="primary" />
            <Chip label={data.model_version} variant="outlined" />
            <Button variant="outlined" onClick={fetchMetrics}>
              Refresh
            </Button>
            <Button variant="contained" onClick={triggerRetrain}>
              Trigger Retrain
            </Button>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2, opacity: 0.25 }} />

        {loading ? <LinearProgress /> : null}

        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12} md={3}>
            <Stat label="Accuracy" value={`${(data.accuracy * 100).toFixed(1)}%`} hint="Validation (latest run)" />
          </Grid>
          <Grid item xs={12} md={3}>
            <Stat label="F1 Score" value={`${(data.f1 * 100).toFixed(1)}%`} hint="Balanced quality" />
          </Grid>
          <Grid item xs={12} md={3}>
            <Stat label="Latency (p95)" value={`${data.latency_p95_ms} ms`} hint="Serving performance" />
          </Grid>
          <Grid item xs={12} md={3}>
            <Stat label="Cost / 1K req" value={`$${data.cost_per_1k_usd.toFixed(2)}`} hint="Estimated infra cost" />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
                  Drift Score
                </Typography>
                <Chip label={data.drift_score.toFixed(2)} color={driftColor as any} />
              </Stack>

              <Box sx={{ mt: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(100, data.drift_score * 100)}
                />
                <Typography variant="caption" color="text.secondary">
                  &lt; 0.20 OK • 0.20–0.40 Warning • &gt; 0.40 Critical
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
                  Alerts
                </Typography>
                <Button variant="outlined" onClick={promoteModel}>
                  Promote Model
                </Button>
              </Stack>

              <Box sx={{ mt: 1 }}>
                {data.alerts?.length ? (
                  data.alerts.map((a, i) => (
                    <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>
                      • {a}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No alerts
                  </Typography>
                )}
                <Typography variant="caption" color="text.secondary">
                  Last train: {data.last_train}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
