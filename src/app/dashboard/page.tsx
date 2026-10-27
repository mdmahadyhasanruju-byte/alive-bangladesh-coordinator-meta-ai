import { Card } from '@/components/ui/card';

export default function DashboardPage() {
  return <><h1 className="text-3xl font-bold">Your overview</h1><p className="mt-2 text-slate-600">This private dashboard is a prototype; no account or personal profile is connected.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><Card title="Reflection">Start with the optional 21-question Zero level.</Card><Card title="Today">Choose one small action that fits your situation.</Card><Card title="Progress">Progress tracking is not connected to persistent storage.</Card><Card title="Ecosystem">Explore support pathways at your own pace.</Card></div></>;
}
