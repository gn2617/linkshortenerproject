"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Pencil, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { updateLinkAction } from "@/app/dashboard/actions";
import type { Link } from "@/db/schema";

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
  slug: z
    .string()
    .min(1, { message: "Slug must be at least 1 character." })
    .max(64, { message: "Slug must be at most 64 characters." })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Slug may only contain letters, numbers, hyphens, and underscores.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface EditLinkDialogProps {
  link: Link;
}

export function EditLinkDialog({ link }: EditLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: link.originalUrl,
      slug: link.shortCode,
    },
  });

  // Sync form defaults when the link prop changes
  useEffect(() => {
    reset({ url: link.originalUrl, slug: link.shortCode });
  }, [link, reset]);

  async function onSubmit(values: FormValues) {
    setServerError(null);
    const result = await updateLinkAction({ id: link.id, ...values });

    if (!result.success) {
      setServerError(result.error);
      return;
    }

    setOpen(false);
  }

  function handleOpenChange(next: boolean) {
    if (!next) {
      reset({ url: link.originalUrl, slug: link.shortCode });
      setServerError(null);
    }
    setOpen(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-muted-foreground hover:text-foreground"
          aria-label="Edit link"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit short link</DialogTitle>
          <DialogDescription>
            Update the destination URL or slug for this link.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* URL field */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-url">Destination URL</Label>
            <Input
              id="edit-url"
              type="url"
              placeholder="https://example.com/very/long/path"
              className={cn(errors.url && "border-destructive focus-visible:ring-destructive")}
              {...register("url")}
            />
            {errors.url && (
              <p className="text-sm text-destructive">{errors.url.message}</p>
            )}
          </div>

          {/* Slug field */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-slug">Short slug</Label>
            <Input
              id="edit-slug"
              type="text"
              placeholder="my-link"
              className={cn(errors.slug && "border-destructive focus-visible:ring-destructive")}
              {...register("slug")}
            />
            {errors.slug && (
              <p className="text-sm text-destructive">{errors.slug.message}</p>
            )}
          </div>

          {serverError && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {serverError}
            </p>
          )}

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
