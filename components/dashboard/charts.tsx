'use client'

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type Point = Record<string, string | number>

export function Sparkline({ data, dataKey, color, id }: { data: Point[]; dataKey: string; color: string; id: string }) {
  return (
    <div className="h-10 w-24" aria-hidden>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
          <defs>
            <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={1.5} fill={`url(#spark-${id})`} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function ChartTooltip({
  active,
  payload,
  label,
  format,
}: {
  active?: boolean
  payload?: { value: number; name: string; color: string }[]
  label?: string
  format: (n: number) => string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-xs shadow-xl">
      <p className="mb-1 text-muted-foreground">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="flex items-center gap-2 font-medium text-foreground">
          <span className="size-2 rounded-full" style={{ background: p.color }} />
          <span className="capitalize text-muted-foreground">{p.name}</span>
          <span className="ml-auto tabular-nums">{format(p.value)}</span>
        </p>
      ))}
    </div>
  )
}

export function AreaPanelChart({
  data,
  dataKey,
  color,
  id,
  format,
  secondaryKey,
  secondaryColor,
}: {
  data: Point[]
  dataKey: string
  color: string
  id: string
  format: (n: number) => string
  secondaryKey?: string
  secondaryColor?: string
}) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.32} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="oklch(1 0 0 / 6%)" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            interval="preserveStartEnd"
            minTickGap={28}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            width={48}
            tickFormatter={(v: number) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v))}
          />
          <Tooltip cursor={{ stroke: 'oklch(1 0 0 / 15%)' }} content={<ChartTooltip format={format} />} />
          {secondaryKey ? (
            <Area
              type="monotone"
              dataKey={secondaryKey}
              stroke={secondaryColor}
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="transparent"
            />
          ) : null}
          <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#fill-${id})`} activeDot={{ r: 4, strokeWidth: 0 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
