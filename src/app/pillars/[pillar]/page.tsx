import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { PILLARS, getPillar } from '@/layers/ecosystem/pillars';

export function generateStaticParams() { return PILLARS.map(({ slug }) => ({ pillar: slug })); }

export default async function PillarPage({ params }: { params: Promise<{ pillar: string }> }) {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();
  return <main className="mx-auto max-w-5xl px-6 py-8"><Navbar /><p className="mt-10 text-sm uppercase tracking-wider text-emerald-700">Ecosystem pillar · {pillar.status}</p><h1 className="mt-2 text-4xl font-bold">{pillar.title}</h1>{slug === 'alive' ? <section className="mt-6 rounded-2xl border border-slate-200 p-5"><p>aLive Bangladesh Coordinator is the existing evidence-linked MVP. It creates drafts for human review and does not send external messages.</p><a className="mt-3 inline-block underline" href="/bn">Open coordinator</a></section> : <section className="mt-6 rounded-2xl border border-slate-200 p-5"><p>This pillar is a roadmap placeholder. Assessment and action flows are not implemented.</p></section>}</main>;
}
