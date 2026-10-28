import { V2Styles } from '@/components/v2-styles';

const EN_CSS = `
.en-page{background:var(--bg);color:var(--ink);min-height:100vh;overflow-x:clip;font-family:'Plus Jakarta Sans',ui-sans-serif,system-ui,-apple-system,sans-serif}
.en-shell{width:100%;max-width:1180px;margin:0 auto;padding:0 22px}
.en-top{border-bottom:1px solid var(--line);background:rgba(251,246,238,.86);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);position:sticky;top:0;z-index:40}
.en-topbar{display:flex;align-items:center;justify-content:space-between;gap:14px;min-height:64px;padding:10px 0}
.en-brand{display:flex;align-items:center;gap:11px;color:inherit;text-decoration:none;min-width:0}
.en-mark{width:32px;height:32px;border-radius:999px;background:var(--green);color:#fff;display:grid;place-items:center;font-family:Fraunces,Georgia,serif;font-weight:700;font-size:14px;flex:0 0 auto}
.en-brand-name{font-weight:600;font-size:15px;line-height:1.1;letter-spacing:-.01em}
.en-brand-sub{font-size:11px;color:var(--muted);margin-top:2px}
.en-nav{display:none;align-items:center;gap:8px;font-size:12.5px}
.en-nav a{text-decoration:none;color:var(--ink-2);padding:7px 12px;border-radius:999px;border:1px solid transparent;transition:.2s}
.en-nav a:hover{background:var(--surface-2);color:var(--ink)}
.en-nav .en-nav-cta{background:var(--ink);color:var(--bg)}
.en-nav .en-nav-cta:hover{opacity:.9;background:var(--ink);color:var(--bg)}
.en-hero{position:relative;isolation:isolate;color:#fff;padding:84px 0 96px;background:#1e241c url('/images/v2/image_20261028_070326.webp') center/cover no-repeat}
.en-hero::before{content:'';position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(18,22,18,.62) 0%,rgba(18,22,18,.34) 38%,rgba(18,22,18,.9) 100%)}
.en-hero-inner{max-width:920px;margin:0 auto;text-align:center}
.en-bismillah{font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:rgba(255,255,255,.62);font-weight:600}
.en-badges{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:22px}
.en-badge{display:inline-flex;align-items:center;gap:6px;padding:7px 13px;border-radius:999px;font-size:11px;font-weight:600;letter-spacing:.02em;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.1);color:#fff;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);text-decoration:none}
.en-badge-live{background:rgba(16,185,129,.22);border-color:rgba(110,231,183,.4);color:#d1fae5}
.en-hero h1{font-family:Fraunces,Georgia,serif;font-weight:700;letter-spacing:-.03em;line-height:1.02;font-size:clamp(38px,6.2vw,74px);margin:26px 0 0}
.en-hero h1 em{font-style:italic;color:#f0d69a}
.en-hero .en-lede{font-size:clamp(14px,1.6vw,16.5px);line-height:1.7;color:rgba(255,255,255,.82);max-width:640px;margin:20px auto 0}
.en-cta{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:32px}
.en-btn{display:inline-flex;align-items:center;gap:8px;padding:13px 24px;border-radius:999px;font-size:13.5px;font-weight:600;text-decoration:none;border:1px solid transparent;transition:.2s}
.en-btn-primary{background:#f0d69a;color:#1e241c}
.en-btn-primary:hover{background:#e6b86a}
.en-btn-ghost{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.3);color:#fff;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.en-btn-ghost:hover{background:rgba(255,255,255,.2)}
.en-btn-dark{background:var(--green);color:#fff}
.en-btn-dark:hover{opacity:.92}
.en-btn-line{border-color:var(--line);color:var(--ink);background:var(--surface)}
.en-btn-line:hover{background:var(--surface-2)}
.en-hero-note{font-size:11px;line-height:1.7;color:rgba(255,255,255,.55);margin:22px auto 0;max-width:560px}
.en-stats{display:grid;grid-template-columns:1fr;gap:10px;margin-top:44px;text-align:left}
.en-stat{border-radius:16px;border:1px solid rgba(255,255,255,.16);background:rgba(18,22,18,.32);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);padding:14px 16px}
.en-stat strong{display:block;font-family:Fraunces,Georgia,serif;font-size:22px;line-height:1}
.en-stat span{display:block;margin-top:6px;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.62)}
.en-sec{padding:76px 0;border-bottom:1px solid var(--line)}
.en-sec-tint{background:var(--surface-2)}
.en-eyebrow{font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--ochre)}
.en-h2{font-family:Fraunces,Georgia,serif;font-weight:700;letter-spacing:-.02em;line-height:1.06;font-size:clamp(28px,3.6vw,42px);margin:12px 0 0;max-width:22ch}
.en-body{font-size:13.5px;line-height:1.85;color:var(--ink-2);margin-top:16px;max-width:60ch}
.en-two{display:grid;gap:34px;align-items:center}
.en-fig{margin:0;border-radius:22px;overflow:hidden;border:1px solid var(--line);background:var(--surface);box-shadow:var(--shadow)}
.en-fig img{display:block;width:100%;height:100%;object-fit:cover}
.en-fig figcaption{font-size:11px;color:var(--muted);padding:10px 14px}
.en-jute{position:relative;border-radius:22px;overflow:hidden;box-shadow:var(--shadow);background:var(--surface)}
.en-jute::before{content:'';position:absolute;inset:9px;border:2px dashed rgba(192,138,61,.55);border-radius:16px;pointer-events:none;z-index:2}
.en-principles{display:grid;gap:10px;margin-top:26px}
.en-principle{display:flex;gap:12px;align-items:flex-start;border:1px solid var(--line);background:var(--surface);border-radius:14px;padding:14px 16px}
.en-tick{width:22px;height:22px;border-radius:999px;background:var(--green);color:#fff;display:grid;place-items:center;font-size:11px;flex:0 0 auto;margin-top:1px}
.en-principle h3{font-size:13px;font-weight:600;margin:0}
.en-principle p{font-size:12px;line-height:1.6;color:var(--ink-2);margin:4px 0 0}
.en-dark{background:var(--green);color:#f7f4ec;border-bottom:1px solid rgba(255,255,255,.12)}
.en-dark .en-eyebrow{color:#e6b86a}
.en-dark .en-body{color:rgba(247,244,236,.72)}
.en-mapwrap{position:relative;border-radius:22px;overflow:hidden;border:1px solid rgba(255,255,255,.16);box-shadow:0 26px 60px rgba(0,0,0,.35)}
.en-mapwrap img{display:block;width:100%;object-fit:cover}
.en-mapwrap::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 45%,rgba(240,214,154,.16),transparent 62%)}
.en-pillars{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:24px}
.en-pillar{border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);border-radius:12px;padding:11px 12px;font-size:11.5px;line-height:1.45;display:flex;gap:8px;align-items:center}
.en-pillar b{font-family:Fraunces,Georgia,serif;color:#f0d69a;font-size:12px}
.en-pillar span{color:rgba(247,244,236,.78)}
.en-cards{display:grid;grid-template-columns:1fr;gap:12px;margin-top:32px}
.en-card{border:1px solid var(--line);background:var(--surface);border-radius:18px;padding:22px;transition:.2s;box-shadow:var(--shadow-soft)}
.en-card:hover{transform:translateY(-2px);box-shadow:var(--shadow)}
.en-card .en-num{font-size:10.5px;font-weight:700;letter-spacing:.16em;color:var(--ochre)}
.en-card h3{font-size:14.5px;font-weight:600;margin:10px 0 0;line-height:1.3}
.en-card p{font-size:12.5px;line-height:1.7;color:var(--ink-2);margin:8px 0 0}
.en-card small{display:block;margin-top:12px;font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.en-film{position:relative;isolation:isolate;color:#fff;padding:74px 0;background:#1e241c url('/images/v2/image_20261027_195010.webp') center/cover no-repeat}
.en-film::before{content:'';position:absolute;inset:0;z-index:-1;background:linear-gradient(115deg,rgba(18,22,18,.92),rgba(18,22,18,.6))}
.en-film h2{font-family:Fraunces,Georgia,serif;font-weight:700;font-size:clamp(26px,3.4vw,38px);line-height:1.08;margin:12px 0 0;max-width:20ch}
.en-film p{font-size:13.5px;line-height:1.8;color:rgba(255,255,255,.74);max-width:54ch;margin-top:16px}
.en-foot{background:var(--surface);padding:52px 0 34px}
.en-foot-grid{display:grid;gap:26px}
.en-foot h3{font-size:14px;font-weight:600;margin:0}
.en-foot p,.en-foot a{font-size:12px;line-height:1.75;color:var(--ink-2)}
.en-foot-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.en-foot-links a{text-decoration:none;border:1px solid var(--line);border-radius:999px;padding:7px 13px;transition:.2s}
.en-foot-links a:hover{background:var(--surface-2);color:var(--ink)}
.en-quote{font-family:Fraunces,Georgia,serif;font-style:italic;font-size:18px;line-height:1.4;color:var(--ink);max-width:32ch}
.en-rule{border-top:1px solid var(--line);margin-top:34px;padding-top:16px;display:flex;flex-wrap:wrap;gap:8px;justify-content:space-between;font-size:10.5px;color:var(--muted)}
@media(min-width:640px){
  .en-stats{grid-template-columns:repeat(3,1fr)}
  .en-cards{grid-template-columns:repeat(2,1fr)}
  .en-foot-grid{grid-template-columns:1.2fr .8fr}
}
@media(min-width:900px){
  .en-nav{display:flex}
  .en-two{grid-template-columns:1fr 1fr;gap:48px}
  .en-two .en-fig{order:0}
  .en-sec{padding:96px 0}
  .en-hero{padding:104px 0 112px}
  .en-cards{grid-template-columns:repeat(3,1fr)}
}
@media(min-width:1100px){
  .en-pillars{grid-template-columns:repeat(3,1fr)}
}
`;

