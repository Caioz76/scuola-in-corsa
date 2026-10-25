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
  loadPlayerProgress
} from '../src/core/progress';
import { storage } from '../src/core/storage';

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
});
