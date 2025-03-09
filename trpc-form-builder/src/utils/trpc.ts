import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@/server/trpc/router"; // Zorg dat dit pad klopt!

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: "/api/trpc", // Dit moet correct verwijzen naar je API
        }),
    ],
});
