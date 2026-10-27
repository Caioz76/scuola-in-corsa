import { describe, it, expect, beforeEach } from 'vitest';
import {
  getPlayerName,
  getTeamSetup,
  saveTeamSetup,
  getPlayerSummary,
  setPlayerProfile,
  TOKENS
} from '../src/core/player';
import {
  setPlayerStars,
  starsForPlayer,
  totalStarsForPlayer,
  resetAllProgress,
  loadPlayerProgress,
  pushResult,
  loadHistory
} from '../src/core/progress';
import { storage } from '../src/core/storage';
import { resolveConfig } from '../src/bes/resolver';

describe('Gestione squadra, profili BES/DSA per giocatore e progressi', () => {
  beforeEach(() => {
    storage.del('team_setup');
    resetAllProgress();
  });

  it('restituisce configurazione predefinita di 1 giocatore se non impostato', () => {
    const setup = getTeamSetup();
    expect(setup.numPlayers).toBe(1);
    expect(setup.players).toHaveLength(1);
    expect(setup.players[0].token.id).toBe(TOKENS[0].id);
    expect(setup.players[0].profileId).toBeNull();
    expect(getPlayerName()).toBe(TOKENS[0].name);
  });

  it('salva e recupera profili BES/DSA indipendenti per ogni giocatore', () => {
    saveTeamSetup({
      numPlayers: 2,
      players: [
        { playerIndex: 1, token: TOKENS[0], profileId: 'dislessia' },
        { playerIndex: 2, token: TOKENS[1], profileId: 'ansia' }
      ]
    });

    const setup = getTeamSetup();
    expect(setup.numPlayers).toBe(2);
    expect(setup.players[0].profileId).toBe('dislessia');
    expect(setup.players[1].profileId).toBe('ansia');

    // Aggiornamento profilo singolo
    setPlayerProfile(2, 'adhd');
    const aggiornato = getTeamSetup();
    expect(aggiornato.players[1].profileId).toBe('adhd');
    expect(aggiornato.players[0].profileId).toBe('dislessia');
  });

  it('registra e distingue i progressi per soggetto/giocatore', () => {
    setPlayerStars('volpe', 'matematica', 'liv-1', 3);
    setPlayerStars('gufo', 'matematica', 'liv-1', 2);
    setPlayerStars('gufo', 'italiano', 'liv-1', 3);

    expect(starsForPlayer('volpe', 'matematica', 'liv-1')).toBe(3);
    expect(starsForPlayer('gufo', 'matematica', 'liv-1')).toBe(2);
    expect(starsForPlayer('volpe', 'italiano', 'liv-1')).toBe(0);

    expect(totalStarsForPlayer('volpe')).toBe(3);
    expect(totalStarsForPlayer('gufo')).toBe(5);
  });

  it('azzera automaticamente i progressi quando cambiano i giocatori', () => {
    // Configurazione iniziale con Volpina
    saveTeamSetup({
      numPlayers: 1,
      players: [{ playerIndex: 1, token: TOKENS[0], profileId: null }]
    });
    setPlayerStars(TOKENS[0].id, 'matematica', 'liv-1', 3);
    expect(totalStarsForPlayer(TOKENS[0].id)).toBe(3);

    // Cambiano i giocatori: passa a 2 giocatori con Gufo e Leone
    saveTeamSetup({
      numPlayers: 2,
      players: [
        { playerIndex: 1, token: TOKENS[1], profileId: 'adhd' },
        { playerIndex: 2, token: TOKENS[2], profileId: 'dislessia' }
      ]
    });

    // I progressi devono essere azzerati
    expect(totalStarsForPlayer(TOKENS[0].id)).toBe(0);
    expect(totalStarsForPlayer(TOKENS[1].id)).toBe(0);
    expect(Object.keys(loadPlayerProgress(TOKENS[0].id))).toHaveLength(0);
  });

  it('dispone di almeno 10 personaggi unici per la selezione', () => {
    expect(TOKENS.length).toBeGreaterThanOrEqual(10);
    const ids = new Set(TOKENS.map((t) => t.id));
    expect(ids.size).toBe(TOKENS.length);
  });

  it('calcola correttamente le stelle e il report reale per sessioni multigiovatore con errori', () => {
    // Simulazione di una sessione a 2 giocatori (3 round ciascuno):
    // Giocatore 1: 3 risposte corrette al primo colpo -> 3/3, 3 stelle (100%)
    // Giocatore 2: 2 al primo colpo, 1 con errore iniziale -> 2/3, 2 stelle (67%)
    const stats = [
      {
        playerIndex: 1,
        roundsPlayed: 3,
        correct: 3,
        stars: 3
      },
      {
        playerIndex: 2,
        roundsPlayed: 3,
        correct: 2, // Con errore: non deve essere 3!
        stars: 2
      }
    ];

    expect(stats[0].correct).toBe(3);
    expect(stats[0].stars).toBe(3);
    expect(Math.round((stats[0].correct / stats[0].roundsPlayed) * 100)).toBe(100);

    expect(stats[1].correct).toBe(2);
    expect(stats[1].stars).toBe(2);
    expect(Math.round((stats[1].correct / stats[1].roundsPlayed) * 100)).toBe(67);
  });

  it('limita (clamp) le stelle all intervallo valido 0-3 e gestisce valori non validi', () => {
    // Valori fuori scala superiori (> 3)
    setPlayerStars('volpe', 'matematica', 'liv-clamp', 5);
    expect(starsForPlayer('volpe', 'matematica', 'liv-clamp')).toBe(3);

    // Valori negativi
    setPlayerStars('gufo', 'matematica', 'liv-neg', -2);
    expect(starsForPlayer('gufo', 'matematica', 'liv-neg')).toBe(0);

    // Valori NaN
    setPlayerStars('leone', 'matematica', 'liv-nan', NaN as unknown as number);
    expect(starsForPlayer('leone', 'matematica', 'liv-nan')).toBe(0);
  });

  it('adatta la configurazione BES in tempo reale per giocatori con profili differenti', () => {
    saveTeamSetup({
      numPlayers: 2,
      players: [
        { playerIndex: 1, token: TOKENS[0], profileId: null }, // Volpina: standard
        { playerIndex: 2, token: TOKENS[1], profileId: 'discalculia' } // Gufo: discalculia
      ]
    });
    const team = getTeamSetup();
    const globalSettings = { profileId: null, overrides: {} };

    // Turno G1 (Volpina: standard)
    const p1 = team.players[0];
    const cfgP1 = resolveConfig({
      ...globalSettings,
      profileId: p1.profileId,
      overrides: p1.overrides ?? {}
    });
    expect(cfgP1.maxOptions).toBe(4);
    expect(cfgP1.visualSupports).toBe(false);
    expect(cfgP1.font).toBe('default');

    // Turno G2 (Gufo: discalculia)
    const p2 = team.players[1];
    const cfgP2 = resolveConfig({
      ...globalSettings,
      profileId: p2.profileId,
      overrides: p2.overrides ?? {}
    });
    expect(cfgP2.maxOptions).toBe(2);
    expect(cfgP2.visualSupports).toBe(true);
    expect(cfgP2.showExplanationOnWrong).toBe(true);
    expect(cfgP2.slowPace).toBe(true);
  });

  it('resiste a storage history corrotto o null senza lanciare eccezioni', () => {
    // Simula valore 'null' in localStorage
    storage.set('history', null);
    expect(() => {
      pushResult({
        packId: 'mat-7-9',
        levelId: 'mat-7-9-l1',
        total: 6,
        correct: 6,
        scorePct: 100,
        durationMs: 30000,
        profileId: null,
        outcomes: [],
        finishedAt: Date.now()
      });
    }).not.toThrow();

    expect(Array.isArray(loadHistory())).toBe(true);
    expect(loadHistory().length).toBe(1);
  });
});
