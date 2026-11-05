'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Info, MoreHorizontal, Plus, Search, Star } from 'lucide-react'
import { Btn, Card, Delta, PageHeader, Pill, Toggle } from '@/components/kit'
import { type Column, type PageConfig, type Row, statusTone } from '@/lib/pages'
import { cn } from '@/lib/utils'
import { MethodsGrid, PlansGrid, PresetsView, ProductTypes, ThemesGrid, WalletsGrid } from './special-views'

export function ResourcePage({ config }: { config: PageConfig }) {
  const [tab, setTab] = useState(config.tabs?.[0])

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={config.title} subtitle={config.subtitle} badge={config.badge}>
        {config.actions?.map((a) => (
          <Btn key={a}>{a}</Btn>
        ))}
        {config.primary ? (
          <Btn variant="primary">
            <Plus aria-hidden />
            {config.primary}
          </Btn>
        ) : null}
      </PageHeader>

      {config.notice ? (
        <div className="flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/8 px-4 py-3 text-sm text-foreground">
          <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
          <p className="text-pretty">{config.notice}</p>
        </div>
      ) : null}

      {config.stats ? (
        <div className={cn('grid gap-3 sm:grid-cols-2', config.stats.length >= 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-3')}>
          {config.stats.map((s) => (
            <Card key={s.label} className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums text-foreground">{s.value}</p>
              <div className="mt-1 flex items-center gap-2">
                {typeof s.delta === 'number' ? <Delta value={s.delta} /> : null}
                {s.hint ? <span className="text-xs text-muted-foreground">{s.hint}</span> : null}
              </div>
            </Card>
          ))}
        </div>
      ) : null}

      {config.tabs ? (
        <div role="tablist" aria-label={`${config.title} sections`} className="flex gap-1 overflow-x-auto border-b">
          {config.tabs.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                '-mb-px border-b-2 px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors',
                tab === t ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
                t === 'Delete Shop' || t === 'Delete account' ? 'text-destructive/80' : '',
              )}
            >
              {t}
            </button>
          ))}
        </div>
      ) : null}

      {config.kind === 'plans' && <PlansGrid />}
      {config.kind === 'methods' && <MethodsGrid />}
      {config.kind === 'wallets' && <WalletsGrid />}
      {config.kind === 'types' && <ProductTypes />}
      {config.kind === 'presets' && <PresetsView />}
      {config.kind === 'themes' && <ThemesGrid />}
      {config.kind === 'form' && config.form ? <FormView sections={config.form} /> : null}
      {config.table ? <DataTable {...config.table} /> : null}
    </div>
  )
}

function Cell({ col, value }: { col: Column; value: Row[string] }) {
  switch (col.type) {
    case 'strong':
      return <span className="block max-w-[320px] truncate font-medium text-foreground">{String(value)}</span>
    case 'money':
      return <span className="font-medium tabular-nums text-foreground">{String(value)}</span>
    case 'muted':
      return <span className="text-muted-foreground">{String(value)}</span>
    case 'mono':
      return <span className="font-mono text-xs text-foreground">{String(value)}</span>
    case 'status':
      return <Pill tone={statusTone[String(value)] ?? 'neutral'}>{String(value)}</Pill>
    case 'toggle':
      return <Toggle on={Boolean(value)} label={col.label} />
    case 'rating':
      return (
        <span className="flex gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={cn('size-3.5', i < Number(value) ? 'fill-warning text-warning' : 'text-muted')} aria-hidden />
          ))}
        </span>
      )
    default:
      return <span className="text-foreground tabular-nums">{String(value)}</span>
  }
}

