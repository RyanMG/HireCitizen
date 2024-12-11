'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import RootView from "./root";

const queryClient = new QueryClient();

export default function ProviderRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <RootView>
        {children}
      </RootView>
    </QueryClientProvider>
  );
}
