import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'aLive Bangladesh | meUus V2',
  description: 'An evidence-linked coordinator workflow and an early meUus Human OS prototype.',
};

const pillars = [
  ['aLive', 'Field coordination · first working proof'],
  ['DLAS', 'Reflective assessment · prototype'],
  ['Learning', 'Knowledge and learning · planned'],
  ['Services', 'Guided digital services · outline'],
  ['Opportunity', 'Employment and livelihood · planned'],
  ['Growth', 'Wellbeing and progress · planned'],
  ['Legal', 'Access to legal support · planned'],
  ['Family', 'Family support · planned'],
  ['Green', 'Community and environment · planned'],
];

const steps = [
  ['01', 'Listen', 'A coordinator submits consented Bangla, English, or Arabic text or audio.'],
  ['02', 'Understand', 'The prototype prepares a transcript and a structured draft.'],
  ['03', 'Link evidence', 'Draft statements point back to text or transcript segments.'],
  ['04', 'Review with people', 'A human reviews, corrects, rejects, or approves the internal record.'],
];

const features = [
  ['Evidence before assertion', 'Keep statements linked to their supporting input.'],
  ['Unknown stays unknown', 'Unclear deadlines and responsible people are left for clarification.'],
  ['Human approval', 'Model output never approves a record or sends an external message.'],
  ['Designed to continue', 'A small, understandable workflow can support the next person in the chain.'],
];

const artworks = [
  ['/images/v2/image_20261028_070321.webp', 'Illustrative artwork: diverse hands holding rice seedlings above lotus leaves, with a wheelchair visible', 'Community hands · illustrative artwork'],
  ['/images/v2/image_20261028_070314.webp', 'Illustrative artwork: a glowing network over a map of Bangladesh with health, education, community, and growth symbols', 'Bangladesh network · illustrative artwork'],
  ['/images/v2/image_20261027_195010.webp', 'Illustrative watercolour artwork: a field coordinator with a notebook speaking to an older man beside a tube well at golden hour', 'Tube well at golden hour · illustrative watercolour'],
];

const YOUTUBE_URL = 'https://youtu.be/BvJYe5-Hevo';
const YOUTUBE_EMBED = 'https://www.youtube.com/embed/BvJYe5-Hevo';

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