function DataTable({ columns, rows, searchable }: { columns: Column[]; rows: Row[]; searchable?: string }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const q = query.toLowerCase()
  const filtered = rows
    .map((r, i) => ({ r, i }))
    .filter(({ r }) => !q || Object.values(r).some((v) => String(v).toLowerCase().includes(q)))
  const allSelected = filtered.length > 0 && filtered.every(({ i }) => selected.has(i))

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b px-4 py-3">
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <input
            id="table-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${searchable ?? ''}...`}
            className="h-8 w-full rounded-lg border bg-background/60 pr-3 pl-8 text-sm placeholder:text-muted-foreground focus:outline-2 focus:outline-ring"
          />
        </div>
        {selected.size > 0 ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{selected.size} selected</span>
            <Btn size="sm">Bulk edit</Btn>
            <Btn size="sm" variant="danger">
              Delete
            </Btn>
          </div>
        ) : null}
        <span className="ml-auto text-xs text-muted-foreground">{filtered.length} results</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 text-left text-xs text-muted-foreground">
              <th className="w-10 px-4 py-2.5">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={allSelected}
                  onChange={() => setSelected(allSelected ? new Set() : new Set(filtered.map(({ i }) => i)))}
                  className="size-3.5 accent-[var(--primary)]"
                />
              </th>
              {columns.map((c) => (
                <th key={c.key} className={cn('px-3 py-2.5 font-medium whitespace-nowrap', c.align === 'right' && 'text-right')}>
                  {c.label}
                </th>
              ))}
              <th className="w-10 px-3 py-2.5">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(({ r, i }) => (
              <tr key={i} className={cn('border-t hover:bg-accent/40', selected.has(i) && 'bg-primary/6')}>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    aria-label={`Select row ${i + 1}`}
                    checked={selected.has(i)}
                    onChange={() =>
                      setSelected((s) => {
                        const n = new Set(s)
                        if (n.has(i)) n.delete(i)
                        else n.add(i)
                        return n
                      })
                    }
                    className="size-3.5 accent-[var(--primary)]"
                  />
                </td>
                {columns.map((c) => (
                  <td key={c.key} className={cn('px-3 py-3 whitespace-nowrap', c.align === 'right' && 'text-right')}>
                    <Cell col={c} value={r[c.key]} />
                  </td>
                ))}
                <td className="px-3 py-3">
                  <button type="button" className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Row actions">
                    <MoreHorizontal className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="px-4 py-12 text-center text-sm text-muted-foreground">
                  No results match &quot;{query}&quot;.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t px-4 py-3 text-xs text-muted-foreground">
        <span>Page 1 of 1</span>
        <div className="flex gap-1">
          <Btn size="sm" variant="ghost" aria-label="Previous page" disabled>
            <ChevronLeft />
          </Btn>
          <Btn size="sm" variant="ghost" aria-label="Next page" disabled>
            <ChevronRight />
          </Btn>
        </div>
      </div>
    </Card>
  )
}

function FormView({ sections }: { sections: NonNullable<PageConfig['form']> }) {
  return (
    <div className="flex flex-col gap-4">
      {sections.map((s) => (
        <Card key={s.title} className="grid gap-6 p-5 md:grid-cols-[220px_1fr]">
          <div>
            <h3 className="text-sm font-medium text-foreground">{s.title}</h3>
          </div>
          <div className="flex flex-col gap-4">
            {s.fields.map((f) => {
              const id = `${s.title}-${f.label}`.replace(/\W+/g, '-').toLowerCase()
              return f.type === 'toggle' ? (
                <div key={f.label} className="flex items-center justify-between gap-4 rounded-lg border bg-background/40 px-3 py-2.5">
                  <span className="text-sm text-foreground">{f.label}</span>
                  <Toggle on={f.value === 'on'} label={f.label} />
                </div>
              ) : (
                <div key={f.label} className="flex flex-col gap-1.5">
                  <label htmlFor={id} className="text-xs font-medium text-muted-foreground">
                    {f.label}
                  </label>
                  {f.type === 'textarea' ? (
                    <textarea
                      id={id}
                      defaultValue={f.value}
                      rows={3}
                      className="rounded-lg border bg-background/60 px-3 py-2 font-mono text-xs text-foreground focus:outline-2 focus:outline-ring"
                    />
                  ) : (
                    <input
                      id={id}
                      defaultValue={f.value}
                      className="h-9 rounded-lg border bg-background/60 px-3 text-sm text-foreground focus:outline-2 focus:outline-ring"
                    />
                  )}
                  {f.hint ? <p className="text-xs text-muted-foreground">{f.hint}</p> : null}
                </div>
              )
            })}
          </div>
        </Card>
      ))}
      <div className="flex justify-end gap-2">
        <Btn>Discard</Btn>
        <Btn variant="primary">Save changes</Btn>
      </div>
    </div>
  )
}
