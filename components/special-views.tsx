'use client'

import { useState } from 'react'
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Check,
  Code,
  Coins,
  CreditCard,
  Download,
  Gamepad2,
  GripVertical,
  KeyRound,
  Paintbrush,
  Package,
  Plus,
  Repeat,
  Sparkles,
  Truck,
  UserRound,
  Wallet,
  Wrench,
  Zap,
} from 'lucide-react'
import { Btn, Card, Pill, Toggle } from '@/components/kit'
import { cn } from '@/lib/utils'

const plans = [
  { name: 'Free', price: '$0', desc: 'Everything to start selling.', features: ['20 products & addons', 'BTC & LTC crypto', 'Basic anti-fraud', 'Ordexa subdomain', 'Limited abandoned recovery'], current: true },
  { name: 'Business', price: '$9.99', desc: 'For growing shops.', features: ['100 products & addons', 'Custom domain & pages', 'Subscriptions', 'Team members & permissions', 'VPN / Tor / country anti-fraud', 'Email marketing & blog', 'ETH, SOL, USDT, USDC'], popular: true },
  { name: 'Scale', price: '$29.99', desc: 'For high-volume sellers.', features: ['Unlimited products', 'Everything in Business', 'Disputes automation', 'More affiliate tiers', 'Priority support', 'Lowest fees'] },
]

export function PlansGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {plans.map((p) => (
        <Card key={p.name} className={cn('relative flex flex-col p-6', p.popular && 'border-primary/50 bg-gradient-to-b from-primary/12 to-card')}>
          {p.popular ? <Pill tone="primary" className="absolute top-5 right-5">Most popular</Pill> : null}
          <h3 className="text-base font-semibold text-foreground">{p.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
          <p className="mt-5 text-3xl font-semibold tracking-tight text-foreground">
            {p.price}
            <span className="text-sm font-normal text-muted-foreground"> / month</span>
          </p>
          <ul className="mt-6 flex flex-1 flex-col gap-2.5">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
          <Btn variant={p.current ? 'secondary' : 'primary'} className="mt-6 w-full" disabled={p.current}>
            {p.current ? 'Current plan' : `Upgrade to ${p.name}`}
          </Btn>
        </Card>
      ))}
    </div>
  )
}

const methodGroups = [
  { title: 'Card processors', items: ['Stripe', 'Square', 'SumUp', 'Mollie', 'Skrill Business', 'Authorize.Net', 'Revolut Business', 'NMI', 'Overpay', 'MONEI', 'Razorpay UPI', 'Mercado Pago', 'VenPayr', 'OVGC', 'PayMongo', 'Amazon Payment Services'] },
  { title: 'Platforms', items: ['Lemon Squeezy', 'Pandabase', 'Dodo', 'Shopify'] },
  { title: 'Wallets & transfers', items: ['PayPal', 'PayPal F&F', 'Cash App', 'Venmo F&F', 'Zelle', 'Skrill Send', 'Rewarble', 'MisticPay PIX'] },
  { title: 'Crypto', badge: 'Business+', items: ['ETH', 'USDT ERC20', 'USDC ERC20', 'SOL', 'USDT SPL', 'USDC SPL'] },
]

