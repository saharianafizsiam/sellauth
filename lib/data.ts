function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = mulberry32(42)

const months = ['Oct', 'Nov']
export const series = Array.from({ length: 30 }, (_, i) => {
  const day = i + 7
  const label = day > 31 ? `${months[1]} ${day - 31}` : `${months[0]} ${day}`
  const trend = 1 + i / 40
  const revenue = Math.round((180 + rand() * 260) * trend)
  const orders = Math.round(revenue / (18 + rand() * 10))
  const visitors = Math.round((320 + rand() * 380) * trend)
  const pageviews = Math.round(visitors * (2.1 + rand() * 1.4))
  return { label, revenue, orders, visitors, pageviews, profit: Math.round(revenue * 0.82) }
})

export const sum = (k: keyof (typeof series)[number]) =>
  series.reduce((a, b) => a + (typeof b[k] === 'number' ? (b[k] as number) : 0), 0)

export const usd = (n: number, digits = 2) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: digits, maximumFractionDigits: digits }).format(n)

export const compact = (n: number) => new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n)

export const latestOrders = [
  { id: 'INV-8F2A91', product: 'Valorant Account — Diamond', email: 'kai.r@proton.me', method: 'Litecoin', time: '2m ago', amount: 24.99 },
  { id: 'INV-7C1B04', product: 'Windows 11 Pro Key', email: 'marta.l@gmail.com', method: 'Bitcoin', time: '14m ago', amount: 12.5 },
  { id: 'INV-6D9E33', product: 'Discord Nitro — 1 Month', email: 'zeno@outlook.com', method: 'Customer Balance', time: '38m ago', amount: 7.99 },
  { id: 'INV-5A0F72', product: 'Spotify Premium — 12 Months', email: 'ana.pires@gmail.com', method: 'Litecoin', time: '1h ago', amount: 19.0 },
  { id: 'INV-4B8C19', product: 'Fortnite V-Bucks 13,500', email: 'leo.ng@icloud.com', method: 'Bitcoin', time: '2h ago', amount: 64.0 },
  { id: 'INV-3E7D58', product: 'Netflix UHD — 3 Months', email: 'h.yamada@yahoo.co.jp', method: 'Litecoin', time: '3h ago', amount: 15.75 },
]

export const productPerformance = {
  best: [
    { name: 'Valorant Account — Diamond', sales: 142, revenue: 3548.58, change: 18.2 },
    { name: 'Windows 11 Pro Key', sales: 311, revenue: 3887.5, change: 9.4 },
    { name: 'Fortnite V-Bucks 13,500', sales: 41, revenue: 2624.0, change: 4.1 },
    { name: 'Spotify Premium — 12 Months', sales: 96, revenue: 1824.0, change: 2.7 },
  ],
  decliners: [
    { name: 'Netflix UHD — 3 Months', sales: 38, revenue: 598.5, change: -22.4 },
    { name: 'Office 2021 Pro Plus', sales: 27, revenue: 405.0, change: -14.8 },
    { name: 'Minecraft Java Account', sales: 19, revenue: 342.0, change: -9.1 },
    { name: 'Steam Wallet $20', sales: 12, revenue: 228.0, change: -5.6 },
  ],
  risers: [
    { name: 'Discord Nitro — 1 Month', sales: 184, revenue: 1470.16, change: 61.3 },
    { name: 'ChatGPT Plus — 1 Month', sales: 52, revenue: 936.0, change: 44.0 },
    { name: 'Rust Cheat — Lifetime', sales: 8, revenue: 1192.0, change: 38.5 },
    { name: 'YouTube Premium — 6 Months', sales: 33, revenue: 462.0, change: 21.9 },
  ],
}

export const topSpenders = [
  { email: 'leo.ng@icloud.com', orders: 18, spent: 1284.5 },
  { email: 'kai.r@proton.me', orders: 26, spent: 942.1 },
  { email: 'marta.l@gmail.com', orders: 11, spent: 611.0 },
  { email: 'd.osei@hey.com', orders: 9, spent: 488.75 },
  { email: 'zeno@outlook.com', orders: 14, spent: 352.9 },
]

export const methods = [
  { name: 'Litecoin', share: 48, amount: 6120.4, color: 'var(--chart-4)' },
  { name: 'Bitcoin', share: 34, amount: 4335.2, color: 'var(--chart-3)' },
  { name: 'Customer Balance', share: 18, amount: 2295.1, color: 'var(--chart-1)' },
]

export const traffic = {
  pages: [
    { label: '/', value: 18420 },
    { label: '/product/valorant-diamond', value: 6215 },
    { label: '/product/windows-11-pro', value: 4890 },
    { label: '/category/accounts', value: 3102 },
    { label: '/product/discord-nitro', value: 2744 },
    { label: '/feedback', value: 1210 },
  ],
  sources: [
    { label: 'Direct', value: 14820 },
    { label: 'discord.com', value: 9102 },
    { label: 'google.com', value: 5540 },
    { label: 'youtube.com', value: 2911 },
    { label: 'tiktok.com', value: 1744 },
    { label: 'x.com', value: 802 },
  ],
  browsers: [
    { label: 'Chrome', value: 21840 },
    { label: 'Safari', value: 6120 },
    { label: 'Edge', value: 2910 },
    { label: 'Firefox', value: 2140 },
    { label: 'Opera GX', value: 1611 },
    { label: 'Other', value: 298 },
  ],
  countries: [
    { label: 'United States', value: 11420, code: 'US' },
    { label: 'Germany', value: 4102, code: 'DE' },
    { label: 'United Kingdom', value: 3880, code: 'GB' },
    { label: 'Brazil', value: 3120, code: 'BR' },
    { label: 'France', value: 2210, code: 'FR' },
    { label: 'Netherlands', value: 1744, code: 'NL' },
  ],
}
