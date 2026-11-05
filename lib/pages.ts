export type ColType = 'text' | 'strong' | 'money' | 'status' | 'muted' | 'mono' | 'toggle' | 'rating'
export type Column = { key: string; label: string; type?: ColType; align?: 'right' }
export type Row = Record<string, string | number | boolean>
export type Stat = { label: string; value: string; delta?: number; hint?: string }

export type PageConfig = {
  title: string
  subtitle: string
  badge?: string
  actions?: string[]
  primary?: string
  stats?: Stat[]
  tabs?: string[]
  notice?: string
  table?: { columns: Column[]; rows: Row[]; searchable?: string }
  kind?: 'plans' | 'methods' | 'wallets' | 'types' | 'form' | 'presets' | 'themes'
  form?: { title: string; fields: { label: string; value: string; hint?: string; type?: 'toggle' | 'select' | 'textarea' }[] }[]
}

export const statusTone: Record<string, 'success' | 'warning' | 'danger' | 'primary' | 'neutral'> = {
  Completed: 'success', Paid: 'success', Active: 'success', Public: 'success', Delivered: 'success', Open: 'warning', Resolved: 'success', Won: 'success',
  Approved: 'success', Allowed: 'success', Sent: 'success', Published: 'success', Connected: 'success', '200': 'success', Enabled: 'success', Verified: 'success',
  Pending: 'warning', Underpaid: 'warning', Unlisted: 'warning', 'Awaiting review': 'warning', 'Needs response': 'warning', Draft: 'warning', Trial: 'warning', Processing: 'warning', Scheduled: 'warning',
  Expired: 'danger', Cancelled: 'danger', Lost: 'danger', Blocked: 'danger', Private: 'danger', 'Out of stock': 'danger', Failed: 'danger', '500': 'danger', Refunded: 'danger', 'Delivery issue': 'danger', 'At risk': 'danger',
  'On Hold': 'neutral', Inactive: 'neutral', Closed: 'neutral', Ghost: 'neutral', Dropped: 'warning', Disabled: 'neutral', Unused: 'neutral',
  'In use': 'primary', Reseller: 'primary', Admin: 'primary', Owner: 'primary', Recovered: 'success',
}

const emails = ['kai.r@proton.me', 'marta.l@gmail.com', 'zeno@outlook.com', 'ana.pires@gmail.com', 'leo.ng@icloud.com', 'h.yamada@yahoo.co.jp', 'd.osei@hey.com', 'sam.k@mail.com']
const products = ['Valorant Account — Diamond', 'Windows 11 Pro Key', 'Discord Nitro — 1 Month', 'Spotify Premium — 12 Months', 'Fortnite V-Bucks 13,500', 'Netflix UHD — 3 Months', 'ChatGPT Plus — 1 Month', 'Rust Cheat — Lifetime']

