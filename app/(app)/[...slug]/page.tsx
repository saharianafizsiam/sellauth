import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ResourcePage } from '@/components/resource-page'
import { pages } from '@/lib/pages'

type Props = { params: Promise<{ slug: string[] }> }

export function generateStaticParams() {
  return Object.keys(pages).map((key) => ({ slug: key.split('/') }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const config = pages[slug.join('/')]
  return { title: config ? `${config.title} — Ordexa` : 'Ordexa' }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const config = pages[slug.join('/')]
  if (!config) notFound()
  return <ResourcePage config={config} />
}
