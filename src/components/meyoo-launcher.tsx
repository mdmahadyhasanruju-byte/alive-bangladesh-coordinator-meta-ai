'use client';

import { useState } from 'react';
import { createDailyMicroActions } from '@/layers/action/tasks';

export function MeyooLauncher() {
  const [open, setOpen] = useState(false);
  const dailyAction = createDailyMicroActions()[0].title;
  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      {open && (
        <section className="mb-3 w-[260px] rounded-2xl border border-white/15 bg-slate-950 p-4 text-sm text-white shadow-2xl" aria-label="meYoo panel">
          <h2 className="font-semibold">Welcome to meUus</h2>
          <p className="mt-2 text-slate-300">Current insight: demo insights are illustrative until a person completes a consented assessment.</p>
          <p className="mt-3 text-slate-300">Today&apos;s action: {dailyAction}</p>
          <a className="mt-3 inline-block underline" href="/dashboard/assessment">Open reflection</a>
        </section>
      )}
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className="rounded-full bg-black px-5 py-3 font-semibold text-white shadow-lg ring-1 ring-white/20">
        meYoo
      </button>
    </div>
  );
}
