'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

type QueryContextProps = {
  children: React.ReactNode;
};

export const QueryContext = ({ children }: QueryContextProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
