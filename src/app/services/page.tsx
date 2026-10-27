import { Navbar } from '@/components/navbar';
import { Card } from '@/components/ui/card';

const steps = ['Domain', 'Hosting', 'SSL', 'Email', 'Website launch'];
export default function ServicesPage() {
  return <main className="mx-auto max-w-6xl px-6 py-8"><Navbar /><h1 className="mt-10 text-4xl font-bold">Services Hub</h1><p className="mt-3 max-w-2xl text-slate-600">A guided journey for planning a basic online presence. This prototype does not purchase or configure services.</p><ol className="mt-8 grid gap-3 md:grid-cols-5">{steps.map((step, index) => <li key={step}><Card title={`${index + 1}. ${step}`}><span>Planned guide step</span></Card></li>)}</ol></main>;
}
