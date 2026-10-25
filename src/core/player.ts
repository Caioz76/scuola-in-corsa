/**
 * Gestione dei giocatori e della selezione da 1 a 4 personaggi in stile Monopoli.
 * Nessuna digitazione tastiera richiesta: selezione rapida, visiva e adatta ai bambini.
 */

import { storage } from './storage';

export interface PlayerToken {
  id: string;
  name: string;
  icon: string;
  color: string;
  bg: string;
  desc: string;
}

export const TOKENS: PlayerToken[] = [
  { id: 'volpe', name: 'Volpina Sprint', icon: '🦊', color: '#ff6b35', bg: '#fff0eb', desc: 'Curiosa e scattante' },
  { id: 'gufo', name: 'Gufo Saggio', icon: '🦉', color: '#8b5cf6', bg: '#f5f3ff', desc: 'Sapiente e attento' },
  { id: 'leone', name: 'Leoncino Leo', icon: '🦁', color: '#f59e0b', bg: '#fffbeb', desc: 'Intrepido ed energico' },
  { id: 'coniglio', name: 'Leprotto Lampo', icon: '🐰', color: '#ec4899', bg: '#fdf2f8', desc: 'Super veloce nei salti' },
  { id: 'panda', name: 'Panda Zen', icon: '🐼', color: '#10b981', bg: '#ecfdf5', desc: 'Calmo e concentrato' },
  { id: 'delfino', name: 'Delfino Tuffo', icon: '🐬', color: '#06b6d4', bg: '#ecfeff', desc: 'Agile e giocherellone' },
  { id: 'razzo', name: 'Razzo Cosmico', icon: '🚀', color: '#3b82f6', bg: '#eff6ff', desc: 'Esploratore delle stelle' },
  { id: 'matita', name: 'Matita Magica', icon: '✏️', color: '#eab308', bg: '#fefce8', desc: 'Genio della fantasia' },
  { id: 'dino', name: 'Dino Sprint', icon: '🦖', color: '#16a34a', bg: '#f0fdf4', desc: 'Simpatico e tenace' },
  { id: 'stella', name: 'Super Stella', icon: '⭐', color: '#e11d48', bg: '#fff1f2', desc: 'Luminosa e brillante' }
];

export interface ActivePlayer {
  playerIndex: number; // 1, 2, 3, 4
  token: PlayerToken;
}

export interface TeamSetup {
  numPlayers: number; // 1 to 4
  players: ActivePlayer[];
}

const K_TEAM = 'team_setup';

export function getTeamSetup(): TeamSetup {
  const saved = storage.get<TeamSetup | null>(K_TEAM, null);
  if (saved && saved.numPlayers >= 1 && saved.numPlayers <= 4 && Array.isArray(saved.players) && saved.players.length === saved.numPlayers) {
    return saved;
  }
  // Default: 1 giocatore con Volpina Sprint
  return {
    numPlayers: 1,
    players: [{ playerIndex: 1, token: TOKENS[0] }]
  };
}

export function saveTeamSetup(setup: TeamSetup): void {
  storage.set(K_TEAM, setup);
  try {
    localStorage.setItem('sic.team_setup', JSON.stringify(setup));
    window.dispatchEvent(new CustomEvent('sic:player_change', { detail: setup }));
  } catch {
    // storage non accessibile
  }
}

export function getPlayerSummary(): string {
  const setup = getTeamSetup();
  if (setup.numPlayers === 1) {
    return `${setup.players[0].token.icon} ${setup.players[0].token.name}`;
  }
  const icons = setup.players.map((p) => `${p.token.icon} G${p.playerIndex}`).join(' · ');
  return `👥 ${setup.numPlayers} Giocatori (${icons})`;
}

export function getPlayerName(): string {
  const setup = getTeamSetup();
  return setup.players[0]?.token.name ?? 'Campione';
}

export function setPlayerName(_name: string): void {
  // Mantenuto per compatibilità con test esistenti
}

let lastClosedTime = 0;
let isOpening = false;

/**
 * Modale grafico per selezionare da 1 a 4 giocatori e per ognuno il personaggio (stile Monopoli).
 */
