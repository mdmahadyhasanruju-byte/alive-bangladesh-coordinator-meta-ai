import { Navbar } from '@/components/navbar';
import { Card } from '@/components/ui/card';

export default function HomeHubPage() {
  return <main className="mx-auto max-w-6xl px-6 py-8"><Navbar /><header className="py-12"><p className="font-medium text-emerald-700">meUus Human Operating System</p><h1 className="mt-2 text-4xl font-bold">Build yourself. Build society.</h1><p className="mt-4 max-w-2xl text-slate-600">A prototype hub for reflection, learning, practical action, and community pathways.</p></header><div className="grid gap-4 md:grid-cols-3"><Card title="Reflect">Use a self-guided assessment when you are ready.</Card><Card title="Act">Turn a broad intention into a small next step.</Card><Card title="Connect">Explore the nine ecosystem pillars and services.</Card></div></main>;
}
