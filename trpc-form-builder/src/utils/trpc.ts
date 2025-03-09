"use client";

import { createTRPCReact } from "@trpc/react-query";
import {AppRouter} from "@/app/trpc/route";

export const trpc = createTRPCReact<AppRouter>();
