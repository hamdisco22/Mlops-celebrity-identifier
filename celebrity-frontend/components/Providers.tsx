"use client";

import * as React from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

type ColorModeContextType = { mode: "light" | "dark"; toggle: () => void };
export const ColorModeContext = React.createContext<ColorModeContextType>({
  mode: "dark",
  toggle: () => {},
});

function buildTheme(mode: "light" | "dark") {
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            background: { default: "#070A12", paper: "#0B1020" },
            primary: { main: "#7C3AED" },
            secondary: { main: "#22D3EE" },
            text: { primary: "#F5F7FF", secondary: "#B6C0D6" },
            divider: "rgba(255,255,255,0.10)",
          }
        : {
            background: { default: "#F7F8FC", paper: "#FFFFFF" },
            primary: { main: "#5B21B6" },
            secondary: { main: "#0891B2" },
            text: { primary: "#111827", secondary: "#4B5563" },
            divider: "rgba(17,24,39,0.10)",
          }),
    },
    typography: {
      fontFamily: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "Segoe UI",
        "Roboto",
        "Arial",
      ].join(","),
      h1: { fontWeight: 900, letterSpacing: -1.2 },
      h2: { fontWeight: 900, letterSpacing: -1.0 },
      h3: { fontWeight: 900, letterSpacing: -0.8 },
      h4: { fontWeight: 850, letterSpacing: -0.5 },
      h5: { fontWeight: 800 },
      h6: { fontWeight: 800 },
      button: { textTransform: "none", fontWeight: 800 },
    },
    shape: { borderRadius: 18 },
    components: {
      MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
      MuiCard: {
        styleOverrides: {
          root: {
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
          },
        },
      },
      MuiButton: { styleOverrides: { root: { borderRadius: 14 } } },
      MuiTextField: { defaultProps: { size: "small" } },
      MuiOutlinedInput: {
        styleOverrides: {
          root: { borderRadius: 14, background: "rgba(255,255,255,0.04)" },
        },
      },
      MuiChip: { styleOverrides: { root: { fontWeight: 800, borderRadius: 999 } } },
    },
  });

  return responsiveFontSizes(theme);
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");

  const colorMode = React.useMemo(
    () => ({
      mode,
      toggle: () => setMode((m) => (m === "dark" ? "light" : "dark")),
    }),
    [mode]
  );

  const theme = React.useMemo(() => buildTheme(mode), [mode]);

  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AppRouterCacheProvider>
  );
}
