"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

// By default, Next.js uses Server-Side Rendering (SSR), while React Query is a client-side library.
// This component is defined in a separate file with the "use client" directive
// to ensure that the React Query client is only instantiated and used on the client-side.
export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
} 