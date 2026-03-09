import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { SignUpButton, SignInButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Link2, BarChart2, Zap, Shield } from 'lucide-react'

const features = [
  {
    icon: Link2,
    title: 'Instant Short Links',
    description:
      'Paste any long URL and get a clean, shareable short link in seconds. No configuration needed.',
  },
  {
    icon: BarChart2,
    title: 'Click Analytics',
    description:
      'Track every click on your short links. Understand your audience with built-in analytics.',
  },
  {
    icon: Zap,
    title: 'Lightning-Fast Redirects',
    description:
      'Our edge-optimised infrastructure ensures your visitors are redirected instantly, every time.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description:
      'Links are protected behind authentication. Only you control your short URLs and their destinations.',
  },
]

export default async function Home() {
  const { userId } = await auth()
  if (userId) redirect('/dashboard')

  return (
    <main className="flex flex-col items-center">
      {/* Hero */}
      <section className="flex w-full flex-col items-center gap-8 px-6 py-28 text-center">
        <h1 className="max-w-2xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Shorten links.{' '}
          <span className="text-muted-foreground">Track what matters.</span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Create short, memorable URLs in seconds and gain instant insights into
          every click — all from one simple dashboard.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <SignUpButton mode="modal">
            <Button size="lg" className="px-8">
              Get Started Free
            </Button>
          </SignUpButton>
        </div>
      </section>

      {/* Features */}
      <section className="w-full max-w-5xl px-6 pb-28">
        <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight text-foreground">
          Everything you need
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader className="flex flex-row items-start gap-4 pb-2">
                <div className="mt-0.5 rounded-md bg-muted p-2">
                  <Icon className="size-5 text-foreground" />
                </div>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} LinkShortener. All rights reserved.
      </footer>
    </main>
  )
}
