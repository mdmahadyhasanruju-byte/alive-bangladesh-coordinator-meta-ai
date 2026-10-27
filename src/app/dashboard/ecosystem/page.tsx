import { PILLARS } from '@/layers/ecosystem/pillars';

export default function DashboardEcosystemPage() {
  return <><h1 className="text-3xl font-bold">Ecosystem</h1><p className="mt-2 text-slate-600">Explore support areas. Only aLive currently has an evidence-linked MVP in this project.</p><div className="mt-5 grid gap-3 sm:grid-cols-2">{PILLARS.map((pillar) => <a className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50" href={`/pillars/${pillar.slug}`} key={pillar.slug}><span className="font-medium">{pillar.title}</span><span className="mt-1 block text-sm text-slate-500">{pillar.status}</span></a>)}</div></>;
}
