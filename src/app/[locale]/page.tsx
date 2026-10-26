'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

const languages = [
  { code: 'bn', label: 'বাংলা' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' }
];

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <main className="page-shell">
      <header className="topbar">
        <p className="eyebrow">meUus ecosystem · Meta AI acting</p>
        <nav aria-label="Language" className="language-switcher">
          {languages.map((language) => (
            <Link
              aria-current={locale === language.code ? 'page' : undefined}
              href={`/${language.code}`}
              key={language.code}
            >
              {language.label}
            </Link>
          ))}
        </nav>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">Bangladesh · coordinator workspace</p>
          <h1>{t('app_title')}</h1>
          <p className="intro">
            Community input becomes an evidence-linked draft for a person to review. No action is approved automatically.
          </p>
        </div>
        <button className="primary-button" type="button">＋ {t('new_visit')}</button>
      </section>

      <section aria-label={t('new_visit')} className="workspace-grid">
        <article className="panel input-panel">
          <div className="panel-heading"><span className="step">01</span><h2>{t('new_visit')}</h2></div>
          <label className="upload-card">
            <span className="upload-icon">♫</span>
            <strong>{t('upload_audio')}</strong>
            <small>Audio is optional. Consent is required before recording or processing.</small>
            <input accept="audio/*" aria-label={t('upload_audio')} type="file" />
          </label>
          <label className="upload-card compact">
            <span className="upload-icon">＋</span>
            <strong>{t('upload_photo')}</strong>
            <input accept="image/*" aria-label={t('upload_photo')} type="file" />
          </label>
          <label className="field-label" htmlFor="visit-note">{t('transcript')}</label>
          <textarea id="visit-note" placeholder="Synthetic demo only — no real participant data." rows={4} />
        </article>

        <article className="panel draft-panel">
          <div className="panel-heading"><span className="step">02</span><h2>{t('draft_note')}</h2></div>
          <div className="status-pill"><span /> Draft · awaiting human review</div>
          <div className="draft-block">
            <span className="field-label">{t('action_ledger')}</span>
            <p className="placeholder">A draft will appear here after evidence has been reviewed.</p>
          </div>
          <div className="draft-block">
            <span className="field-label">{t('missing_info')}</span>
            <p className="placeholder">—</p>
          </div>
          <div className="evidence-row"><span>↗</span> {t('evidence')} <span className="muted">No source attached</span></div>
          <p className="deadline-note">{t('deadline_unknown')}</p>
          <div className="review-actions">
            <button className="approve-button" disabled type="button">{t('approve')}</button>
            <button className="quiet-button" disabled type="button">{t('correct')}</button>
            <button className="quiet-button" disabled type="button">{t('reject')}</button>
          </div>
        </article>
      </section>
      <footer>Prototype scaffold · synthetic demo data only · human approval required</footer>
    </main>
  );
}
