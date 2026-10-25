/**
 * Gestione del profilo e del nome del giocatore per il salvataggio locale dei progressi.
 */

import { storage } from './storage';

const K_NAME = 'player_name';

export function getPlayerName(): string {
  return storage.get<string>(K_NAME, '').trim();
}

export function setPlayerName(name: string): void {
  const pulito = name.trim().slice(0, 24);
  if (pulito) {
    storage.set(K_NAME, pulito);
    try {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('sic:player_change', { detail: pulito }));
      }
    } catch {
      // ambiente headless
    }
  }
}

/**
 * Mostra un modale HTML moderno e accessibile per inserire o modificare il nome del bambino.
 * Funziona nativamente sia su desktop sia su smartphone.
 */
export function openNameDialog(onSuccess?: (name: string) => void): void {
  document.getElementById('sic-name-dialog')?.remove();

  const current = getPlayerName();

  const overlay = document.createElement('div');
  overlay.id = 'sic-name-dialog';
  overlay.className = 'sic-dialog-overlay';

  const modal = document.createElement('div');
  modal.className = 'sic-dialog-card';
  modal.innerHTML = `
    <div class="sic-dialog-icon">⭐</div>
    <h2 class="sic-dialog-title">${current ? 'Profilo Giocatore' : 'Benvenuto in Scuola in Corsa!'}</h2>
    <p class="sic-dialog-sub">Inserisci il tuo nome per salvare tappe, stelle e progressi:</p>
    <div class="sic-dialog-input-wrap">
      <input
        type="text"
        id="sic-player-input"
        class="sic-dialog-input"
        placeholder="Il tuo nome (es. Marco)"
        maxlength="20"
        value="${current}"
        autocomplete="given-name"
      />
    </div>
    <div class="sic-dialog-buttons">
      ${current ? '<button type="button" id="sic-dialog-cancel" class="sic-dialog-btn sic-dialog-btn-sec">Annulla</button>' : ''}
      <button type="button" id="sic-dialog-save" class="sic-dialog-btn sic-dialog-btn-pri">Salva e Gioca</button>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  const input = modal.querySelector<HTMLInputElement>('#sic-player-input');
  const btnSave = modal.querySelector<HTMLButtonElement>('#sic-dialog-save');
  const btnCancel = modal.querySelector<HTMLButtonElement>('#sic-dialog-cancel');

  setTimeout(() => input?.focus(), 80);

  const chiudi = () => {
    overlay.remove();
  };

  const salva = () => {
    const val = input?.value.trim() || (current ? current : 'Campione');
    setPlayerName(val);
    chiudi();
    if (onSuccess) onSuccess(val);
  };

  btnSave?.addEventListener('click', (ev) => {
    ev.preventDefault();
    salva();
  });

  input?.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      salva();
    } else if (ev.key === 'Escape' && current) {
      ev.preventDefault();
      chiudi();
    }
  });

  btnCancel?.addEventListener('click', (ev) => {
    ev.preventDefault();
    chiudi();
  });
}
