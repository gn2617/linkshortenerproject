# Authentication Instructions

All authentication in this app is handled exclusively by **Clerk**. Do not introduce any other auth library or custom auth solution.

---

## Rules

- **Only Clerk** — never use NextAuth, Auth.js, custom JWT, or any other auth mechanism.
- The entire app must be wrapped in `<ClerkProvider>` (already set in `app/layout.tsx`).
- Sign in and sign up must **always** be launched as a **modal** — use `mode="modal"` on `<SignInButton>` and `<SignUpButton>`. Never navigate to a dedicated sign-in/sign-up page.

## Protected Routes

- `/dashboard` is a protected route — users **must** be signed in to access it.
- If a **signed-out** user visits `/dashboard`, they must be redirected to `/`.
- Use Clerk's `proxy.ts` (via `clerkMiddleware` from `@clerk/nextjs/server`) at the project root to enforce this. Mark `/dashboard` as a protected route using `createRouteMatcher`.

```ts
// proxy.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
    matcher: ['/((?!_next|.*\\..*).*)'],
}
```

## Homepage Redirect

- If a **signed-in** user visits `/`, redirect them to `/dashboard`.
- Handle this inside the `clerkMiddleware` callback or inside the `/` page using `auth()` from `@clerk/nextjs/server` and `redirect()` from `next/navigation`.

## Clerk Helpers Quick Reference

| Helper | Usage |
|---|---|
| `<ClerkProvider>` | Wraps the app in `app/layout.tsx` |
| `<SignInButton mode="modal">` | Opens sign-in modal |
| `<SignUpButton mode="modal">` | Opens sign-up modal |
| `<UserButton>` | Renders signed-in user avatar/menu |
| `<Show when="signed-in/out">` | Conditionally renders UI by auth state |
| `auth()` | Server-side helper to get session/user |
| `currentUser()` | Server-side helper to get full user object |
