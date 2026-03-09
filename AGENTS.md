# Agent Instructions — Link Shortener Project

This file is the entry point for LLM coding agents working in this repository. It provides a high-level overview of the project and links out to detailed instruction documents located in the `/docs` directory.

> ⚠️ **CRITICAL — NON-NEGOTIABLE RULE** ⚠️
> **You MUST read every relevant file in the `/docs` directory BEFORE generating ANY code, making ANY edits, or writing ANY logic — no exceptions.** Failure to do so will result in incorrect implementations that violate project conventions. Do not assume you already know the rules. Always read the docs first.

---

## Project Overview

A full-stack link shortener application built with the Next.js App Router. Users authenticate via Clerk, create short links backed by a PostgreSQL database (Neon), and are redirected when visiting a short URL. The UI is built with shadcn/ui components styled with Tailwind CSS v4.

---

## Instruction Documents

| Document | Description |
|---|---|
| [docs/auth.md](docs/auth.md) | Clerk authentication rules, protected routes, modal sign-in/up, and redirect logic |
| [docs/ui.md](docs/ui.md) | shadcn/ui usage rules, component conventions, Tailwind CSS v4, and alias reference |

---

## Quick Rules

- **Never** use the Pages Router. All code lives inside `app/` using the App Router.
- **Never** install an alternative to an already-chosen library (e.g. do not add Prisma when Drizzle is already used, do not add NextAuth when Clerk is already used).
- **Always** keep components in `components/` and only place page-level files in `app/`.
- **Always** use TypeScript with strict mode — no `any` types without an explicit comment justification.
- **Always** use the `cn()` utility from `@/lib/utils` when merging Tailwind classes.
- **Always** read the relevant doc file before generating code in that domain.
