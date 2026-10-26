'use client';

import type { FieldVisitRecord } from './demo-store';

export type ClientVisitRecord = Omit<FieldVisitRecord, 'audio'>;

const STORAGE_KEY = 'alive-demo-visits-v1';

export function readClientVisits(): ClientVisitRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const parsed: unknown = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed as ClientVisitRecord[] : [];
  } catch {
    return [];
  }
}

export function getClientVisit(id: string): ClientVisitRecord | undefined {
  return readClientVisits().find((record) => record.visit.id === id);
}

export function saveClientVisit(record: ClientVisitRecord): void {
  const visits = readClientVisits().filter((item) => item.visit.id !== record.visit.id);
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...visits]));
}
