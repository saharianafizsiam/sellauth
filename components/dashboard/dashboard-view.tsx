'use client'

import { useState } from 'react'
import {
  Calendar,
  ChevronDown,
  Compass,
  DollarSign,
  Eye,
  Filter,
  Mail,
  MousePointerClick,
  Package,
  Percent,
  Rocket,
  ShoppingCart,
  Timer,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'
import { Btn, Card, PageHeader } from '@/components/kit'
import { cn } from '@/lib/utils'
import { RevenueTab } from './revenue-tab'
import { TrafficTab } from './traffic-tab'

const ranges = ['Today', '7 days', '30 days', '90 days', '12 months']

export function DashboardView() {
  const [tab, setTab] = useState<'revenue' | 'traffic'>('revenue')
  const [range, setRange] = useState('30 days')
  const [promos, setPromos] = useState({ abandoned: true, past: true })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Welcome back, Alex" subtitle="Here's how Nova Keys is performing. All amounts in USD.">
        <Btn>
          <Compass aria-hidden />
          Take a tour
        </Btn>
        <Btn variant="primary">
          <Rocket aria-hidden />
          Quick setup
        </Btn>
      </PageHeader>

      {(promos.abandoned || promos.past) && (
        <div className="grid gap-3 md:grid-cols-2">
          {promos.abandoned && (
            <PromoCard
              icon={<ShoppingCart className="size-4" aria-hidden />}
              tone="warning"
              title="$1,284.60 in abandoned checkouts"
              text="37 customers left before paying this month. Send them a recovery email with a coupon."
              cta="Recover them"
              href="/abandoned-checkouts"
              onDismiss={() => setPromos((p) => ({ ...p, abandoned: false }))}
            />
          )}
          {promos.past && (
            <PromoCard
              icon={<Mail className="size-4" aria-hidden />}
              tone="primary"
              title="Past customers spent $48,920.15"
              text="1,842 buyers opted into your newsletter. Announce your latest drop to bring them back."
              cta="Email them"
              href="/email-marketing"
              onDismiss={() => setPromos((p) => ({ ...p, past: false }))}
            />
          )}
        </div>
      )}

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Dashboard view" className="inline-flex w-fit rounded-lg border bg-card p-1">
          {(
            [
              ['revenue', 'Revenue & Orders', DollarSign],
              ['traffic', 'Traffic & Visitors', Eye],
            ] as const
          ).map(([key, label, Icon]) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={cn(
                'inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                tab === key ? 'bg-accent text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Icon className="size-4" aria-hidden />
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border bg-card p-0.5">
            {ranges.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                aria-pressed={range === r}
                className={cn(
                  'rounded-md px-2.5 py-1 text-xs font-medium',
                  range === r ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {r}
              </button>
            ))}
          </div>
          <Btn size="sm">
            <Calendar aria-hidden />
            Oct 7 – Nov 5
          </Btn>
          <Btn size="sm">
            <Package aria-hidden />
            All products
            <ChevronDown aria-hidden />
          </Btn>
          <Btn size="sm">
            <Filter aria-hidden />
            Filters
          </Btn>
          <Btn size="sm">
            USD
            <ChevronDown aria-hidden />
          </Btn>
        </div>
      </div>

      {tab === 'revenue' ? <RevenueTab /> : <TrafficTab />}
    </div>
  )
}

function PromoCard({
  icon,
  tone,
  title,
  text,
  cta,
  href,
  onDismiss,
}: {
  icon: React.ReactNode
  tone: 'warning' | 'primary'
  title: string
  text: string
  cta: string
  href: string
  onDismiss: () => void
}) {
  return (
    <Card
      className={cn(
        'relative flex items-start gap-3.5 overflow-hidden p-4',
        tone === 'warning' ? 'bg-gradient-to-r from-warning/10 to-card' : 'bg-gradient-to-r from-primary/12 to-card',
      )}
    >
      <div
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-lg',
          tone === 'warning' ? 'bg-warning/15 text-warning' : 'bg-primary/15 text-primary',
        )}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1 pr-6">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{text}</p>
        <a href={href} className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
          {cta}
          <TrendingUp className="size-3.5" aria-hidden />
        </a>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="absolute top-3 right-3 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
        aria-label={`Dismiss: ${title}`}
      >
        <X className="size-3.5" />
      </button>
    </Card>
  )
}

export const statIcons = { DollarSign, ShoppingCart, Users, TrendingUp, Eye, MousePointerClick, Timer, Percent }
