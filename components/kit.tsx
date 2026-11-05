import { cn } from '@/lib/utils'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('rounded-xl border bg-card', className)} {...props} />
}

export function CardHeader({
  title,
  description,
  action,
  className,
}: {
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-start justify-between gap-4 border-b px-5 py-4', className)}>
      <div className="min-w-0">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        {description ? <p className="mt-0.5 text-xs text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  )
}

type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

export function Btn({
  variant = 'secondary',
  size = 'md',
  className,
  ...props
}: React.ComponentProps<'button'> & { variant?: BtnVariant; size?: 'sm' | 'md' }) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
        size === 'md' ? 'h-9 px-3.5 text-sm' : 'h-8 px-2.5 text-xs',
        variant === 'primary' && 'bg-primary text-primary-foreground hover:bg-primary/90',
        variant === 'secondary' && 'border bg-secondary text-secondary-foreground hover:bg-accent',
        variant === 'ghost' && 'text-muted-foreground hover:bg-accent hover:text-foreground',
        variant === 'danger' && 'border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20',
        className,
      )}
      {...props}
    />
  )
}

const toneMap: Record<string, string> = {
  success: 'bg-success/12 text-success ring-success/25',
  warning: 'bg-warning/12 text-warning ring-warning/25',
  danger: 'bg-destructive/12 text-destructive ring-destructive/25',
  primary: 'bg-primary/15 text-primary ring-primary/30',
  neutral: 'bg-muted text-muted-foreground ring-border',
}

export type Tone = keyof typeof toneMap

export function Pill({ tone = 'neutral', children, className }: { tone?: Tone; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium ring-1 ring-inset whitespace-nowrap',
        toneMap[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Delta({ value }: { value: number }) {
  const up = value >= 0
  const Icon = up ? ArrowUpRight : ArrowDownRight
  return (
    <span className={cn('inline-flex items-center gap-0.5 text-xs font-medium', up ? 'text-success' : 'text-destructive')}>
      <Icon className="size-3.5" aria-hidden />
      {Math.abs(value).toFixed(1)}%
    </span>
  )
}

export function PageHeader({
  title,
  subtitle,
  badge,
  children,
}: {
  title: string
  subtitle?: string
  badge?: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-balance">{title}</h1>
          {badge ? <Pill tone="primary">{badge}</Pill> : null}
        </div>
        {subtitle ? <p className="mt-1 text-sm text-muted-foreground text-pretty">{subtitle}</p> : null}
      </div>
      {children ? <div className="flex flex-wrap items-center gap-2">{children}</div> : null}
    </div>
  )
}

export function Toggle({ on, label }: { on: boolean; label: string }) {
  return (
    <span
      role="img"
      aria-label={`${label}: ${on ? 'on' : 'off'}`}
      className={cn('relative inline-flex h-5 w-9 items-center rounded-full transition-colors', on ? 'bg-primary' : 'bg-muted ring-1 ring-border')}
    >
      <span className={cn('size-4 rounded-full bg-white shadow transition-transform', on ? 'translate-x-4.5' : 'translate-x-0.5')} />
    </span>
  )
}
