import type { ReactNode } from 'react';
import { Navbar } from '@/components/navbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const links = [['/dashboard', 'Overview'], ['/dashboard/assessment', 'Assessment'], ['/dashboard/tasks', 'Tasks'], ['/dashboard/progress', 'Progress'], ['/dashboard/ai-guide', 'AI guide'], ['/dashboard/profile', 'Profile'], ['/dashboard/ecosystem', 'Ecosystem']];
  return <main className="mx-auto max-w-6xl px-6 py-8"><Navbar /><div className="mt-8 grid gap-8 md:grid-cols-[210px_1fr]"><aside><h2 className="font-semibold">Dashboard</h2><nav className="mt-3 grid gap-2 text-sm">{links.map(([href, label]) => <a className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100" key={href} href={href}>{label}</a>)}</nav></aside><section>{children}</section></div></main>;
}
