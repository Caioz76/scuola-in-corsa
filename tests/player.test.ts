import { describe, it, expect, beforeEach } from 'vitest';
import { getPlayerName, setPlayerName } from '../src/core/player';
import { storage } from '../src/core/storage';

describe('Profilo giocatore e salvataggio nome', () => {
  beforeEach(() => {
    storage.del('player_name');
  });

  it('restituisce stringa vuota se nessun nome è memorizzato', () => {
    expect(getPlayerName()).toBe('');
  });

  it('salva e recupera il nome del giocatore', () => {
    setPlayerName('Marco');
    expect(getPlayerName()).toBe('Marco');
  });

  it('rimuove spazi superflui e tronca a 24 caratteri', () => {
    setPlayerName('   Alessandro Magno Re di Macedonia   ');
    expect(getPlayerName().length).toBeLessThanOrEqual(24);
    expect(getPlayerName().startsWith('Alessandro')).toBe(true);
  });
});
