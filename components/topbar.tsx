'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Bell, ExternalLink, HelpCircle, Menu, X } from 'lucide-react'
import { navSections } from '@/lib/nav'
import { SidebarContent } from './app-sidebar'

export function Topbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  let section = 'Overview'
  let page = 'Dashboard'
  for (const s of navSections) {
    for (const i of s.items) {
      if (pathname === i.href || pathname.startsWith(i.href + '/')) {
        section = s.title
        page = i.label
      }
    }
  }
  if (pathname === '/products/create') page = 'Create Product'

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="-ml-1 rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </button>
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm">
          <span className="hidden text-muted-foreground sm:inline">{section}</span>
          <span className="hidden text-muted-foreground/50 sm:inline">/</span>
          <span className="truncate font-medium text-foreground">{page}</span>
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <a
            href="#"
            className="hidden h-8 items-center gap-1.5 rounded-lg border bg-secondary px-2.5 text-xs font-medium text-secondary-foreground hover:bg-accent sm:inline-flex"
          >
            View shop
            <ExternalLink className="size-3.5" aria-hidden />
          </a>
          <button type="button" className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Help">
            <HelpCircle className="size-4" />
          </button>
          <button
            type="button"
            className="relative rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="Notifications, 3 unread"
          >
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
          </button>
          <Link
            href="/user"
            className="ml-1 flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-chart-4 to-primary text-xs font-semibold text-white"
            aria-label="Profile"
          >
            AK
          </Link>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <button type="button" className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} aria-label="Close navigation" />
          <div className="absolute inset-y-0 left-0 w-72 border-r bg-sidebar shadow-2xl animate-in slide-in-from-left">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-3 z-10 rounded-lg p-1 text-muted-foreground hover:bg-accent"
              aria-label="Close navigation"
            >
              <X className="size-4" />
            </button>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  )
}