export const pages: Record<string, PageConfig> = {
  products: {
    title: 'Products', subtitle: 'Everything you sell. Drag to reorder how they appear on your storefront.',
    actions: ['Take a tour', 'Embed Products', 'Reorder', 'Bulk Edit'], primary: 'Create Product',
    stats: [{ label: 'Total products', value: '18', hint: 'of 20 on Free' }, { label: 'Active', value: '15' }, { label: 'Out of stock', value: '2' }, { label: 'Sales (30d)', value: '1,042', delta: 8.1 }],
    table: {
      searchable: 'products',
      columns: [{ key: 'name', label: 'Name', type: 'strong' }, { key: 'price', label: 'Price', type: 'muted' }, { key: 'stock', label: 'Stock' }, { key: 'visibility', label: 'Visibility', type: 'status' }, { key: 'sales', label: 'Sales', align: 'right' }],
      rows: products.map((p, i) => ({ name: p, price: ['$19.99 – $34.99', '$12.50', '$7.99', '$19.00', '$16.00 – $64.00', '$15.75', '$18.00', '$49.00 – $149.00'][i], stock: [42, 311, 0, 88, '∞', 14, 0, '∞'][i], visibility: ['Public', 'Public', 'Out of stock', 'Public', 'Public', 'Unlisted', 'Out of stock', 'Private'][i], sales: [142, 311, 184, 96, 41, 38, 52, 8][i] })),
    },
  },
  'products/create': {
    title: 'Create Product', subtitle: 'Pick a template to pre-configure delivery, checkout and storefront settings.', kind: 'types',
  },
  addons: {
    title: 'Addons', subtitle: 'Upsells shown on product pages. Addons never appear in your main catalog.', primary: 'Create Addon',
    table: { columns: [{ key: 'name', label: 'Addon', type: 'strong' }, { key: 'price', label: 'Price', type: 'money' }, { key: 'attached', label: 'Attached to' }, { key: 'status', label: 'Status', type: 'status' }], rows: [
      { name: 'Instant Warranty (7 days)', price: '$2.99', attached: '6 products', status: 'Active' }, { name: 'Full Email Access', price: '$4.99', attached: '2 products', status: 'Active' }, { name: 'Priority Delivery', price: '$1.50', attached: '12 products', status: 'Active' }, { name: 'Setup Guide PDF', price: '$0.99', attached: '3 products', status: 'Inactive' },
    ] },
  },
  groups: {
    title: 'Groups', subtitle: 'Curated multi-product cards that bundle related items on your storefront.', actions: ['Reorder'], primary: 'Create Group',
    table: { columns: [{ key: 'name', label: 'Group', type: 'strong' }, { key: 'products', label: 'Products' }, { key: 'visibility', label: 'Visibility', type: 'status' }, { key: 'views', label: 'Views', align: 'right' }], rows: [
      { name: 'Streaming Bundle', products: 4, visibility: 'Public', views: '12.4k' }, { name: 'Gaming Accounts', products: 6, visibility: 'Public', views: '9.1k' }, { name: 'Software Keys', products: 5, visibility: 'Public', views: '6.2k' }, { name: 'Seasonal Drop', products: 3, visibility: 'Unlisted', views: '820' },
    ] },
  },
  categories: {
    title: 'Categories', subtitle: 'Organize products into up to 4 nested levels. Drag rows to reorder.', primary: 'Create Category',
    table: { columns: [{ key: 'name', label: 'Category', type: 'strong' }, { key: 'parent', label: 'Parent', type: 'muted' }, { key: 'level', label: 'Level' }, { key: 'products', label: 'Products', align: 'right' }], rows: [
      { name: 'Accounts', parent: '—', level: 1, products: 9 }, { name: 'Gaming', parent: 'Accounts', level: 2, products: 5 }, { name: 'Streaming', parent: 'Accounts', level: 2, products: 4 }, { name: 'Software', parent: '—', level: 1, products: 6 }, { name: 'Operating Systems', parent: 'Software', level: 2, products: 2 }, { name: 'Top-Ups', parent: '—', level: 1, products: 3 },
    ] },
  },
  'downloadable-files': {
    title: 'Downloadable Files', subtitle: 'Upload .zip, .rar, .7z, .tar or .gz archives and attach them to products.', primary: 'Upload File',
    stats: [{ label: 'Files', value: '7' }, { label: 'Storage used', value: '412 MB', hint: 'of 1 GB' }, { label: 'Downloads (30d)', value: '1,208', delta: 11.2 }],
    table: { columns: [{ key: 'name', label: 'File', type: 'mono' }, { key: 'size', label: 'Size', type: 'muted' }, { key: 'products', label: 'Attached to' }, { key: 'uploaded', label: 'Uploaded', type: 'muted' }], rows: [
      { name: 'rust-loader-v4.2.zip', size: '84.1 MB', products: 'Rust Cheat — Lifetime', uploaded: 'Nov 2, 2026' }, { name: 'setup-guide.7z', size: '2.4 MB', products: '3 products', uploaded: 'Oct 28, 2026' }, { name: 'preset-pack-2026.rar', size: '211 MB', products: 'Lightroom Presets', uploaded: 'Oct 19, 2026' },
    ] },
  },
  'shipping-zones': {
    title: 'Shipping Zones', subtitle: 'Required for physical products. Set flat rates and free-shipping thresholds per region.', primary: 'Create Zone',
    table: { columns: [{ key: 'name', label: 'Zone', type: 'strong' }, { key: 'countries', label: 'Countries', type: 'muted' }, { key: 'rate', label: 'Flat rate', type: 'money' }, { key: 'free', label: 'Free over', type: 'money' }], rows: [
      { name: 'North America', countries: 'US, CA, MX', rate: '$6.00', free: '$75.00' }, { name: 'Europe', countries: '27 countries', rate: '$9.50', free: '$100.00' }, { name: 'Rest of world', countries: 'All others', rate: '$18.00', free: '—' },
    ] },
  },
  invoices: {
    title: 'Invoices', subtitle: 'Every order placed on your shop. Open one to deliver, replace, refund, add notes or ship.', actions: ['Refresh', 'Export', 'Filters'],
    stats: [{ label: 'Awaiting review', value: '4', hint: 'manual payments' }, { label: 'Underpaid', value: '2', hint: 'crypto under amount' }, { label: 'Late payments', value: '1' }, { label: 'Delivery issues', value: '0', hint: 'all clear' }],
    tabs: ['All', 'Completed', 'Pending', 'Awaiting review', 'Refunded'],
    table: { searchable: 'invoice ID or email', columns: [{ key: 'id', label: 'Invoice', type: 'mono' }, { key: 'product', label: 'Product', type: 'strong' }, { key: 'email', label: 'Customer', type: 'muted' }, { key: 'method', label: 'Method' }, { key: 'status', label: 'Status', type: 'status' }, { key: 'amount', label: 'Amount', type: 'money', align: 'right' }],
      rows: emails.map((e, i) => ({ id: `INV-${(0x8f2a91 - i * 70321).toString(16).toUpperCase()}`, product: products[i], email: e, method: ['Litecoin', 'Bitcoin', 'Customer Balance', 'Litecoin', 'Bitcoin', 'Litecoin', 'Bitcoin', 'Litecoin'][i], status: ['Completed', 'Completed', 'Pending', 'Awaiting review', 'Underpaid', 'Completed', 'Refunded', 'Completed'][i], amount: ['$24.99', '$12.50', '$7.99', '$19.00', '$64.00', '$15.75', '$18.00', '$149.00'][i] })) },
  },
  subscriptions: {
    title: 'Subscriptions', subtitle: 'Recurring billing with automatic renewal invoices via Stripe, PayPal or SumUp.', badge: 'Business+',
    stats: [{ label: 'Active', value: '86', delta: 6.4 }, { label: 'MRR', value: '$1,548.00', delta: 9.1 }, { label: 'Churn', value: '3.2%', delta: -0.8 }, { label: 'Renewals this week', value: '21' }],
    table: { columns: [{ key: 'email', label: 'Customer', type: 'strong' }, { key: 'product', label: 'Plan' }, { key: 'status', label: 'Status', type: 'status' }, { key: 'next', label: 'Next renewal', type: 'muted' }, { key: 'amount', label: 'Amount', type: 'money', align: 'right' }],
      rows: emails.slice(0, 5).map((e, i) => ({ email: e, product: ['ChatGPT Plus — Monthly', 'Spotify Premium — Monthly', 'Rust Cheat — Monthly', 'Discord Nitro — Monthly', 'ChatGPT Plus — Monthly'][i], status: ['Active', 'Active', 'Trial', 'Cancelled', 'Active'][i], next: ['Nov 12', 'Nov 14', 'Nov 9', '—', 'Nov 30'][i], amount: ['$18.00', '$4.99', '$29.00', '$7.99', '$18.00'][i] })) },
  },
  'abandoned-checkouts': {
    title: 'Abandoned Checkouts', subtitle: 'Customers who started checkout but never paid. Recover them with emails and coupons.', primary: 'Automate Recovery',
    stats: [{ label: 'Total', value: '$1,284.60', hint: '37 checkouts' }, { label: 'Ghost', value: '14', hint: 'no email entered' }, { label: 'Dropped', value: '23', hint: 'email captured' }, { label: 'Auto-sent', value: '18', hint: '6 recovered' }],
    table: { columns: [{ key: 'email', label: 'Customer', type: 'strong' }, { key: 'product', label: 'Cart' }, { key: 'status', label: 'Status', type: 'status' }, { key: 'time', label: 'Abandoned', type: 'muted' }, { key: 'amount', label: 'Value', type: 'money', align: 'right' }],
      rows: emails.slice(0, 6).map((e, i) => ({ email: i === 2 ? 'Anonymous' : e, product: products[i], status: ['Dropped', 'Recovered', 'Ghost', 'Sent', 'Dropped', 'Sent'][i], time: ['12m ago', '1h ago', '2h ago', '5h ago', 'Yesterday', 'Yesterday'][i], amount: ['$24.99', '$12.50', '$7.99', '$19.00', '$64.00', '$15.75'][i] })) },
  },
  disputes: {
    title: 'Disputes', subtitle: 'Chargebacks automatically matched to invoices, with evidence and automations.', badge: 'Beta', actions: ['Automations'],
    stats: [{ label: 'Needs response', value: '2' }, { label: 'At risk', value: '$88.99' }, { label: 'Lost (90d)', value: '1' }, { label: 'Dispute rate', value: '0.31%', delta: -0.12, hint: 'healthy' }],
    table: { columns: [{ key: 'id', label: 'Invoice', type: 'mono' }, { key: 'reason', label: 'Reason' }, { key: 'status', label: 'Status', type: 'status' }, { key: 'due', label: 'Respond by', type: 'muted' }, { key: 'amount', label: 'Amount', type: 'money', align: 'right' }], rows: [
      { id: 'INV-41AC09', reason: 'Product not received', status: 'Needs response', due: 'Nov 9', amount: '$64.00' }, { id: 'INV-39F2B1', reason: 'Fraudulent', status: 'Needs response', due: 'Nov 11', amount: '$24.99' }, { id: 'INV-2D88E4', reason: 'Duplicate', status: 'Won', due: '—', amount: '$12.50' }, { id: 'INV-1B07C3', reason: 'Fraudulent', status: 'Lost', due: '—', amount: '$19.00' },
    ] },
  },
  customers: {
    title: 'Customers', subtitle: 'Everyone who bought from you, with balances, cashback and newsletter status.', actions: ['Cashback Settings', 'Refresh', 'Export', 'Filters'],
    stats: [{ label: 'Customers', value: '2,418', delta: 5.6 }, { label: 'Returning', value: '38%' }, { label: 'Newsletter', value: '1,842' }, { label: 'Balances held', value: '$412.30' }],
    table: { searchable: 'customers', columns: [{ key: 'email', label: 'Customer', type: 'strong' }, { key: 'spent', label: 'Spent', type: 'money' }, { key: 'orders', label: 'Orders' }, { key: 'balance', label: 'Balance', type: 'money' }, { key: 'last', label: 'Last order', type: 'muted' }, { key: 'news', label: 'Newsletter', type: 'toggle' }],
      rows: emails.map((e, i) => ({ email: e, spent: ['$942.10', '$611.00', '$352.90', '$218.40', '$1,284.50', '$96.00', '$488.75', '$44.00'][i], orders: [26, 11, 14, 7, 18, 4, 9, 2][i], balance: ['$12.00', '$0.00', '$4.50', '$0.00', '$31.20', '$0.00', '$8.75', '$0.00'][i], last: ['2m ago', '14m ago', '38m ago', '1h ago', '2h ago', '3d ago', '1w ago', '2w ago'][i], news: i % 3 !== 2 })) },
  },
  resellers: {
    title: 'Resellers', subtitle: 'Approve resellers, assign tiers and prepaid balances, and choose which products they can resell.', badge: 'Business+', actions: ['Applications'], primary: 'Add Reseller',
    table: { columns: [{ key: 'email', label: 'Reseller', type: 'strong' }, { key: 'tier', label: 'Tier', type: 'status' }, { key: 'balance', label: 'Prepaid balance', type: 'money' }, { key: 'products', label: 'Products' }, { key: 'status', label: 'Status', type: 'status' }], rows: [
      { email: 'keys.depot@proton.me', tier: 'Reseller', balance: '$1,200.00', products: 8, status: 'Approved' }, { email: 'gamevault@gmail.com', tier: 'Reseller', balance: '$340.00', products: 3, status: 'Approved' }, { email: 'cheapsubs@outlook.com', tier: 'Reseller', balance: '$0.00', products: 0, status: 'Pending' },
    ] },
  },
  affiliates: {
    title: 'Affiliates', subtitle: 'Let customers earn commission for every sale they refer.', actions: ['Settings', 'Invite'], tabs: ['Overview', 'Affiliates', 'Tiers', 'Payouts'],
    stats: [{ label: 'Affiliates', value: '64' }, { label: 'Referred revenue', value: '$3,912.40', delta: 15.3 }, { label: 'Commission owed', value: '$391.24' }, { label: 'Avg. commission', value: '10%' }],
    table: { columns: [{ key: 'email', label: 'Affiliate', type: 'strong' }, { key: 'code', label: 'Code', type: 'mono' }, { key: 'clicks', label: 'Clicks' }, { key: 'sales', label: 'Sales' }, { key: 'earned', label: 'Earned', type: 'money', align: 'right' }], rows: [
      { email: 'streamer.jay@gmail.com', code: 'JAY10', clicks: 4820, sales: 112, earned: '$248.60' }, { email: 'kai.r@proton.me', code: 'KAI', clicks: 1210, sales: 31, earned: '$62.10' }, { email: 'reviewhub@outlook.com', code: 'RHUB', clicks: 980, sales: 18, earned: '$40.20' },
    ] },
  },
  feedbacks: {
    title: 'Feedbacks', subtitle: 'Customer reviews shown on your storefront. Reply publicly or dispute unfair ones.', actions: ['Delete Automatic', 'Settings', 'Export'],
    stats: [{ label: 'Average rating', value: '4.86 / 5' }, { label: '5 stars', value: '91%' }, { label: 'Total', value: '1,124', delta: 7.2 }, { label: 'Unreplied', value: '12' }],
    table: { columns: [{ key: 'rating', label: 'Rating', type: 'rating' }, { key: 'message', label: 'Feedback', type: 'strong' }, { key: 'product', label: 'Product', type: 'muted' }, { key: 'time', label: 'Date', type: 'muted' }], rows: [
      { rating: 5, message: 'Instant delivery, key worked first try. Legit seller.', product: 'Windows 11 Pro Key', time: '1h ago' }, { rating: 5, message: 'Account had everything listed. Thanks!', product: 'Valorant Account — Diamond', time: '3h ago' }, { rating: 4, message: 'Took 10 min but support was quick.', product: 'Discord Nitro — 1 Month', time: 'Yesterday' }, { rating: 2, message: 'Wrong region, waiting on replacement.', product: 'Netflix UHD — 3 Months', time: '2d ago' },
    ] },
  },
  tickets: {
    title: 'Tickets', subtitle: 'Support threads linked to invoices and customers.', actions: ['Ticket Settings'],
    stats: [{ label: 'Total', value: '312' }, { label: 'Open', value: '2' }, { label: 'Pending', value: '5' }, { label: 'Avg. resolution', value: '1h 42m', delta: -12.0 }],
    table: { columns: [{ key: 'subject', label: 'Subject', type: 'strong' }, { key: 'email', label: 'Customer', type: 'muted' }, { key: 'invoice', label: 'Invoice', type: 'mono' }, { key: 'status', label: 'Status', type: 'status' }, { key: 'time', label: 'Updated', type: 'muted' }], rows: [
      { subject: 'Key says already redeemed', email: 'marta.l@gmail.com', invoice: 'INV-7C1B04', status: 'Open', time: '6m ago' }, { subject: 'Wrong region Netflix', email: 'h.yamada@yahoo.co.jp', invoice: 'INV-3E7D58', status: 'Open', time: '2h ago' }, { subject: 'Need invoice for company', email: 'd.osei@hey.com', invoice: 'INV-2A11F0', status: 'Pending', time: 'Yesterday' }, { subject: 'Thanks!', email: 'kai.r@proton.me', invoice: 'INV-8F2A91', status: 'Closed', time: '2d ago' },
    ] },
  },
  coupons: {
    title: 'Coupons', subtitle: 'Percentage or fixed discounts with usage limits, expiry and product scope.', actions: ['Delete Expired', 'Filters'], primary: 'Create Coupon',
    stats: [{ label: 'Active coupons', value: '9' }, { label: 'Redemptions (30d)', value: '284', delta: 22.1 }, { label: 'Revenue with coupons', value: '$3,104.80' }, { label: 'Discount given', value: '$412.60' }],
    table: { columns: [{ key: 'code', label: 'Code', type: 'mono' }, { key: 'discount', label: 'Discount', type: 'strong' }, { key: 'uses', label: 'Uses' }, { key: 'scope', label: 'Products', type: 'muted' }, { key: 'expires', label: 'Expires', type: 'muted' }, { key: 'status', label: 'Status', type: 'status' }], rows: [
      { code: 'WELCOME10', discount: '10%', uses: '148 / ∞', scope: 'All products', expires: 'Never', status: 'Active' }, { code: 'BLACKFRIDAY', discount: '25%', uses: '0 / 500', scope: 'All products', expires: 'Nov 30', status: 'Scheduled' }, { code: 'NITRO2', discount: '$2.00', uses: '61 / 100', scope: 'Discord Nitro', expires: 'Dec 15', status: 'Active' }, { code: 'HALLOWEEN', discount: '20%', uses: '75 / 200', scope: 'All products', expires: 'Oct 31', status: 'Expired' },
    ] },
  },
  'quantity-deals': {
    title: 'Quantity Deals', subtitle: 'Automatic buy-X-get-Y discounts applied at checkout. No code needed.', primary: 'Create Deal',
    table: { columns: [{ key: 'name', label: 'Deal', type: 'strong' }, { key: 'rule', label: 'Rule' }, { key: 'product', label: 'Product', type: 'muted' }, { key: 'status', label: 'Status', type: 'status' }], rows: [
      { name: 'Key bulk pack', rule: 'Buy 3, get 1 free', product: 'Windows 11 Pro Key', status: 'Active' }, { name: 'Nitro stack', rule: 'Buy 5, 15% off', product: 'Discord Nitro — 1 Month', status: 'Active' },
    ] },
  },
  'bundle-offers': {
    title: 'Bundle Offers', subtitle: 'Discount specific product combinations when they are in the cart together.', primary: 'Create Bundle',
    table: { columns: [{ key: 'name', label: 'Bundle', type: 'strong' }, { key: 'items', label: 'Products' }, { key: 'discount', label: 'Discount' }, { key: 'status', label: 'Status', type: 'status' }], rows: [
      { name: 'Streaming trio', items: 'Netflix + Spotify + YouTube', discount: '15%', status: 'Active' }, { name: 'Office setup', items: 'Windows 11 + Office 2021', discount: '$5.00', status: 'Draft' },
    ] },
  },
  'email-marketing': {
    title: 'Email Marketing', subtitle: 'Campaigns, lists, automations and templates — separate from transactional emails.', badge: 'Business+', tabs: ['Campaigns', 'Lists', 'Automations', 'Templates'], primary: 'New Campaign',
    stats: [{ label: 'Subscribers', value: '1,842', delta: 4.2 }, { label: 'Open rate', value: '41.8%' }, { label: 'Click rate', value: '6.3%' }, { label: 'Attributed revenue', value: '$2,210.00' }],
    table: { columns: [{ key: 'name', label: 'Campaign', type: 'strong' }, { key: 'list', label: 'List', type: 'muted' }, { key: 'status', label: 'Status', type: 'status' }, { key: 'opens', label: 'Opens' }, { key: 'revenue', label: 'Revenue', type: 'money', align: 'right' }], rows: [
      { name: 'Black Friday early access', list: 'All subscribers', status: 'Scheduled', opens: '—', revenue: '—' }, { name: 'October restock', list: 'Gaming buyers', status: 'Sent', opens: '44.1%', revenue: '$1,120.00' }, { name: 'Win-back 60d', list: 'Inactive', status: 'Sent', opens: '28.9%', revenue: '$420.00' },
    ] },
  },
  'blog-posts': {
    title: 'Blog', subtitle: 'Publish posts on your storefront, with an AI writer to draft them for you.', badge: 'Business+', actions: ['AI Writer'], primary: 'New Post',
    table: { columns: [{ key: 'title', label: 'Title', type: 'strong' }, { key: 'status', label: 'Status', type: 'status' }, { key: 'views', label: 'Views' }, { key: 'date', label: 'Date', type: 'muted' }], rows: [
      { title: 'How to redeem a Windows key in 60 seconds', status: 'Published', views: '3,412', date: 'Oct 22' }, { title: 'Is buying game accounts safe?', status: 'Published', views: '1,980', date: 'Oct 9' }, { title: 'Black Friday 2026 deals', status: 'Draft', views: '—', date: '—' },
    ] },
  },
  'wallets/crypto': { title: 'Crypto Wallets', subtitle: 'Balances received through crypto checkout. Withdraw anytime or auto-forward to your wallet.', actions: ['Deposit gas'], primary: 'Withdraw', kind: 'wallets' },
  shop: {
    title: 'Configure Shop', subtitle: 'Your shop identity, SEO, socials, taxes, languages and integrations.', kind: 'form',
    tabs: ['Identity', 'SEO & Sharing', 'Socials', 'Invoices & Tax', 'Languages', 'Integrations', 'Discord', 'Miscellaneous', 'Delete Shop'],
    form: [
      { title: 'Identity', fields: [{ label: 'Shop name', value: 'Nova Keys' }, { label: 'Subdomain', value: 'novakeys.ordexa.shop' }, { label: 'Currency', value: 'USD — US Dollar', type: 'select' }, { label: 'Description', value: 'Instant digital keys, accounts and top-ups. 24/7 automatic delivery.', type: 'textarea' }] },
      { title: 'Branding', fields: [{ label: 'Logo', value: 'nova-logo.png', hint: 'PNG or SVG, 512x512' }, { label: 'Favicon', value: 'favicon.ico' }, { label: 'Background', value: 'Gradient — Midnight', type: 'select' }, { label: 'Show live sales popups', value: 'on', type: 'toggle' }] },
    ],
  },
  'shop/checkout': { title: 'Checkout', subtitle: 'Choose a preset, set brand colors and decide what checkout asks for.', kind: 'presets', primary: 'Save changes' },
  theme: { title: 'Themes', subtitle: 'Customize your storefront with the visual or code editor.', primary: 'Create Theme', tabs: ['My themes', 'Premium'], kind: 'themes' },
  'shop/legal': {
    title: 'Legal & Privacy', subtitle: 'Legal pages shown in your storefront footer, plus cookie banner and per-page SEO.',
    table: { columns: [{ key: 'page', label: 'Page', type: 'strong' }, { key: 'url', label: 'URL', type: 'mono' }, { key: 'updated', label: 'Updated', type: 'muted' }, { key: 'status', label: 'Status', type: 'status' }], rows: [
      { page: 'Terms of Service', url: '/terms', updated: 'Oct 2', status: 'Published' }, { page: 'Privacy Policy', url: '/privacy', updated: 'Oct 2', status: 'Published' }, { page: 'Refund Policy', url: '/refund', updated: 'Sep 14', status: 'Published' }, { page: 'Shipping Policy', url: '/shipping', updated: '—', status: 'Draft' }, { page: 'Cookie Policy', url: '/cookies', updated: 'Sep 14', status: 'Published' }, { page: 'Legal Notice', url: '/legal', updated: '—', status: 'Draft' }, { page: 'Right of Withdrawal', url: '/withdrawal', updated: '—', status: 'Draft' },
    ] },
  },
  'email/templates': {
    title: 'Email Settings', subtitle: 'Transactional email templates and your sending server.', actions: ['SMTP settings'],
    table: { columns: [{ key: 'name', label: 'Template', type: 'strong' }, { key: 'trigger', label: 'Sent when', type: 'muted' }, { key: 'status', label: 'Status', type: 'status' }], rows: [
      { name: 'Base layout', trigger: 'Wraps every email', status: 'Active' }, { name: 'Invoice Created', trigger: 'Checkout started', status: 'Active' }, { name: 'Invoice Processed', trigger: 'Payment confirmed', status: 'Active' }, { name: 'Invoice Delivered', trigger: 'Goods delivered', status: 'Active' }, { name: 'Invoice Replacement', trigger: 'Replacement issued', status: 'Active' }, { name: 'Invoice Shipped', trigger: 'Physical order shipped', status: 'Disabled' }, { name: 'Service Started', trigger: 'Service order begins', status: 'Active' }, { name: 'Service Completed', trigger: 'Service marked done', status: 'Active' },
    ] },
  },
  images: {
    title: 'Images', subtitle: 'Your image library and where each image is used.', primary: 'Upload', tabs: ['All', 'In use', 'Unused'],
    table: { columns: [{ key: 'name', label: 'File', type: 'mono' }, { key: 'size', label: 'Size', type: 'muted' }, { key: 'used', label: 'Used in' }, { key: 'status', label: 'Status', type: 'status' }], rows: [
      { name: 'valorant-diamond.webp', size: '142 KB', used: 'Valorant Account — Diamond', status: 'In use' }, { name: 'win11-cover.png', size: '388 KB', used: 'Windows 11 Pro Key', status: 'In use' }, { name: 'banner-oct.jpg', size: '1.2 MB', used: '—', status: 'Unused' },
    ] },
  },
  subscription: { title: 'Subscription Plan', subtitle: 'Upgrade to unlock more products, a custom domain, team seats and advanced anti-fraud.', kind: 'plans' },
  'payment-methods': { title: 'Payment Methods', subtitle: 'Choose how customers can pay. Drag to reorder how they appear at checkout.', actions: ['Take a tour', 'Reorder'], primary: 'Add Payment Method', kind: 'methods' },
  team: {
    title: 'Team', subtitle: 'Invite members and control exactly what they can access.', badge: 'Business+', primary: 'Invite Member',
    table: { columns: [{ key: 'name', label: 'Member', type: 'strong' }, { key: 'email', label: 'Email', type: 'muted' }, { key: 'role', label: 'Role', type: 'status' }, { key: 'last', label: 'Last active', type: 'muted' }], rows: [
      { name: 'Alex Kim', email: 'alex@novakeys.shop', role: 'Owner', last: 'Now' }, { name: 'Priya S.', email: 'priya@novakeys.shop', role: 'Admin', last: '2h ago' }, { name: 'Support Bot', email: 'support@novakeys.shop', role: 'Pending', last: '—' },
    ] },
  },
  domains: {
    title: 'Custom Domain', subtitle: 'Connect your own domain to your storefront.', badge: 'Business+', kind: 'form',
    form: [{ title: 'Domain', fields: [{ label: 'Domain', value: 'shop.novakeys.com', hint: 'Point a CNAME record to cname.ordexa.shop' }, { label: 'SSL', value: 'on', type: 'toggle' }, { label: 'Redirect subdomain to custom domain', value: 'on', type: 'toggle' }] }],
  },
  notifications: {
    title: 'Push Notifications', subtitle: 'Get notified on every event via Email, Discord, Telegram or HTTP.',
    table: { columns: [{ key: 'event', label: 'Event', type: 'strong' }, { key: 'email', label: 'Email', type: 'toggle' }, { key: 'discord', label: 'Discord', type: 'toggle' }, { key: 'telegram', label: 'Telegram', type: 'toggle' }, { key: 'http', label: 'HTTP', type: 'toggle' }], rows: [
      ['Checkout started', 0, 1, 0, 0], ['New sale', 1, 1, 1, 1], ['Marked paid', 1, 0, 0, 1], ['Late payment', 1, 1, 0, 0], ['Missing stock', 1, 1, 1, 0], ['Sold out', 1, 1, 1, 0], ['New ticket', 1, 1, 0, 0], ['New feedback', 0, 1, 0, 0],
    ].map(([event, e, d, t, h]) => ({ event: event as string, email: !!e, discord: !!d, telegram: !!t, http: !!h })) },
  },
  'activity-logs': {
    title: 'Activity Logs', subtitle: 'Who changed products, variants and invoices — and when.', actions: ['Auto-refresh', 'Refresh'],
    table: { columns: [{ key: 'who', label: 'Member', type: 'strong' }, { key: 'action', label: 'Action' }, { key: 'target', label: 'Target', type: 'muted' }, { key: 'ip', label: 'IP', type: 'mono' }, { key: 'time', label: 'Time', type: 'muted' }], rows: [
      { who: 'Alex Kim', action: 'Updated price', target: 'Windows 11 Pro Key', ip: '84.21.9.14', time: '4m ago' }, { who: 'Priya S.', action: 'Delivered invoice', target: 'INV-6D9E33', ip: '102.8.44.3', time: '41m ago' }, { who: 'Alex Kim', action: 'Added 50 serials', target: 'Discord Nitro — 1 Month', ip: '84.21.9.14', time: '2h ago' }, { who: 'Priya S.', action: 'Refunded invoice', target: 'INV-1B07C3', ip: '102.8.44.3', time: 'Yesterday' },
    ] },
  },
  'anti-fraud': {
    title: 'Anti-Fraud', subtitle: 'Block risky buyers before they pay. Rules run on every checkout.', primary: 'Create Rule',
    stats: [{ label: 'Blocked (30d)', value: '128', delta: -6.0 }, { label: 'Whitelisted', value: '24' }, { label: 'Block rate', value: '2.4%' }, { label: 'Active rules', value: '6' }],
    notice: 'Suggestion: enable VPN, Tor and disposable email detection to block 3x more fraud. Available on Business+.',
    table: { columns: [{ key: 'rule', label: 'Rule', type: 'strong' }, { key: 'type', label: 'Type' }, { key: 'hits', label: 'Hits (30d)' }, { key: 'status', label: 'Status', type: 'status' }], rows: [
      { rule: 'Block disposable emails', type: 'Email', hits: 41, status: 'Active' }, { rule: 'Max 3 orders / IP / hour', type: 'Velocity', hits: 33, status: 'Active' }, { rule: 'Block Tor exit nodes', type: 'Network', hits: 19, status: 'Active' }, { rule: 'Block high-risk countries', type: 'Country', hits: 35, status: 'Inactive' },
    ] },
  },
  'anti-fraud/blacklist': {
    title: 'Blacklist', subtitle: 'Emails, IPs, and other identifiers that can never check out.', actions: ['Export CSV', 'Filters'], primary: 'Create Entry',
    table: { columns: [{ key: 'value', label: 'Value', type: 'mono' }, { key: 'type', label: 'Type' }, { key: 'reason', label: 'Reason', type: 'muted' }, { key: 'added', label: 'Added', type: 'muted' }], rows: [
      { value: 'chargeback.king@tempmail.io', type: 'Email', reason: 'Chargeback', added: 'Nov 1' }, { value: '185.220.101.0/24', type: 'IP range', reason: 'Tor', added: 'Oct 30' }, { value: 'fraudster@gmail.com', type: 'Email', reason: 'Fake proof of payment', added: 'Oct 18' },
    ] },
  },
  'anti-fraud/whitelist': {
    title: 'Whitelist', subtitle: 'Trusted buyers, IPs and emails that always bypass anti-fraud rules.', primary: 'Create Entry',
    table: { columns: [{ key: 'value', label: 'Value', type: 'mono' }, { key: 'type', label: 'Type' }, { key: 'note', label: 'Note', type: 'muted' }, { key: 'added', label: 'Added', type: 'muted' }], rows: [
      { value: 'leo.ng@icloud.com', type: 'Email', note: 'Top spender', added: 'Oct 4' }, { value: 'keys.depot@proton.me', type: 'Email', note: 'Reseller', added: 'Sep 21' },
    ] },
  },
  'anti-fraud/log': {
    title: 'Fraud Logs', subtitle: 'Every blocked checkout and the rule that blocked it.',
    table: { columns: [{ key: 'email', label: 'Buyer', type: 'strong' }, { key: 'ip', label: 'IP', type: 'mono' }, { key: 'rule', label: 'Matched rule' }, { key: 'result', label: 'Result', type: 'status' }, { key: 'time', label: 'Time', type: 'muted' }], rows: [
      { email: 'x91@mailinator.com', ip: '45.14.71.2', rule: 'Block disposable emails', result: 'Blocked', time: '8m ago' }, { email: 'anon@proton.me', ip: '185.220.101.4', rule: 'Block Tor exit nodes', result: 'Blocked', time: '1h ago' }, { email: 'leo.ng@icloud.com', ip: '73.2.11.90', rule: 'Whitelist', result: 'Allowed', time: '2h ago' },
    ] },
  },
  api: {
    title: 'API', subtitle: 'Programmatic access to your shop. Base URL: https://api.ordexa.shop', actions: ['Docs'], primary: 'Create API Key',
    table: { columns: [{ key: 'name', label: 'Key', type: 'strong' }, { key: 'token', label: 'Token', type: 'mono' }, { key: 'perm', label: 'Permissions', type: 'muted' }, { key: 'last', label: 'Last used', type: 'muted' }], rows: [
      { name: 'Discord bot', token: 'ox_live_••••••••3f9a', perm: 'invoices:read, products:read', last: '3m ago' }, { name: 'Inventory sync', token: 'ox_live_••••••••b012', perm: 'products:write', last: 'Yesterday' },
    ] },
  },
  embeds: {
    title: 'Embeds', subtitle: 'Add buy buttons and product cards to any website with one script tag.', actions: ['Docs'], kind: 'form',
    form: [{ title: 'Embed snippet', fields: [{ label: 'Script', value: '<script src="https://ordexa.shop/embed.js" async></script>', type: 'textarea' }, { label: 'Button', value: '<button data-ordexa-product="valorant-diamond">Buy now</button>', type: 'textarea' }] }],
  },
  'webhook-logs': {
    title: 'Webhook Logs', subtitle: 'Outgoing webhooks and dynamic delivery calls. Retained for 14 days.', actions: ['Refresh'],
    table: { columns: [{ key: 'event', label: 'Event', type: 'mono' }, { key: 'url', label: 'Endpoint', type: 'muted' }, { key: 'code', label: 'Status', type: 'status' }, { key: 'dur', label: 'Duration' }, { key: 'time', label: 'Time', type: 'muted' }], rows: [
      { event: 'invoice.completed', url: 'https://bot.novakeys.com/hook', code: '200', dur: '142ms', time: '2m ago' }, { event: 'dynamic.delivery', url: 'https://api.novakeys.com/deliver', code: '200', dur: '488ms', time: '14m ago' }, { event: 'invoice.completed', url: 'https://bot.novakeys.com/hook', code: '500', dur: '3,002ms', time: '1h ago' },
    ] },
  },
  user: {
    title: 'Profile', subtitle: 'Your personal account settings.', kind: 'form', tabs: ['General', 'Password & 2FA', 'Logged-in devices', 'Data export', 'Delete account'],
    form: [{ title: 'General', fields: [{ label: 'Name', value: 'Alex Kim' }, { label: 'Email', value: 'alex@novakeys.shop' }, { label: 'Timezone', value: 'UTC+01:00 — Europe/Berlin', type: 'select' }] }, { title: 'Security', fields: [{ label: 'Two-factor authentication', value: 'on', type: 'toggle' }, { label: 'Login alerts', value: 'on', type: 'toggle' }] }],
  },
  invites: {
    title: 'Invites', subtitle: 'Pending invitations for you to join other shops.',
    table: { columns: [{ key: 'shop', label: 'Shop', type: 'strong' }, { key: 'role', label: 'Role', type: 'status' }, { key: 'from', label: 'Invited by', type: 'muted' }, { key: 'time', label: 'Sent', type: 'muted' }], rows: [{ shop: 'Pixel Market', role: 'Admin', from: 'sam@pixelmarket.gg', time: '2d ago' }] },
  },
  referrals: {
    title: 'Referrals', subtitle: 'Earn 30% on every plan and theme purchased by sellers you refer.', primary: 'Copy link',
    stats: [{ label: 'Referral code', value: 'NOVA30' }, { label: 'Signups', value: '14' }, { label: 'Paying', value: '5' }, { label: 'Balance', value: '$89.94' }],
    table: { columns: [{ key: 'shop', label: 'Shop', type: 'strong' }, { key: 'plan', label: 'Plan' }, { key: 'earned', label: 'Earned', type: 'money', align: 'right' }], rows: [{ shop: 'Pixel Market', plan: 'Business', earned: '$35.96' }, { shop: 'Keyforge', plan: 'Scale', earned: '$53.98' }] },
  },
}
