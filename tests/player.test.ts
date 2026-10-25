import { describe, it, expect, beforeEach } from 'vitest';
import { getPlayerName, getTeamSetup, saveTeamSetup, getPlayerSummary, TOKENS } from '../src/core/player';
import { storage } from '../src/core/storage';

describe('Gestione squadra e pedine stile Monopoli (1-4 giocatori)', () => {
  beforeEach(() => {
    storage.del('team_setup');
  });

  it('restituisce configurazione predefinita di 1 giocatore se non impostato', () => {
    const setup = getTeamSetup();
    expect(setup.numPlayers).toBe(1);
    expect(setup.players).toHaveLength(1);
    expect(setup.players[0].token.id).toBe(TOKENS[0].id);
    expect(getPlayerName()).toBe(TOKENS[0].name);
  });

  it('salva e recupera configurazione per più giocatori', () => {
    saveTeamSetup({
      numPlayers: 3,
      players: [
        { playerIndex: 1, token: TOKENS[0] },
        { playerIndex: 2, token: TOKENS[1] },
        { playerIndex: 3, token: TOKENS[2] },
      ],
    });

    const setup = getTeamSetup();
    expect(setup.numPlayers).toBe(3);
    expect(setup.players).toHaveLength(3);
    expect(setup.players[1].token.name).toBe('Gufo Saggio');
  });

  it('fornisce un riassunto chiaro e compatto dei giocatori', () => {
    saveTeamSetup({
      numPlayers: 1,
      players: [{ playerIndex: 1, token: TOKENS[0] }],
    });
    expect(getPlayerSummary()).toContain('Volpina Sprint');

    saveTeamSetup({
      numPlayers: 2,
      players: [
        { playerIndex: 1, token: TOKENS[0] },
        { playerIndex: 2, token: TOKENS[1] },
      ],
    });
    expect(getPlayerSummary()).toContain('2 Giocatori');
  });

  it('dispone di almeno 10 personaggi unici per la selezione', () => {
    expect(TOKENS.length).toBeGreaterThanOrEqual(10);
    const ids = new Set(TOKENS.map((t) => t.id));
    expect(ids.size).toBe(TOKENS.length);
  });
});
