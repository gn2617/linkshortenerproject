# UI Instructions

All UI in this app is built exclusively with **shadcn/ui** components. Do not create custom components from scratch when a shadcn/ui equivalent exists.

---

## Rules

- **Only shadcn/ui** — never hand-roll custom UI components (buttons, inputs, dialogs, cards, etc.) when a shadcn/ui component is available.
- Add new components via the CLI: `npx shadcn@latest add <component>`. Do not manually create files under `components/ui/`.
- All shadcn/ui components live in `components/ui/` and are imported via the `@/components/ui/` alias.
- Custom composite components (combining multiple shadcn/ui primitives) belong in `components/` — not `components/ui/`.
- **Always** use the `cn()` utility from `@/lib/utils` when merging or conditionally applying Tailwind classes.

## Configuration

- **Style:** `radix-nova`
- **Base color:** `neutral`
- **CSS variables:** enabled (`app/globals.css`)
- **Icon library:** `lucide-react`
- **RSC:** enabled — components are Server Component–compatible by default; add `"use client"` only when interactivity requires it.

## Tailwind

- This project uses **Tailwind CSS v4**. Do not add a `tailwind.config.ts` file; all theme customization is done via CSS variables in `app/globals.css`.
- Use Tailwind utility classes for layout and spacing. Do not write inline styles.

## Component Alias Quick Reference

| Alias | Path |
|---|---|
| `@/components/ui` | `components/ui/` — shadcn/ui primitives |
| `@/components` | `components/` — composite/app-level components |
| `@/lib/utils` | `lib/utils.ts` — includes `cn()` |
| `@/hooks` | `hooks/` — custom React hooks |
