'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RootView from "./root";

const queryClient = new QueryClient();

export default function ProviderRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RootView>
          {children}
        </RootView>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}
