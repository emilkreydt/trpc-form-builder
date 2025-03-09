import { initTRPC } from "@trpc/server";
import { NextResponse } from "next/server";

const t = initTRPC.create();

export const appRouter = t.router({
    hello: t.procedure.query(() => "Hello from tRPC!"),
});

export type AppRouter = typeof appRouter;

export function GET() {
    return NextResponse.json({ message: "tRPC API werkt! 🚀" });
}
