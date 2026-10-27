import { Navbar } from '@/components/navbar';

export default function WelcomePage() {
  return <main className="mx-auto min-h-screen max-w-5xl px-6 py-8"><Navbar /><section className="flex min-h-[75vh] flex-col items-start justify-center"><p className="text-sm font-semibold uppercase tracking-[.25em] text-emerald-700">Bismillah · meUus</p><h1 className="mt-5 max-w-3xl text-5xl font-bold tracking-tight text-slate-950">A system to rebuild humans and society</h1><p className="mt-5 max-w-2xl text-lg text-slate-600">A human-centered place to reflect, learn, plan small actions, and connect with support.</p><a className="mt-8 rounded-full bg-slate-950 px-6 py-3 font-semibold text-white" href="/home">Enter meUus</a></section></main>;
}
