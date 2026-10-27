const links = [
  ['/home', 'Home'], ['/dashboard', 'Dashboard'], ['/services', 'Services'], ['/21raWHox', 'Economic layer'], ['/bn', 'aLive'],
];

export function Navbar() {
  return <nav className="flex flex-wrap gap-4 border-b border-slate-200 py-4 text-sm">{links.map(([href, label]) => <a key={href} className="text-slate-700 underline-offset-4 hover:underline" href={href}>{label}</a>)}</nav>;
}
