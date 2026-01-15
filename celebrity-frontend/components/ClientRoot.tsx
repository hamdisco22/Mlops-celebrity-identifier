"use client";

import Providers from "./Providers";
import AppShell from "./AppShell";
import MountOnly from "./MountOnly";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <MountOnly>
      <Providers>
        <AppShell>{children}</AppShell>
      </Providers>
    </MountOnly>
  );
}
