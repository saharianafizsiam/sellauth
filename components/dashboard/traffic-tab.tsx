'use client'

import { Eye, MousePointerClick, Percent, Timer, TrendingDown, Users } from 'lucide-react'
import { Card, CardHeader } from '@/components/kit'
import { compact, series, sum, traffic } from '@/lib/data'
import { AreaPanelChart } from './charts'
import { StatCard } from './stat-card'

export function TrafficTab() {
  const pageviews = sum('pageviews')
  const visitors = sum('visitors')

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard label="Pageviews" value={compact(pageviews)} delta={14.2} icon={Eye} dataKey="pageviews" />
        <StatCard label="Visitors" value={compact(visitors)} delta={9.8} icon={Users} dataKey="visitors" color="var(--chart-4)" />
        <StatCard label="Views per visit" value={(pageviews / visitors).toFixed(2)} delta={3.1} icon={MousePointerClick} dataKey="pageviews" color="var(--chart-2)" />
        <StatCard label="Avg. bounce rate" value="38.4%" delta={-4.2} hint="lower is better" icon={TrendingDown} dataKey="visitors" color="var(--chart-5)" />
        <StatCard label="Avg. session time" value="3m 12s" delta={6.5} icon={Timer} dataKey="orders" color="var(--chart-3)" />
        <StatCard label="Conversion rate" value="4.82%" delta={1.2} icon={Percent} dataKey="revenue" color="var(--chart-2)" />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Pageviews" description="Total page loads per day" />
          <div className="px-3 pt-4 pb-2">
            <AreaPanelChart data={series} dataKey="pageviews" color="var(--chart-1)" id="pv" format={(n) => n.toLocaleString()} />
          </div>
        </Card>
        <Card>
          <CardHeader title="Visitors" description="Unique visitors per day" />
          <div className="px-3 pt-4 pb-2">
            <AreaPanelChart data={series} dataKey="visitors" color="var(--chart-4)" id="vis" format={(n) => n.toLocaleString()} />
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <BarList title="Pages" rows={traffic.pages} mono />
        <BarList title="Sources" rows={traffic.sources} />
        <BarList title="Browsers" rows={traffic.browsers} />
        <BarList title="Countries" rows={traffic.countries} />
      </div>
    </div>
  )
}

function BarList({ title, rows, mono }: { title: string; rows: { label: string; value: number; code?: string }[]; mono?: boolean }) {
  const max = Math.max(...rows.map((r) => r.value))
  return (
    <Card>
      <CardHeader title={title} action={<span className="text-xs text-muted-foreground">Visitors</span>} />
      <ul className="flex flex-col gap-1.5 p-3">
        {rows.map((r) => (
          <li key={r.label} className="relative flex items-center justify-between gap-2 rounded-md px-2.5 py-1.5">
            <span className="absolute inset-y-0 left-0 rounded-md bg-primary/12" style={{ width: `${(r.value / max) * 100}%` }} />
            <span className={`relative flex min-w-0 items-center gap-2 truncate text-sm text-foreground ${mono ? 'font-mono text-xs' : ''}`}>
              {r.code ? <span className="rounded bg-accent px-1 font-mono text-[10px] text-muted-foreground">{r.code}</span> : null}
              <span className="truncate">{r.label}</span>
            </span>
            <span className="relative text-xs font-medium tabular-nums text-muted-foreground">{compact(r.value)}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
