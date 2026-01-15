"use client";

import * as React from "react";

export default function MountOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null; // ✅ server + first client render match (null)
  return <>{children}</>;
}