export function openPlayerSelectionDialog(onSuccess?: (setup: TeamSetup) => void): void {
  if (isOpening || Date.now() - lastClosedTime < 350) return;
  if (document.getElementById('sic-player-dialog')) return;

  isOpening = true;
  const currentSetup = getTeamSetup();
  let currentNum = currentSetup.numPlayers;
  // Mappa di assegnazione: per ogni giocatore (1..4) il relativo token
  let chosenTokens: PlayerToken[] = [...currentSetup.players.map((p) => p.token)];

  // Assicurati che ci siano abbastanza token diversi se numPlayers viene alzato
  while (chosenTokens.length < 4) {
    const nextAvail = TOKENS.find((t) => !chosenTokens.some((c) => c.id === t.id)) || TOKENS[chosenTokens.length % TOKENS.length];
    chosenTokens.push(nextAvail);
  }

  let activeSlot = 1; // Giocatore attualmente in modifica token (1..currentNum)

  const overlay = document.createElement('div');
  overlay.id = 'sic-player-dialog';
  overlay.className = 'sic-dialog-overlay';

  const modal = document.createElement('div');
  modal.className = 'sic-dialog-card sic-team-card';

  const renderModalContent = () => {
    modal.innerHTML = `
      <div class="sic-dialog-icon">🎮</div>
      <h2 class="sic-dialog-title">Chi Gioca?</h2>
      <p class="sic-dialog-sub">Scegli il numero di giocatori e il personaggio per ciascuno:</p>
      
      <!-- Scelta Numero Giocatori (1..4) -->
      <div class="sic-players-count-row">
        ${[1, 2, 3, 4]
          .map(
            (n) => `
          <button type="button" class="sic-count-btn ${n === currentNum ? 'is-selected' : ''}" data-count="${n}">
            <span class="sic-count-icon">${n === 1 ? '👤' : n === 2 ? '👥' : n === 3 ? '👥👤' : '👥👥'}</span>
            <span class="sic-count-label">${n} Giocatore${n > 1 ? 'i' : ''}</span>
          </button>
        `
          )
          .join('')}
      </div>

      <!-- Schede Giocatori Attivi con Personaggio Scelto -->
      <div class="sic-slots-row">
        ${Array.from({ length: currentNum }, (_, i) => i + 1)
          .map((idx) => {
            const tok = chosenTokens[idx - 1];
            const isEditing = activeSlot === idx;
            return `
            <button type="button" class="sic-slot-card ${isEditing ? 'is-editing' : ''}" data-slot="${idx}" style="border-color: ${tok.color};">
              <span class="sic-slot-num" style="background: ${tok.color};">G${idx}</span>
              <span class="sic-slot-icon">${tok.icon}</span>
              <span class="sic-slot-name">${tok.name}</span>
            </button>
          `;
          })
          .join('')}
      </div>

      <div class="sic-token-picker-header">
        Tocca un personaggio per <strong>Giocatore ${activeSlot}</strong>:
      </div>

      <!-- Elenco Personaggi Stile Monopoli -->
      <div class="sic-tokens-grid">
        ${TOKENS.map((t) => {
          const ownerIdx = chosenTokens.slice(0, currentNum).findIndex((c) => c.id === t.id);
          const isTakenByOther = ownerIdx >= 0 && ownerIdx !== activeSlot - 1;
          const isSelectedByCurrent = chosenTokens[activeSlot - 1]?.id === t.id;
          return `
            <button 
              type="button" 
              class="sic-token-choice ${isSelectedByCurrent ? 'is-active' : ''} ${isTakenByOther ? 'is-taken' : ''}" 
              data-token-id="${t.id}"
              ${isTakenByOther ? 'disabled' : ''}
              style="--token-color: ${t.color};"
            >
              <span class="sic-token-icon">${t.icon}</span>
              <span class="sic-token-title">${t.name}</span>
              <span class="sic-token-desc">${isTakenByOther ? `Preso da G${ownerIdx + 1}` : t.desc}</span>
            </button>
          `;
        }).join('')}
      </div>

      <!-- Pulsanti Azione -->
      <div class="sic-dialog-buttons" style="margin-top: 18px;">
        <button type="button" id="sic-team-save" class="sic-dialog-btn sic-dialog-btn-pri">
          ✨ Conferma Squadra e Gioca
        </button>
      </div>
    `;

    // Handler Scelta Numero Giocatori
    modal.querySelectorAll<HTMLButtonElement>('.sic-count-btn').forEach((btn) => {
      btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        const cnt = parseInt(btn.dataset.count || '1', 10);
        currentNum = cnt;
        if (activeSlot > currentNum) activeSlot = 1;
        renderModalContent();
      });
    });

    // Handler Scelta Slot da Modificare
    modal.querySelectorAll<HTMLButtonElement>('.sic-slot-card').forEach((btn) => {
      btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        activeSlot = parseInt(btn.dataset.slot || '1', 10);
        renderModalContent();
      });
    });

    // Handler Scelta Personaggio
    modal.querySelectorAll<HTMLButtonElement>('.sic-token-choice:not([disabled])').forEach((btn) => {
      btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        const tokId = btn.dataset.tokenId;
        const found = TOKENS.find((t) => t.id === tokId);
        if (found) {
          chosenTokens[activeSlot - 1] = found;
          // Se ci sono altri giocatori, avanza automaticamente al successivo per comodità
          if (activeSlot < currentNum) {
            activeSlot++;
          }
          renderModalContent();
        }
      });
    });

    // Handler Salva
    modal.querySelector<HTMLButtonElement>('#sic-team-save')?.addEventListener('click', (ev) => {
      ev.preventDefault();
      const finalSetup: TeamSetup = {
        numPlayers: currentNum,
        players: Array.from({ length: currentNum }, (_, i) => ({
          playerIndex: i + 1,
          token: chosenTokens[i]
        }))
      };
      saveTeamSetup(finalSetup);
      chiudi(() => {
        if (onSuccess) onSuccess(finalSetup);
      });
    });
  };

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  renderModalContent();

  setTimeout(() => {
    isOpening = false;
  }, 100);

  let chiuso = false;
  const chiudi = (callback?: () => void) => {
    if (chiuso) return;
    chiuso = true;
    lastClosedTime = Date.now();
    overlay.style.pointerEvents = 'none';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.14s ease';
    setTimeout(() => {
      overlay.remove();
      if (callback) callback();
    }, 140);
  };
}

/** Compatibilità con codice precedente che chiamava openNameDialog */
export const openNameDialog = (cb?: (name: string) => void): void => {
  openPlayerSelectionDialog((setup) => {
    if (cb) cb(setup.players[0].token.name);
  });
};
