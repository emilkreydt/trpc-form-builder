"use client";

import { trpc } from "@/utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <trpc.Provider client={trpc.createClient({ links: [] })} queryClient={queryClient}>
                {children}
            </trpc.Provider>
        </QueryClientProvider>
    );
}
