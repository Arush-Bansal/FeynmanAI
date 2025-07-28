"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface SessionWrapperProps {
  children: ReactNode;
}

/**
 * SessionWrapper is a client component that wraps the NextAuth SessionProvider.
 * This ensures that the SessionProvider and any components relying on its context
 * (like useSession) are only initialized and rendered on the client side,
 * preventing "React context unavailable in server components" errors during SSR.
 */
export function SessionWrapper({ children }: SessionWrapperProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
