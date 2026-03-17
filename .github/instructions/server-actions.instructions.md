---
description: Apply these rules whenever creating or modifying server actions in this project.
---

# Server Actions Instructions

## File Naming & Colocation
- Server action files **must** be named `actions.ts`.
- Each `actions.ts` file must be **colocated** in the same directory as the client component that calls it.

## Calling Server Actions
- Server actions must **only** be called from **client components** (`"use client"`).

## TypeScript Types
- All data passed to a server action must have **explicit TypeScript types**.
- **Never** use the `FormData` TypeScript type for server action parameters.

## Validation
- All input data **must** be validated using **Zod** before any processing.

## Authentication
- Every server action **must** check for a logged-in user (via Clerk) **before** performing any database operations.
- If no user is found, return early with an appropriate error.

## Database Access
- Database operations must be performed via **helper functions** located in the `/data` directory.
- Server actions **must not** contain raw Drizzle queries directly — always delegate to `/data` helper functions.

## Example Structure

```ts
// app/dashboard/actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink } from "@/data/links";

const createLinkSchema = z.object({
  url: z.string().url(),
  slug: z.string().min(1),
});

type CreateLinkInput = z.infer<typeof createLinkSchema>;

export async function createLinkAction(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.flatten() };

  await createLink({ ...parsed.data, userId });
}
```