export default function PitchPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f7f2] text-[#102b25]">
      <header className="border-b border-emerald-950/10 bg-[#f7f7f2]/95">
        <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a href="#top" className="min-w-0 text-lg font-bold tracking-tight">meUus <span className="font-normal text-emerald-800">/ aLive Bangladesh</span></a>
          <div className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <a href="#film">Film</a><a href="#vision">Vision</a><a href="#ecosystem">Ecosystem</a><a href="#workflow">How it works</a><a href="#artwork">Artwork</a>
          </div>
          <a href="/bn/new" className="shrink-0 rounded-full bg-[#123d32] px-4 py-2 text-sm font-semibold text-white hover:bg-[#205846]">Try live demo <span className="ml-1 inline-block align-middle"><Arrow /></span></a>
        </nav>
      </header>

      <section id="top" className="relative isolate border-b border-emerald-950/10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_10%,rgba(213,158,65,.19),transparent_35%),linear-gradient(135deg,#f7f7f2_40%,#e2eee5)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_.95fr] lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[.16em] text-emerald-900"><span className="h-2 w-2 rounded-full bg-amber-500" /> Bismillah · Build for Your World</div>
            <p className="mt-7 text-sm font-semibold uppercase tracking-[.22em] text-emerald-800">aLive Bangladesh · first proof of meUus</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-.04em] text-[#102b25] sm:text-6xl">Evidence-linked support, built to move forward together.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">A coordinator turns a consented community field note into a traceable draft for human review. The broader meUus vision is a human operating system for reflection, learning, and practical action.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a className="rounded-full bg-[#123d32] px-6 py-3 text-sm font-semibold text-white" href="/bn/new">Open aLive demo</a><a className="rounded-full border border-emerald-950/20 bg-white/60 px-6 py-3 text-sm font-semibold" href="#film">Watch the film</a></div>
            <p className="mt-5 max-w-xl text-xs leading-5 text-slate-500">Live text demo uses synthetic examples. No durable storage, account system, or external messaging is connected.</p>
          </div>
          <div className="relative min-w-0">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-emerald-900/5 blur-xl" />
            <div className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-[#102b25] p-2 shadow-[0_30px_90px_-40px_rgba(16,43,37,.65)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/v2/video-poster.jpg" alt="Sunset over a river in the supplied aLive Bangladesh film" className="aspect-[1.42/1] w-full rounded-[1.1rem] object-cover" />
              <div className="flex items-center justify-between gap-4 px-4 py-4 text-white"><div className="min-w-0"><p className="text-xs uppercase tracking-[.18em] text-emerald-200">Documentary film</p><p className="mt-1 truncate text-sm font-medium">aLive Bangladesh · People, communities, a brighter future</p></div><a href="#film" aria-label="Go to the aLive Bangladesh film" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-amber-400 text-emerald-950"><span className="ml-0.5">▶</span></a></div>
            </div>
            <div className="absolute -bottom-5 -left-3 rounded-2xl border border-white bg-white px-4 py-3 shadow-lg sm:-left-7"><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-slate-500">A narrow, reviewable workflow</p><p className="mt-1 text-sm font-semibold text-emerald-950">Input → Evidence → Human review</p></div>
          </div>
        </div>
      </section>

      <section id="film" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid items-end gap-5 md:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-emerald-800">The story</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A film about people and possibility.</h2></div><p className="max-w-2xl text-sm leading-6 text-slate-600">The supplied film runs about 3 minutes 21 seconds. It frames the community vision; the coordinator demo below demonstrates a separate synthetic, text-only workflow.</p></div>
        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-emerald-800/25 bg-emerald-100 px-3 py-1 font-semibold text-emerald-900">Video DONE · YouTube Unlisted</span>
          <span className="rounded-full border border-emerald-950/10 bg-white px-3 py-1 font-medium text-slate-600">Local MP4 · 74 MB</span>
          <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="break-all font-semibold text-emerald-800 underline">{YOUTUBE_URL}</a>
        </div>
        <div className="mt-6 overflow-hidden rounded-[1.5rem] bg-black shadow-xl ring-1 ring-black/10">
          <iframe className="aspect-video w-full" src={YOUTUBE_EMBED} title="aLive Bangladesh — Evidence-Linked Coordinator (YouTube, Unlisted)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500"><span>YouTube · Unlisted · 1920 × 1080</span><a className="underline" href={YOUTUBE_URL} target="_blank" rel="noreferrer">Open on YouTube</a></div>
        <div className="mt-8 rounded-2xl border border-emerald-950/10 bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm font-semibold text-emerald-950">Local MP4 copy</p><span className="text-xs text-slate-500">Fallback if YouTube is blocked in the reviewer’s region</span></div>
          <div className="mt-4 overflow-hidden rounded-[1.5rem] bg-black shadow-xl ring-1 ring-black/10"><video className="aspect-video w-full" controls preload="none" poster="/images/v2/video-poster.jpg"><source src="/videos/aLive_Bangladesh.mp4" type="video/mp4" />Your browser does not support embedded video. <a href="/videos/aLive_Bangladesh.mp4">Download the aLive Bangladesh film</a>.</video></div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500"><span className="break-all">aLive_Bangladesh.mp4 · 74 MB · 1920 × 1080 · H.264/AAC</span><a className="underline" href="/videos/aLive_Bangladesh.mp4" download>Download video</a></div>
        </div>
      </section>

      <section id="vision" className="scroll-mt-20 bg-[#123d32] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-emerald-200">The meUus vision</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">The weakest soul should still be able to continue.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-emerald-50/75">meUus connects reflection, knowledge, action, community support, and opportunity. aLive Bangladesh is one focused proof point: an evidence-linked coordinator workflow that keeps people in the approval loop.</p><a href="/welcome" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-amber-300">Explore the Human OS prototype <Arrow /></a></div>
          <div className="grid gap-3 sm:grid-cols-2">{[['Identity', 'A profile and a person’s own life context'], ['Intelligence', 'DLAS reflection and transparent AI assistance'], ['Action', 'Small plans and practical daily steps'], ['Ecosystem', 'Nine support pillars with aLive as the first proof'], ['Economic', 'Future opportunity and marketplace concepts']].map(([title, body], index) => <article key={title} className="rounded-2xl border border-white/15 bg-white/[.06] p-5"><span className="text-xs font-semibold text-amber-300">0{index + 1}</span><h3 className="mt-3 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-emerald-50/70">{body}</p></article>)}</div>
        </div>
      </section>

      <section id="community" className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-24 md:grid-cols-2">
        <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-emerald-800">Community strength</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Progress grows when people can carry the work forward.</h2><p className="mt-5 text-sm leading-7 text-slate-600">The product is designed around clear evidence, shared understanding, and human review. It does not claim measured community outcomes or verified impact statistics.</p></div>
        <div className="grid gap-3 sm:grid-cols-2">{[['Listen with consent', 'Respect what a person chooses to share.'], ['Keep context', 'Connect a draft to the words or segment that supports it.'], ['Ask when unclear', 'Leave missing details open for follow-up.'], ['Review together', 'Let a human own correction and approval.']].map(([title, body]) => <div className="rounded-2xl border border-emerald-950/10 bg-white p-5" key={title}><div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 font-semibold text-emerald-900">✓</div><h3 className="mt-4 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p></div>)}</div>
      </section>

      <section id="ecosystem" className="scroll-mt-20 border-y border-emerald-950/10 bg-[#edf3eb]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-emerald-800">Ecosystem map</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Nine pillars. One person at the center.</h2><p className="mt-4 text-sm leading-6 text-slate-600">Pillar routes show the planned ecosystem. Only aLive Bangladesh has an evidence-linked MVP in this repository; the other pathways remain prototypes or roadmap entries.</p></div><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{pillars.map(([name, description], index) => <div key={name} className={`flex min-w-0 items-start gap-4 rounded-2xl border p-4 ${name === 'aLive' ? 'border-emerald-800/30 bg-white shadow-sm' : 'border-emerald-950/10 bg-white/55'}`}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-900 text-xs font-bold text-white">{String(index + 1).padStart(2, '0')}</span><div className="min-w-0"><h3 className="font-semibold">{name}</h3><p className="mt-1 break-words text-sm leading-5 text-slate-600">{description}</p></div></div>)}</div></div>
      </section>

      <section id="workflow" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-emerald-800">How it works</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">From a field note to a human-owned record.</h2></div><div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([number, title, detail]) => <article key={number} className="rounded-2xl border border-emerald-950/10 bg-white p-5"><p className="text-xs font-bold tracking-[.16em] text-amber-700">STEP {number}</p><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{detail}</p></article>)}</div><div className="mt-6 rounded-2xl bg-[#123d32] px-5 py-4 text-sm text-white"><span className="font-semibold text-amber-300">Guardrail:</span> No model approves a ledger entry or sends a message outside the app.</div></section>

      <section id="features" className="border-y border-emerald-950/10 bg-white"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-emerald-800">Product principles</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Useful because it stays honest.</h2></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{features.map(([title, body]) => <article className="border-l-2 border-amber-500 pl-4" key={title}><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p></article>)}</div></div></section>

      <section id="live-demo" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24"><div className="grid gap-8 rounded-[1.5rem] bg-[#102b25] p-7 text-white sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-emerald-200">Live demo</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Try the synthetic coordinator flow.</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-emerald-50/70">Submit text with consent, review the draft and its evidence references, then change the internal ledger status. Demo data is held in browser session storage and is not durable.</p></div><a href="/bn/new" className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-emerald-950">Open Bangla demo <Arrow /></a></div></section>

      <section id="stats" className="border-y border-emerald-950/10 bg-[#edf3eb]"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-8"><p className="text-xs font-semibold uppercase tracking-[.2em] text-emerald-800">Project at a glance</p><div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">{[['09', 'Pillar routes'], ['03', 'Interface languages'], ['21', 'Zero-level reflection prompts'], ['01', 'Evidence-linked coordinator MVP']].map(([value, label]) => <div key={label} className="rounded-2xl bg-white p-5"><p className="text-3xl font-semibold tracking-tight text-emerald-950">{value}</p><p className="mt-2 text-sm text-slate-600">{label}</p></div>)}</div><p className="mt-4 text-xs text-slate-500">These are implementation counts, not participant or impact statistics. Reflection prompts are unvalidated and not diagnostic.</p></div></section>

      <section id="packing" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-emerald-800">Submission packing</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A clear first proof, with the next work visible.</h2><p className="mt-5 text-sm leading-7 text-slate-600">Built for the Meta Global AI Hackathon Startup Track and the Build for Your World theme. The existing aLive app and the new Human OS pages share one repository.</p><a className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#123d32] px-5 py-3 text-sm font-semibold text-white" href="https://github.com/mdmahadyhasanruju-byte/alive-bangladesh-coordinator-meta-ai">Open public repository <Arrow /></a></div><div className="grid min-w-0 gap-3 sm:grid-cols-2">{[['Live pitch', '/pitch'], ['Film on YouTube', 'Unlisted · youtu.be/BvJYe5-Hevo'], ['Local MP4', '74 MB · /videos/aLive_Bangladesh.mp4'], ['Bangla field visit', '/bn/new'], ['Human OS prototype', '/welcome'], ['Test record', '11 synthetic A–K checks documented']].map(([title, detail]) => <div key={title} className="min-w-0 rounded-xl border border-emerald-950/10 bg-white p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p><p className="mt-2 break-all text-sm font-medium text-emerald-950">{detail}</p></div>)}</div></div>

        <div id="artwork" className="mt-14 scroll-mt-20">
          <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-emerald-800">V2 professional packing</p><h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Four artworks for the pitch.</h3></div><span className="rounded-full border border-amber-600/30 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">Illustrative · AI-generated</span></div>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Professional artwork supplied for this packing. These are AI-generated illustrations, not photographs, and they are not evidence of people, participants, or outcomes.</p>
          <figure className="mt-6 overflow-hidden rounded-[1.5rem] border border-emerald-950/10 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/v2/image_20261028_070326.webp" alt="Illustrative artwork: river sunrise with boats, paddy fields, and the Dhaka skyline" className="aspect-[3/1] w-full object-cover" loading="lazy" />
            <figcaption className="px-4 py-3 text-xs text-slate-500">River sunrise · illustrative artwork</figcaption>
          </figure>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {artworks.map(([src, alt, caption]) => (
              <figure key={src} className="min-w-0 overflow-hidden rounded-2xl border border-emerald-950/10 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alt} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                <figcaption className="break-words px-3 py-2 text-xs text-slate-500">{caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <p className="mt-10 max-w-4xl break-words text-xs leading-5 text-slate-500">Artwork source note: the four V2 artworks are stored under <code className="break-all">public/images/v2</code> and labelled illustrative; they are AI-generated and are not photographs or evidence. Supplied screenshot-style JPEGs remain under <code className="break-all">public/images/packing</code> for reference only; they contain unverified mock statistics and testimonial text and are not displayed as evidence. The video poster is a frame extracted from the supplied film.</p></section>

      <footer className="border-t border-emerald-950/10 bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-xs text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between"><span>© aLive Bangladesh · inside the meUus ecosystem</span><span className="break-words">Evidence-linked · human-reviewed · synthetic demo</span><a href="/bn" className="font-semibold text-emerald-900">Open aLive <Arrow /></a></div></footer>
    </main>
  );
}