export function MethodsGrid() {
  const [active, setActive] = useState<Record<string, boolean>>({ Litecoin: true, Bitcoin: true, 'Customer Balance': true })
  return (
    <div className="flex flex-col gap-6">
      <section aria-labelledby="configured">
        <h2 id="configured" className="mb-3 text-sm font-medium text-foreground">
          Configured
        </h2>
        <Card className="divide-y">
          {['Litecoin', 'Bitcoin', 'Customer Balance'].map((m) => (
            <div key={m} className="flex items-center gap-3 px-4 py-3">
              <GripVertical className="size-4 text-muted-foreground" aria-hidden />
              <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-primary">
                {m === 'Customer Balance' ? <Wallet className="size-4" aria-hidden /> : <Coins className="size-4" aria-hidden />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{m}</p>
                <p className="text-xs text-muted-foreground">{m === 'Customer Balance' ? 'Pay with store credit' : 'Native wallet · 1 confirmation'}</p>
              </div>
              <Pill tone={active[m] ? 'success' : 'neutral'}>{active[m] ? 'Active' : 'Inactive'}</Pill>
              <button type="button" onClick={() => setActive((a) => ({ ...a, [m]: !a[m] }))} aria-label={`Toggle ${m}`}>
                <Toggle on={!!active[m]} label={m} />
              </button>
            </div>
          ))}
        </Card>
      </section>
      {methodGroups.map((g) => (
        <section key={g.title} aria-label={g.title}>
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-sm font-medium text-foreground">{g.title}</h2>
            {g.badge ? <Pill tone="primary">{g.badge}</Pill> : null}
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {g.items.map((m) => (
              <Card key={m} className="flex items-center gap-3 p-3 hover:border-primary/40">
                <span className="flex size-8 items-center justify-center rounded-md bg-accent text-xs font-semibold text-foreground">
                  {m.slice(0, 2).toUpperCase()}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-foreground">{m}</span>
                <Btn size="sm" variant="ghost" aria-label={`Add ${m}`}>
                  <Plus />
                </Btn>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

const wallets = [
  { coin: 'Bitcoin', sym: 'BTC', bal: '0.04812', usd: '$4,335.20', color: 'var(--chart-3)' },
  { coin: 'Litecoin', sym: 'LTC', bal: '71.2045', usd: '$6,120.40', color: 'var(--chart-4)' },
  { coin: 'Ethereum', sym: 'ETH', bal: '0.0000', usd: '$0.00', color: 'var(--chart-1)', tokens: 'USDT · USDC', locked: true },
  { coin: 'Solana', sym: 'SOL', bal: '0.0000', usd: '$0.00', color: 'var(--chart-2)', tokens: 'USDT · USDC', locked: true },
]

export function WalletsGrid() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="flex flex-col gap-1 bg-gradient-to-r from-primary/15 to-card p-6">
        <p className="text-xs text-muted-foreground">Total balance</p>
        <p className="text-3xl font-semibold tracking-tight text-foreground">$10,455.60</p>
        <p className="text-xs text-muted-foreground">Auto-forward is off. Funds stay in your Ordexa wallet until you withdraw.</p>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {wallets.map((w) => (
          <Card key={w.sym} className={cn('p-5', w.locked && 'opacity-70')}>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full font-mono text-xs font-bold text-background" style={{ background: w.color }}>
                {w.sym}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{w.coin}</p>
                <p className="text-xs text-muted-foreground">{w.tokens ?? 'Native'}</p>
              </div>
              {w.locked ? <Pill tone="primary">Business+</Pill> : null}
            </div>
            <p className="mt-5 font-mono text-xl text-foreground">
              {w.bal} <span className="text-sm text-muted-foreground">{w.sym}</span>
            </p>
            <p className="text-sm text-muted-foreground">{w.usd}</p>
            <div className="mt-4 flex gap-2">
              <Btn size="sm" variant="primary" disabled={w.locked}>
                <ArrowUpFromLine aria-hidden />
                Withdraw
              </Btn>
              <Btn size="sm" disabled={w.locked}>
                <ArrowDownToLine aria-hidden />
                Deposit gas
              </Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

const types = [
  { name: 'Serial Keys', desc: 'License keys delivered instantly', icon: KeyRound },
  { name: 'Accounts', desc: 'Email:password combos', icon: UserRound },
  { name: 'Discord Nitro', desc: 'Gift links with stock', icon: Zap },
  { name: 'Game Top-Up', desc: 'Player ID & region fields', icon: Gamepad2 },
  { name: 'Subscriptions', desc: 'Recurring monthly billing', icon: Repeat },
  { name: 'Cheats', desc: 'Loader file + license key', icon: Code },
  { name: 'Digital Downloads', desc: 'Files delivered after payment', icon: Download },
  { name: 'Service', desc: 'Manual fulfillment', icon: Wrench },
  { name: 'Dynamic Delivery', desc: 'Your webhook generates goods', icon: Sparkles },
  { name: 'Physical', desc: 'Shipped with zones & tracking', icon: Truck },
]

export function ProductTypes() {
  const [picked, setPicked] = useState('Serial Keys')
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {types.map((t) => {
          const Icon = t.icon
          const on = picked === t.name
          return (
            <button
              key={t.name}
              type="button"
              onClick={() => setPicked(t.name)}
              aria-pressed={on}
              className={cn(
                'flex flex-col items-start gap-3 rounded-xl border bg-card p-4 text-left transition-colors hover:border-primary/40',
                on && 'border-primary bg-primary/10',
              )}
            >
              <span className={cn('flex size-9 items-center justify-center rounded-lg', on ? 'bg-primary text-primary-foreground' : 'bg-accent text-foreground')}>
                <Icon className="size-4" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-medium text-foreground">{t.name}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{t.desc}</span>
              </span>
            </button>
          )
        })}
      </div>
      <div className="flex items-center justify-between rounded-xl border border-dashed p-4">
        <div className="flex items-center gap-3">
          <Package className="size-5 text-muted-foreground" aria-hidden />
          <p className="text-sm text-muted-foreground">Prefer a blank product? Start from scratch.</p>
        </div>
        <div className="flex gap-2">
          <Btn>Start from scratch</Btn>
          <Btn variant="primary">Continue with {picked}</Btn>
        </div>
      </div>
    </div>
  )
}

const presets = [
  { name: 'Default', bg: '#111118', card: '#1a1a24', accent: '#7c5cff' },
  { name: 'Soft', bg: '#f5f3ff', card: '#ffffff', accent: '#8b5cf6' },
  { name: 'Sharp', bg: '#0a0a0a', card: '#141414', accent: '#22c55e' },
  { name: 'Minimal', bg: '#ffffff', card: '#fafafa', accent: '#111111' },
  { name: 'Slate', bg: '#0f172a', card: '#1e293b', accent: '#38bdf8' },
  { name: 'Midnight', bg: '#050816', card: '#0d1330', accent: '#f472b6' },
]

export function PresetsView() {
  const [picked, setPicked] = useState('Default')
  const p = presets.find((x) => x.name === picked) ?? presets[0]
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_380px]">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <h3 className="text-sm font-medium text-foreground">Presets</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {presets.map((x) => (
              <button
                key={x.name}
                type="button"
                onClick={() => setPicked(x.name)}
                aria-pressed={picked === x.name}
                className={cn('rounded-xl border p-2 text-left', picked === x.name ? 'border-primary ring-1 ring-primary' : 'hover:border-primary/40')}
              >
                <div className="flex h-16 items-end gap-1.5 rounded-lg p-2" style={{ background: x.bg }}>
                  <div className="h-8 flex-1 rounded" style={{ background: x.card }} />
                  <div className="h-4 w-8 rounded" style={{ background: x.accent }} />
                </div>
                <p className="mt-2 text-xs font-medium text-foreground">{x.name}</p>
              </button>
            ))}
          </div>
        </Card>
        <Card className="flex flex-col gap-3 p-5">
          <h3 className="text-sm font-medium text-foreground">What checkout asks for</h3>
          {['Email address', 'Discord account', 'Terms of service checkbox', 'Coupon field', 'Newsletter opt-in'].map((f, i) => (
            <div key={f} className="flex items-center justify-between rounded-lg border bg-background/40 px-3 py-2.5">
              <span className="text-sm text-foreground">{f}</span>
              <Toggle on={i !== 1} label={f} />
            </div>
          ))}
        </Card>
      </div>
      <Card className="p-5">
        <div className="flex items-center gap-2">
          <Paintbrush className="size-4 text-muted-foreground" aria-hidden />
          <h3 className="text-sm font-medium text-foreground">Live preview</h3>
        </div>
        <div className="mt-4 rounded-xl p-4" style={{ background: p.bg }}>
          <div className="rounded-lg p-4" style={{ background: p.card }}>
            <p className="text-xs" style={{ color: p.accent }}>
              Nova Keys
            </p>
            <p className="mt-1 text-sm font-semibold" style={{ color: p.bg === '#ffffff' || p.bg === '#f5f3ff' ? '#111' : '#fff' }}>
              Windows 11 Pro Key
            </p>
            <div className="mt-4 h-8 rounded-md border border-white/10 bg-black/10" />
            <div className="mt-2 h-8 rounded-md border border-white/10 bg-black/10" />
            <div className="mt-4 flex h-9 items-center justify-center gap-2 rounded-md text-sm font-medium text-white" style={{ background: p.accent }}>
              <CreditCard className="size-4" aria-hidden />
              Pay $12.50
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

const themes = [
  { name: 'Nova (active)', from: 'from-primary/60', to: 'to-chart-4/40', tag: 'Active' },
  { name: 'Marble', from: 'from-zinc-200/70', to: 'to-zinc-500/40', tag: 'Premium' },
  { name: 'Neon Arcade', from: 'from-pink-500/50', to: 'to-cyan-400/40', tag: 'Premium' },
  { name: 'Classic', from: 'from-slate-600/60', to: 'to-slate-800/60', tag: 'Free' },
]

export function ThemesGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {themes.map((t) => (
        <Card key={t.name} className="overflow-hidden">
          <div className={cn('flex h-36 flex-col gap-2 bg-gradient-to-br p-4', t.from, t.to)}>
            <div className="h-3 w-16 rounded bg-white/40" />
            <div className="mt-auto grid grid-cols-3 gap-2">
              <div className="h-10 rounded bg-black/25" />
              <div className="h-10 rounded bg-black/25" />
              <div className="h-10 rounded bg-black/25" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 p-4">
            <div>
              <p className="text-sm font-medium text-foreground">{t.name}</p>
              <Pill tone={t.tag === 'Active' ? 'success' : t.tag === 'Premium' ? 'primary' : 'neutral'} className="mt-1">
                {t.tag}
              </Pill>
            </div>
            <div className="flex gap-1">
              <Btn size="sm">Visual</Btn>
              <Btn size="sm" variant="ghost" aria-label={`Code editor for ${t.name}`}>
                <Code />
              </Btn>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
