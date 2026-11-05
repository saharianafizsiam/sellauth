'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, ChevronsUpDown, Search, Zap } from 'lucide-react'
import { navSections } from '@/lib/nav'
import { cn } from '@/lib/utils'

function isActive(pathname: string, href: string) {
  if (href === '/dashboard') return pathname === href
  if (href === '/shop' || href === '/anti-fraud' || href === '/products') return pathname === href
  return pathname === href || pathname.startsWith(href + '/')
}

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-4 pt-4 pb-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_0_24px_-4px] shadow-primary/60">
          <Zap className="size-4" aria-hidden />
        </div>
        <span className="text-[15px] font-semibold tracking-tight text-foreground">Ordexa</span>
        <span className="ml-auto rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">FREE</span>
      </div>

      <button
        type="button"
        className="mx-3 flex items-center gap-2.5 rounded-lg border bg-card px-2.5 py-2 text-left hover:bg-accent"
      >
        <div className="flex size-7 items-center justify-center rounded-md bg-gradient-to-br from-primary to-chart-4 text-xs font-bold text-white">
          N
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">Nova Keys</p>
          <p className="truncate text-xs text-muted-foreground">novakeys.ordexa.shop</p>
        </div>
        <ChevronsUpDown className="size-4 text-muted-foreground" aria-hidden />
      </button>

      <div className="relative mx-3 mt-3">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <label htmlFor="nav-search" className="sr-only">
          Search navigation
        </label>
        <input
          id="nav-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Jump to..."
          className="h-8 w-full rounded-lg border bg-background/60 pr-10 pl-8 text-sm placeholder:text-muted-foreground focus:outline-2 focus:outline-ring"
        />
        <kbd className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded border bg-muted px-1 font-mono text-[10px] text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      <nav aria-label="Main" className="mt-3 flex-1 overflow-y-auto px-2 pb-4">
        {navSections.map((section) => {
          const items = q ? section.items.filter((i) => i.label.toLowerCase().includes(q)) : section.items
          if (!items.length) return null
          const isCollapsed = !q && collapsed[section.title]
          return (
            <div key={section.title} className="mb-1">
              {section.title !== 'Overview' ? (
                <button
                  type="button"
                  onClick={() => setCollapsed((c) => ({ ...c, [section.title]: !c[section.title] }))}
                  aria-expanded={!isCollapsed}
                  className="group flex w-full items-center justify-between px-2.5 pt-3 pb-1 text-[11px] font-medium tracking-wider text-muted-foreground/80 uppercase hover:text-foreground"
                >
                  {section.title}
                  <ChevronDown
                    className={cn('size-3.5 opacity-0 transition group-hover:opacity-100', isCollapsed && '-rotate-90 opacity-100')}
                    aria-hidden
                  />
                </button>
              ) : null}
              {!isCollapsed && (
                <ul className="flex flex-col gap-0.5">
                  {items.map((item) => {
                    const active = isActive(pathname, item.href)
                    const Icon = item.icon
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onNavigate}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            'relative flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] transition-colors',
                            active
                              ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
                              : 'text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
                          )}
                        >
                          {active ? <span className="absolute top-1.5 bottom-1.5 left-0 w-0.5 rounded-full bg-primary" /> : null}
                          <Icon className={cn('size-4', active ? 'text-primary' : 'text-muted-foreground')} aria-hidden />
                          <span className="truncate">{item.label}</span>
                          {item.badge ? (
                            <span
                              className={cn(
                                'ml-auto rounded px-1.5 text-[10px] font-semibold',
                                /^\d+$/.test(item.badge) ? 'bg-primary text-primary-foreground' : 'bg-success/15 text-success',
                              )}
                            >
                              {item.badge}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}
      </nav>

      <div className="m-3 rounded-xl border bg-gradient-to-br from-primary/20 via-card to-card p-3.5">
        <p className="text-sm font-medium text-foreground">Upgrade to Business</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Custom domain, subscriptions, team seats and advanced anti-fraud.
        </p>
        <Link
          href="/subscription"
          onClick={onNavigate}
          className="mt-3 flex h-8 items-center justify-center rounded-lg bg-primary text-xs font-medium text-primary-foreground hover:bg-primary/90"
        >
          View plans
        </Link>
      </div>
    </div>
  )
}

export function AppSidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
      <SidebarContent />
    </aside>
  )
}
