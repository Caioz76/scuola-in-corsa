/**
 * Progressi per livello (stelle 0-3) + storico risultati per i report.
 */
import { storage } from './storage';
import type { GameResult } from './state';

export type Progress = Record<string, Record<string, number>>; // packId → levelId → stelle

export function loadProgress(): Progress {
  return storage.get<Progress>('progress', {});
}

export function setStars(packId: string, levelId: string, stars: number): void {
  const p = loadProgress();
  p[packId] = p[packId] ?? {};
  const cur = p[packId][levelId] ?? 0;
  if (stars > cur) p[packId][levelId] = stars;
  storage.set('progress', p);
}

export function starsFor(packId: string, levelId: string): number {
  return loadProgress()[packId]?.[levelId] ?? 0;
}

export function pushResult(r: GameResult): void {
  const hist = storage.get<GameResult[]>('history', []);
  hist.push(r);
  // max 200 risultati
  storage.set('history', hist.slice(-200));
}

export function loadHistory(): GameResult[] {
  return storage.get<GameResult[]>('history', []);
}
