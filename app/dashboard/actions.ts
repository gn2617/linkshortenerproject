"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink, updateLink, deleteLink } from "@/data/links";
import { revalidatePath } from "next/cache";

const createLinkSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
  slug: z
    .string()
    .min(1, { message: "Slug must be at least 1 character." })
    .max(64, { message: "Slug must be at most 64 characters." })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Slug may only contain letters, numbers, hyphens, and underscores.",
    }),
});

type CreateLinkInput = z.infer<typeof createLinkSchema>;

type CreateLinkResult =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Partial<Record<keyof CreateLinkInput, string[]>> };

export async function createLinkAction(input: CreateLinkInput): Promise<CreateLinkResult> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid input.",
      fieldErrors: parsed.error.flatten().fieldErrors as Partial<
        Record<keyof CreateLinkInput, string[]>
      >,
    };
  }

  const { url, slug } = parsed.data;

  await createLink({
    userId,
    originalUrl: url,
    shortCode: slug,
  });

  revalidatePath("/dashboard");

  return { success: true };
}

const updateLinkSchema = z.object({
  id: z.number().int().positive(),
  url: z.string().url({ message: "Please enter a valid URL." }),
  slug: z
    .string()
    .min(1, { message: "Slug must be at least 1 character." })
    .max(64, { message: "Slug must be at most 64 characters." })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Slug may only contain letters, numbers, hyphens, and underscores.",
    }),
});

type UpdateLinkInput = z.infer<typeof updateLinkSchema>;

type UpdateLinkResult =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Partial<Record<"url" | "slug", string[]>> };

export async function updateLinkAction(input: UpdateLinkInput): Promise<UpdateLinkResult> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const parsed = updateLinkSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid input.",
      fieldErrors: parsed.error.flatten().fieldErrors as Partial<Record<"url" | "slug", string[]>>,
    };
  }

  const { id, url, slug } = parsed.data;

  const updated = await updateLink(id, userId, { originalUrl: url, shortCode: slug });
  if (!updated) return { success: false, error: "Link not found or access denied." };

  revalidatePath("/dashboard");

  return { success: true };
}

const deleteLinkSchema = z.object({
  id: z.number().int().positive(),
});

type DeleteLinkInput = z.infer<typeof deleteLinkSchema>;

type DeleteLinkResult = { success: true } | { success: false; error: string };

export async function deleteLinkAction(input: DeleteLinkInput): Promise<DeleteLinkResult> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const parsed = deleteLinkSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Invalid input." };

  await deleteLink(parsed.data.id, userId);

  revalidatePath("/dashboard");

  return { success: true };
}
