/**
 * Progressi per livello (stelle 0-3) divisi per giocatore/soggetto + storico risultati.
 */
import { storage } from './storage';
import type { GameResult } from './state';

export type Progress = Record<string, Record<string, number>>; // packId → levelId → stelle
export type PlayersProgress = Record<string, Progress>; // playerKey (tokenId o playerIndex) → Progress

const K_PROGRESS = 'progress';
const K_PLAYERS_PROGRESS = 'players_progress';
const K_HISTORY = 'history';

export function loadAllPlayersProgress(): PlayersProgress {
  return storage.get<PlayersProgress>(K_PLAYERS_PROGRESS, {});
}

export function loadPlayerProgress(playerId: string): Progress {
  const all = loadAllPlayersProgress();
  return all[playerId] ?? {};
}

export function setPlayerStars(playerId: string, packId: string, levelId: string, stars: number): void {
  const all = loadAllPlayersProgress();
  const playerProg = all[playerId] ?? {};
  playerProg[packId] = playerProg[packId] ?? {};
  const cur = playerProg[packId][levelId] ?? 0;
  if (stars > cur) {
    playerProg[packId][levelId] = stars;
  }
  all[playerId] = playerProg;
  storage.set(K_PLAYERS_PROGRESS, all);

  // Sincronizza anche il progresso globale/legacy con il massimo delle stelle ottenute dalla squadra
  setStars(packId, levelId, stars);
}

export function starsForPlayer(playerId: string, packId: string, levelId: string): number {
  return loadPlayerProgress(playerId)[packId]?.[levelId] ?? 0;
}

export function totalStarsForPlayer(playerId: string): number {
  const prog = loadPlayerProgress(playerId);
  let total = 0;
  for (const pack of Object.values(prog)) {
    for (const stars of Object.values(pack)) {
      total += stars;
    }
  }
  return total;
}

/** Progresso legacy / globale aggregato */
export function loadProgress(): Progress {
  return storage.get<Progress>(K_PROGRESS, {});
}

export function setStars(packId: string, levelId: string, stars: number): void {
  const p = loadProgress();
  p[packId] = p[packId] ?? {};
  const cur = p[packId][levelId] ?? 0;
  if (stars > cur) p[packId][levelId] = stars;
  storage.set(K_PROGRESS, p);
}

export function starsFor(packId: string, levelId: string): number {
  return loadProgress()[packId]?.[levelId] ?? 0;
}

/**
 * Azzera tutti i progressi e la cronologia (richiesto quando cambiano i giocatori).
 */
export function resetAllProgress(): void {
  storage.set(K_PROGRESS, {});
  storage.set(K_PLAYERS_PROGRESS, {});
  storage.set(K_HISTORY, []);
  try {
    localStorage.removeItem('sic.progress');
    localStorage.removeItem('sic.players_progress');
    localStorage.removeItem('sic.history');
  } catch {
    // ignora se localStorage non accessibile
  }
}

export function pushResult(r: GameResult): void {
  const hist = storage.get<GameResult[]>(K_HISTORY, []);
  hist.push(r);
  // max 200 risultati
  storage.set(K_HISTORY, hist.slice(-200));
}

export function loadHistory(): GameResult[] {
  return storage.get<GameResult[]>(K_HISTORY, []);
}
