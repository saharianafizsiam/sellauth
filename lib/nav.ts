import {
  Activity,
  Bell,
  Boxes,
  Code,
  CreditCard,
  FileDown,
  FileText,
  FolderTree,
  Gift,
  Globe,
  Handshake,
  History,
  ImageIcon,
  Inbox,
  KeyRound,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  Mail,
  Newspaper,
  Package,
  Paintbrush,
  Palette,
  Puzzle,
  Receipt,
  Repeat,
  Scale,
  ScrollText,
  Share2,
  Shield,
  ShieldBan,
  ShieldCheck,
  ShieldAlert,
  ShoppingCart,
  Sparkles,
  Star,
  Store,
  TicketPercent,
  Truck,
  User,
  Users,
  UsersRound,
  Wallet,
  Webhook,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  badge?: string
}

export type NavSection = {
  title: string
  items: NavItem[]
}

export const navSections: NavSection[] = [
  {
    title: 'Overview',
    items: [{ label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard }],
  },
  {
    title: 'Catalog',
    items: [
      { label: 'Products', href: '/products', icon: Package },
      { label: 'Addons', href: '/addons', icon: Puzzle },
      { label: 'Groups', href: '/groups', icon: Layers },
      { label: 'Categories', href: '/categories', icon: FolderTree },
      { label: 'Downloadable Files', href: '/downloadable-files', icon: FileDown },
      { label: 'Shipping Zones', href: '/shipping-zones', icon: Truck },
    ],
  },
  {
    title: 'Sales',
    items: [
      { label: 'Invoices', href: '/invoices', icon: Receipt, badge: '4' },
      { label: 'Subscriptions', href: '/subscriptions', icon: Repeat },
      { label: 'Abandoned Checkouts', href: '/abandoned-checkouts', icon: ShoppingCart },
      { label: 'Disputes', href: '/disputes', icon: ShieldAlert, badge: 'Beta' },
    ],
  },
  {
    title: 'Audience',
    items: [
      { label: 'Customers', href: '/customers', icon: Users },
      { label: 'Resellers', href: '/resellers', icon: Boxes },
      { label: 'Affiliates', href: '/affiliates', icon: Handshake },
      { label: 'Feedbacks', href: '/feedbacks', icon: Star },
      { label: 'Tickets', href: '/tickets', icon: LifeBuoy, badge: '2' },
    ],
  },
  {
    title: 'Marketing',
    items: [
      { label: 'Coupons', href: '/coupons', icon: TicketPercent },
      { label: 'Quantity Deals', href: '/quantity-deals', icon: Gift },
      { label: 'Bundle Offers', href: '/bundle-offers', icon: Boxes },
      { label: 'Email Marketing', href: '/email-marketing', icon: Mail },
      { label: 'Blog', href: '/blog-posts', icon: Newspaper },
    ],
  },
  {
    title: 'Wallets',
    items: [{ label: 'Crypto', href: '/wallets/crypto', icon: Wallet }],
  },
  {
    title: 'Storefront',
    items: [
      { label: 'Configure', href: '/shop', icon: Store },
      { label: 'Checkout', href: '/shop/checkout', icon: CreditCard },
      { label: 'Themes', href: '/theme', icon: Palette },
      { label: 'Legal & Privacy', href: '/shop/legal', icon: Scale },
      { label: 'Email Settings', href: '/email/templates', icon: Inbox },
      { label: 'Images', href: '/images', icon: ImageIcon },
    ],
  },
  {
    title: 'Settings',
    items: [
      { label: 'Subscription Plan', href: '/subscription', icon: Sparkles },
      { label: 'Payment Methods', href: '/payment-methods', icon: CreditCard },
      { label: 'Team', href: '/team', icon: UsersRound },
      { label: 'Custom Domain', href: '/domains', icon: Globe },
      { label: 'Push Notifications', href: '/notifications', icon: Bell },
      { label: 'Activity Logs', href: '/activity-logs', icon: History },
    ],
  },
  {
    title: 'Anti-Fraud',
    items: [
      { label: 'Overview', href: '/anti-fraud', icon: Shield },
      { label: 'Blacklist', href: '/anti-fraud/blacklist', icon: ShieldBan },
      { label: 'Whitelist', href: '/anti-fraud/whitelist', icon: ShieldCheck },
      { label: 'Fraud Logs', href: '/anti-fraud/log', icon: ScrollText },
    ],
  },
  {
    title: 'Developers',
    items: [
      { label: 'API', href: '/api', icon: KeyRound },
      { label: 'Embeds', href: '/embeds', icon: Code },
      { label: 'Webhook Logs', href: '/webhook-logs', icon: Webhook },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Profile', href: '/user', icon: User },
      { label: 'Invites', href: '/invites', icon: Mail },
      { label: 'Referrals', href: '/referrals', icon: Share2 },
    ],
  },
]

export const extraIcons = { Activity, FileText, Paintbrush }
