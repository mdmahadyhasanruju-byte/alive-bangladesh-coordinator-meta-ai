import Link from 'next/link';
import bn from '@/i18n/bn.json';
import en from '@/i18n/en.json';
import ar from '@/i18n/ar.json';

const messages = { bn, en, ar };
const languages = [
  { code: 'bn', label: 'বাংলা' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' }
] as const;

export default async function LocalePage({
  params
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!Object.hasOwn(messages, locale)) return null;
  const copy = messages[locale as keyof typeof messages];

  return (
    <main className="page-shell">
      <header className="topbar">
        <p className="eyebrow">meUus ecosystem · Meta AI acting</p>
        <nav aria-label="Language" className="language-switcher">
          {languages.map((language) => (
            <Link aria-current={locale === language.code ? 'page' : undefined} href={`/${language.code}`} key={language.code}>
              {language.label}
            </Link>
          ))}
        </nav>
      </header>
      <section className="hero">
        <div>
          <p className="eyebrow">Bangladesh · coordinator workspace</p>
          <h1>{copy.app_title}</h1>
          <p className="intro">Evidence-linked community input for human review. No action is approved automatically.</p>
        </div>
        <Link className="primary-button" href={`/${locale}/new`}>＋ {copy.new_visit}</Link>
        <Link className="secondary-button" href={`/${locale}/ledger`}>{copy.action_ledger}</Link>
      </section>
      <section className="workspace-grid">
        <article className="panel">
          <div className="panel-heading"><span className="step">01</span><h2>{copy.new_visit}</h2></div>
          <p>{copy.upload_audio}</p>
          <p>{copy.upload_photo}</p>
          <p>{copy.transcript}</p>
        </article>
        <article className="panel">
          <div className="panel-heading"><span className="step">02</span><h2>{copy.draft_note}</h2></div>
          <p>{copy.action_ledger}</p>
          <p>{copy.missing_info}</p>
          <p>{copy.deadline_unknown}</p>
          <p>{copy.evidence}</p>
        </article>
      </section>
      <footer>Prototype scaffold · synthetic demo data only · human approval required</footer>
    </main>
  );
}