const principles = [
  ['Listen with consent', 'A person chooses what to record, and the consent banner stays on the record.'],
  ['Evidence, not assertion', 'Every draft field points back to a source span in the transcript or text.'],
  ['Unknown stays unknown', 'No deadline is invented. Missing information stays visible until a human resolves it.'],
  ['Human approval guard', 'The coordinator drafts; a community health worker reviews. Nothing auto-sends or auto-publishes.']
];

const pillars = [
  ['aLive', 'Field coordination · working MVP'],
  ['Identity', 'meUus consent layer · prototype'],
  ['Intelligence', 'DLAS reflection · prototype'],
  ['Action', 'Small daily plans · planned'],
  ['Services', 'Guided services · outline'],
  ['Learning', 'Knowledge paths · planned'],
  ['Opportunity', 'Livelihood · planned'],
  ['Legal', 'Access to justice · planned'],
  ['Green', 'Community & environment · planned']
];

const features = [
  ['01', 'Evidence-linked, no hallucination', 'Deadline stays null unless an explicit date phrase is present. A missing-information chip stays visible until resolved. The ledger shows the audio source for every field.', 'Synthetic fixtures'],
  ['02', 'Bangla · English · Arabic', 'A voice note in Bangla becomes a transcript, then an English summary for the coordinator. Arabic support for global-south partners.', 'muse-voice-transcribe-1.0'],
  ['03', 'Human approval guard', 'No auto-send, no auto-publish. The coordinator drafts and a human approves every internal record.', 'Consent on every record'],
  ['04', '100% traceability, 0% hallucination', 'On the A–K synthetic fixtures: 11/11 checks pass. Every field carries a source span. If the model is unsure it returns NEEDS_*.', 'TEST_EVIDENCE.md · 11/11'],
  ['05', 'Synthetic demo only', 'No real personal data. Names and phone numbers are generated. The live demo holds data in browser session storage only.', 'No PII'],
  ['06', 'Built with Meta models', 'muse-voice-transcribe-1.0 for speech, muse-spark-1.3 for drafting, with a deterministic fallback so the demo never dead-ends.', 'muse-spark-1.3']
];

