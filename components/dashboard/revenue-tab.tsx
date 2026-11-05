'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Coins, DollarSign, ShoppingCart, TrendingUp, Users, Wallet } from 'lucide-react'
import { Card, CardHeader, Delta } from '@/components/kit'
import { latestOrders, methods, productPerformance, series, sum, topSpenders, usd } from '@/lib/data'
import { cn } from '@/lib/utils'
import { AreaPanelChart } from './charts'
import { StatCard } from './stat-card'

export function RevenueTab() {
  const revenue = sum('revenue')
  const orders = sum('orders')
  const profit = sum('profit')

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue" value={usd(revenue)} delta={12.4} hint={`${usd(profit, 0)} profit`} icon={DollarSign} dataKey="revenue" />
        <StatCard label="Orders" value={orders.toLocaleString()} delta={8.1} icon={ShoppingCart} dataKey="orders" color="var(--chart-2)" />
        <StatCard label="Customers" value="612" delta={5.6} hint="148 new" icon={Users} dataKey="visitors" color="var(--chart-4)" />
        <StatCard label="Avg. order value" value={usd(revenue / orders)} delta={-1.8} icon={TrendingUp} dataKey="profit" color="var(--chart-3)" />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader
            title="Revenue"
            description="Gross revenue with profit overlay"
            action={<Legend items={[['Revenue', 'var(--chart-1)'], ['Profit', 'var(--chart-2)']]} />}
          />
          <div className="px-3 pt-4 pb-2">
            <AreaPanelChart
              data={series}
              dataKey="revenue"
              secondaryKey="profit"
              secondaryColor="var(--chart-2)"
              color="var(--chart-1)"
              id="rev"
              format={(n) => usd(n)}
            />
          </div>
        </Card>
        <Card>
          <CardHeader title="Orders" description="Completed orders per day" action={<Legend items={[['Orders', 'var(--chart-4)']]} />} />
          <div className="px-3 pt-4 pb-2">
            <AreaPanelChart data={series} dataKey="orders" color="var(--chart-4)" id="ord" format={(n) => `${n} orders`} />
          </div>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader
            title="Latest completed orders"
            description="Click an order to open its invoice"
            action={
              <Link href="/invoices" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                View all <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground">
                  <th className="px-5 py-2.5 font-medium">Product</th>
                  <th className="px-3 py-2.5 font-medium">Method</th>
                  <th className="px-3 py-2.5 font-medium">Time</th>
                  <th className="px-5 py-2.5 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {latestOrders.map((o) => (
                  <tr key={o.id} className="group border-t hover:bg-accent/40">
                    <td className="px-5 py-3">
                      <Link href="/invoices" className="block">
                        <span className="block max-w-[260px] truncate font-medium text-foreground group-hover:text-primary">{o.product}</span>
                        <span className="block font-mono text-[11px] text-muted-foreground">
                          {o.id} · {o.email}
                        </span>
                      </Link>
                    </td>
                    <td className="px-3 py-3">
                      <MethodChip name={o.method} />
                    </td>
                    <td className="px-3 py-3 text-xs whitespace-nowrap text-muted-foreground">{o.time}</td>
                    <td className="px-5 py-3 text-right font-medium tabular-nums text-foreground">{usd(o.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <ProductsWidget />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Top spenders" description="Customers with the highest lifetime value" />
          <ul className="divide-y">
            {topSpenders.map((c, i) => (
              <li key={c.email} className="flex items-center gap-3 px-5 py-3">
                <span className="w-4 text-xs text-muted-foreground tabular-nums">{i + 1}</span>
                <span className="flex size-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-foreground uppercase">
                  {c.email.slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{c.email}</p>
                  <p className="text-xs text-muted-foreground">{c.orders} orders</p>
                </div>
                <span className="text-sm font-medium tabular-nums text-foreground">{usd(c.spent)}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader title="Most used methods" description="Share of revenue by payment method" />
          <div className="p-5">
            <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
              {methods.map((m) => (
                <div key={m.name} style={{ width: `${m.share}%`, background: m.color }} />
              ))}
            </div>
            <ul className="mt-5 flex flex-col gap-4">
              {methods.map((m) => (
                <li key={m.name} className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-accent" style={{ color: m.color }}>
                    {m.name === 'Customer Balance' ? <Wallet className="size-4" aria-hidden /> : <Coins className="size-4" aria-hidden />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.share}% of revenue</p>
                  </div>
                  <span className="text-sm font-medium tabular-nums text-foreground">{usd(m.amount)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  )
}

function Legend({ items }: { items: [string, string][] }) {
  return (
    <div className="flex items-center gap-3">
      {items.map(([label, color]) => (
        <span key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-2 rounded-full" style={{ background: color }} />
          {label}
        </span>
      ))}
    </div>
  )
}

export function MethodChip({ name }: { name: string }) {
  const color = name === 'Bitcoin' ? 'var(--chart-3)' : name === 'Litecoin' ? 'var(--chart-4)' : 'var(--chart-1)'
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border bg-secondary px-2 py-0.5 text-xs whitespace-nowrap text-secondary-foreground">
      <span className="size-1.5 rounded-full" style={{ background: color }} />
      {name}
    </span>
  )
}

function ProductsWidget() {
  const [view, setView] = useState<'best' | 'decliners' | 'risers'>('best')
  const rows = productPerformance[view]
  const max = Math.max(...rows.map((r) => r.revenue))
  return (
    <Card className="flex flex-col">
      <CardHeader title="Products" description="Performance this period" />
      <div className="px-5 pt-4">
        <div role="tablist" aria-label="Product performance" className="grid grid-cols-3 rounded-lg bg-muted p-0.5">
          {(['best', 'decliners', 'risers'] as const).map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={view === k}
              onClick={() => setView(k)}
              className={cn(
                'rounded-md py-1 text-xs font-medium capitalize',
                view === k ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
      <ul className="flex flex-1 flex-col gap-4 p-5">
        {rows.map((p) => (
          <li key={p.name}>
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm text-foreground">{p.name}</span>
              <Delta value={p.change} />
            </div>
            <div className="mt-1.5 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn('h-full rounded-full', p.change < 0 ? 'bg-destructive' : view === 'risers' ? 'bg-success' : 'bg-primary')}
                  style={{ width: `${(p.revenue / max) * 100}%` }}
                />
              </div>
              <span className="w-20 text-right text-xs text-muted-foreground tabular-nums">{usd(p.revenue, 0)}</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">{p.sales} sales</p>
          </li>
        ))}
      </ul>
    </Card>
  )
}
