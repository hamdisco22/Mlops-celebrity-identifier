"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  LinearProgress,
  Box,
  Chip,
  Stack,
} from "@mui/material";

export type TopPrediction = { name: string; confidence: number };

export default function TopPredictionsList({
  predictions,
}: {
  predictions: TopPrediction[];
}) {
  return (
    <Card
      sx={{
        my: 2,
        borderRadius: 4,
        background:
          "linear-gradient(135deg, rgba(11,16,32,0.75), rgba(11,16,32,0.40))",
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="baseline" justifyContent="space-between">
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 950 }}>
              Top Predictions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ranked candidates for the uploaded image
            </Typography>
          </Box>
          <Chip
            size="small"
            variant="outlined"
            label={`${predictions.length} candidates`}
            sx={{ fontWeight: 900 }}
          />
        </Stack>

        {predictions.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Upload an image to see top predictions.
          </Typography>
        ) : (
          <List sx={{ mt: 1 }}>
            {predictions.map((p, idx) => (
              <ListItem key={idx} sx={{ px: 0, alignItems: "flex-start" }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.12)" }}>
                    {p.name?.[0]?.toUpperCase() || "?"}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 850 }}>{p.name}</Typography>
                  }
                  secondary={
                    <Box sx={{ mt: 0.8 }}>
                      <Typography variant="caption" color="text.secondary">
                        Confidence: {(p.confidence * 100).toFixed(1)}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={Math.max(0, Math.min(100, p.confidence * 100))}
                        sx={{ mt: 0.8, height: 8, borderRadius: 999 }}
                      />
                    </Box>
                  }
                  // ✅ This is the fix: secondary is rendered in a <div>, not <p>
                  secondaryTypographyProps={{ component: "div" }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}
