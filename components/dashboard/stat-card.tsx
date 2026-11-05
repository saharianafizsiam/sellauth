'use client'

import type { LucideIcon } from 'lucide-react'
import { Card, Delta } from '@/components/kit'
import { series } from '@/lib/data'
import { Sparkline } from './charts'

export function StatCard({
  label,
  value,
  delta,
  hint,
  icon: Icon,
  dataKey,
  color = 'var(--chart-1)',
}: {
  label: string
  value: string
  delta: number
  hint?: string
  icon: LucideIcon
  dataKey: keyof (typeof series)[number]
  color?: string
}) {
  return (
    <Card className="flex flex-col gap-3 p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="size-3.5" aria-hidden />
        {label}
      </div>
      <div className="flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-2xl font-semibold tracking-tight tabular-nums text-foreground">{value}</p>
          <div className="mt-1 flex items-center gap-2">
            <Delta value={delta} />
            <span className="truncate text-xs text-muted-foreground">{hint ?? 'vs. previous period'}</span>
          </div>
        </div>
        <Sparkline data={series} dataKey={dataKey} color={color} id={String(dataKey) + label} />
      </div>
    </Card>
  )
}
