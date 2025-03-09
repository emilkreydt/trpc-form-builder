import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { NextResponse } from "next/server";
import {PrismaClient} from "@prisma/client/extension";

const prisma = new PrismaClient();
const t = initTRPC.create();

export const appRouter = t.router({
    getFields: t.procedure.query(async () => {
        return await prisma.formField.findMany();
    }),

    addField: t.procedure
        .input(
            z.object({
                label: z.string(),
                type: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            return await prisma.formField.create({
                data: input,
            });
        }),
});

export type AppRouter = typeof appRouter;

export async function GET() {
    return NextResponse.json(appRouter);
}