export function EnglishHome() {
  return (
    <>
      <V2Styles />
      <style dangerouslySetInnerHTML={{ __html: EN_CSS }} />
      <div className="en-page">
        <header className="en-top">
          <div className="en-shell en-topbar">
            <a className="en-brand" href="/en">
              <span className="en-mark">m</span>
              <span>
                <span className="en-brand-name">meUus — Connecting Everything</span>
                <span className="en-brand-sub">aLive Bangladesh · English</span>
              </span>
            </a>
            <nav aria-label="Main" className="en-nav">
              <a href="#community">Community</a>
              <a href="#ecosystem">Ecosystem</a>
              <a href="#principles">How it works</a>
              <a href="#film">Film</a>
              <a href="/pitch">Proof pack</a>
              <a className="en-nav-cta" href="https://alive-bangladesh-coordinator-meta-a.vercel.app" target="_blank" rel="noopener">Live App ↗</a>
            </nav>
          </div>
        </header>

        <section className="en-hero">
          <div className="en-shell en-hero-inner">
            <p className="en-bismillah">بسم الله الرحمن الرحيم — Bismillah</p>
            <div className="en-badges">
              <span className="en-badge">Build for Your World</span>
              <span className="en-badge">Startup Track</span>
              <a className="en-badge en-badge-live" href="https://youtu.be/BvJYe5-Hevo" target="_blank" rel="noopener">Video DONE ✓</a>
              <span className="en-badge">Meta Global AI Hackathon 2026</span>
            </div>
            <h1>
              Welcome to <em>aLive Bangladesh</em>
            </h1>
            <p className="en-lede">
              An evidence-linked coordinator for community health work. A Bangla voice note becomes a traceable draft — and a human
              decides. This is the first working proof of the meUus Human Operating System.
            </p>
            <div className="en-cta">
              <a className="en-btn en-btn-primary" href="/en/new">Start a field note →</a>
              <a className="en-btn en-btn-ghost" href="/en/ledger">Open the ledger</a>
              <a className="en-btn en-btn-ghost" href="/pitch#film">Watch the film ▶</a>
            </div>
            <p className="en-hero-note">
              Live demo runs on synthetic records only. No durable storage, no account system, and no external messaging is connected.
            </p>
            <div className="en-stats">
              <div className="en-stat"><strong>34</strong><span>Pages built live</span></div>
              <div className="en-stat"><strong>11/11</strong><span>Synthetic checks pass</span></div>
              <div className="en-stat"><strong>3</strong><span>Languages · BN · EN · AR</span></div>
            </div>
          </div>
        </section>

        <section id="community" className="en-sec">
          <div className="en-shell en-two">
            <div className="en-jute">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/v2/image_20261028_070321.webp" alt="Illustrative artwork: hands holding rice seedlings above lotus leaves, with a wheelchair visible" style={{ display: 'block', width: '100%', aspectRatio: '4 / 3', objectFit: 'cover' }} />
            </div>
            <div>
              <p className="en-eyebrow">Community strength</p>
              <h2 className="en-h2">The weakest soul should still be able to continue.</h2>
              <p className="en-body">
                Behind every national problem are human lives. aLive starts with one narrow, reviewable workflow so a community health
                worker can keep a promise to the next person in the chain.
              </p>
              <div id="principles" className="en-principles">
                {principles.map(([title, body]) => (
                  <div className="en-principle" key={title}>
                    <span className="en-tick">✓</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="ecosystem" className="en-sec en-dark">
          <div className="en-shell en-two">
            <div>
              <p className="en-eyebrow">Ecosystem</p>
              <h2 className="en-h2" style={{ color: '#f7f4ec' }}>One person at the centre. Nine pillars around them.</h2>
              <p className="en-body">
                aLive is the only pillar with an evidence-linked MVP in this repository. The rest are honest roadmap entries — a map of
                where the Human OS is going, not a claim that it already exists.
              </p>
              <div className="en-pillars">
                {pillars.map(([name, detail], index) => (
                  <div className="en-pillar" key={name}>
                    <b>{String(index + 1).padStart(2, '0')}</b>
                    <span>{name} · {detail}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="en-mapwrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/v2/image_20261028_070314.webp" alt="Illustrative artwork: a glowing network over a map of Bangladesh with health, education, community, and growth symbols" style={{ display: 'block', width: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }} />
            </div>
          </div>
        </section>

        <section id="features" className="en-sec">
          <div className="en-shell">
            <p className="en-eyebrow">Why it can be trusted</p>
            <h2 className="en-h2">Useful because it stays honest.</h2>
            <p className="en-body">
              The coordinator flow is deliberately small. Every claim on this page can be checked in the repository — including the
              limits of what has actually been tested.
            </p>
            <div className="en-cards">
              {features.map(([num, title, body, tag]) => (
                <article className="en-card" key={num}>
                  <div className="en-num">{num}</div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <small>{tag}</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="film" className="en-film">
          <div className="en-shell">
            <p className="en-eyebrow">The film</p>
            <h2>Three minutes on trust, struggle, and continuity.</h2>
            <p>
              aLive_Bangladesh.mp4 runs 3:21 and streams from YouTube (Unlisted), with the 74 MB master served locally as a fallback.
              The film frames the community vision; the coordinator demo is a separate synthetic workflow.
            </p>
            <div className="en-cta" style={{ justifyContent: 'flex-start', marginTop: 26 }}>
              <a className="en-btn en-btn-primary" href="/pitch#film">Watch the film ▶</a>
              <a className="en-btn en-btn-ghost" href="https://youtu.be/BvJYe5-Hevo" target="_blank" rel="noopener">Open on YouTube ↗</a>
              <a className="en-btn en-btn-ghost" href="/pitch">Premium proof pack</a>
            </div>
          </div>
        </section>

        <footer className="en-foot">
          <div className="en-shell">
            <div className="en-foot-grid">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="en-mark">m</span>
                  <h3>meUus Foundation · meuus.org</h3>
                </div>
                <p style={{ marginTop: 12, maxWidth: '52ch' }}>
                  Path: <code>meuus.org/alivebangladesh</code> with <code>alive.meuus.org</code> planned. meUus — Connecting Everything
                  is a Human Operating System for life continuity.
                </p>
                <div className="en-foot-links">
                  <a href="https://alive-bangladesh-coordinator-meta-a.vercel.app" target="_blank" rel="noopener">Live App ↗</a>
                  <a href="https://github.com/mdmahadyhasanruju-byte/alive-bangladesh-coordinator-meta-ai" target="_blank" rel="noopener">GitHub ↗</a>
                  <a href="/pitch">Pitch</a>
                  <a href="/bn">বাংলা</a>
                  <a href="/ar">العربية</a>
                </div>
              </div>
              <div>
                <p className="en-quote">“The only limit to our realization of tomorrow will be our doubts of today.”</p>
                <p style={{ marginTop: 10, fontSize: 11, color: 'var(--muted)' }}>— Franklin D. Roosevelt · quoted in the film</p>
                <p style={{ marginTop: 18, fontWeight: 600, color: 'var(--ink)' }}>InShaAllah — we will continue. Anyone, anywhere.</p>
              </div>
            </div>
            <div className="en-rule">
              <span>© 2026 meUus · Connecting Everything · Evidence-linked · No PII demo</span>
              <span>Built 2026-10-28 · 34 pages · 11/11 synthetic checks</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
