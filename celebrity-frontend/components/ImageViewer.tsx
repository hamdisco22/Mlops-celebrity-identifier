"use client";

import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";

export default function ImageViewer({
  file,
  title = "Preview",
}: {
  file: File | null;
  title?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [fit, setFit] = React.useState<"cover" | "contain">("contain");

  const url = React.useMemo(() => (file ? URL.createObjectURL(file) : ""), [file]);

  React.useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  if (!file) {
    return (
      <Box
        sx={{
          height: 260,
          borderRadius: 3,
          border: "1px dashed rgba(255,255,255,0.18)",
          display: "grid",
          placeItems: "center",
          color: "text.secondary",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <Typography variant="body2">Upload an image to preview it here.</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box
        onClick={() => setOpen(true)}
        sx={{
          height: 260,
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.03)",
          cursor: "zoom-in",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt="preview"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
        <DialogContent sx={{ background: "rgba(7,10,18,0.95)" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              {title}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" onClick={() => setFit("contain")}>
                Fit
              </Button>
              <Button variant="outlined" onClick={() => setFit("cover")}>
                Fill
              </Button>
              <Button variant="contained" onClick={() => setOpen(false)}>
                Close
              </Button>
            </Stack>
          </Stack>

          <Box
            sx={{
              height: { xs: 360, md: 620 },
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt="large preview"
              style={{ width: "100%", height: "100%", objectFit: fit }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
