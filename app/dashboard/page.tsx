import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getLinksByUserId } from '@/data/links'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, Link2 } from 'lucide-react'
import { CreateLinkDialog } from '@/app/dashboard/create-link-dialog'
import { EditLinkDialog } from '@/app/dashboard/edit-link-dialog'
import { DeleteLinkDialog } from '@/app/dashboard/delete-link-dialog'

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) redirect('/')

  const userLinks = await getLinksByUserId(userId)

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Your Links</h1>
          <CreateLinkDialog />
        </div>

        {userLinks.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <Link2 className="mb-4 h-10 w-10 text-muted-foreground" />
              <p className="text-lg font-medium">No links yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Create your first short link to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          <ul className="flex flex-col gap-4">
            {userLinks.map((link) => (
              <li key={link.id}>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base font-semibold">
                      <Link2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="truncate">/{link.shortCode}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between gap-4">
                    <span className="truncate text-sm text-muted-foreground">
                      {link.originalUrl}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      <a
                        href={link.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="Open original URL"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <EditLinkDialog link={link} />
                      <DeleteLinkDialog link={link} />
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
