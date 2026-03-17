# Agent Instructions — Link Shortener Project


## Project Overview

A full-stack link shortener application built with the Next.js App Router. Users authenticate via Clerk, create short links backed by a PostgreSQL database (Neon), and are redirected when visiting a short URL. The UI is built with shadcn/ui components styled with Tailwind CSS v4.

---

## Quick Rules

- **Never** use the Pages Router. All code lives inside `app/` using the App Router.
- **Never** install an alternative to an already-chosen library (e.g. do not add Prisma when Drizzle is already used, do not add NextAuth when Clerk is already used).
- **Always** keep components in `components/` and only place page-level files in `app/`.
- **Always** use TypeScript with strict mode — no `any` types without an explicit comment justification.
- **Always** use the `cn()` utility from `@/lib/utils` when merging Tailwind classes.

