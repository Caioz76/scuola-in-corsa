/**
 * Gestione dello Schermo Intero per Web App su mobile e desktop.
 * Supporta Fullscreen API standard e prefissi webkit per iOS/Safari.
 */

export function isIPhone(): boolean {
  if (typeof navigator === 'undefined') return false;
  return (
    /iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1 && window.screen.height < 1000)
  );
}

export function isFullscreen(): boolean {
  const d = document as unknown as {
    fullscreenElement?: Element;
    webkitFullscreenElement?: Element;
  };
  return Boolean(d.fullscreenElement || d.webkitFullscreenElement);
}

export function showIPhoneFullscreenNotice(): void {
  if (document.getElementById('sic-iphone-fullscreen-modal')) return;
  const overlay = document.createElement('div');
  overlay.id = 'sic-iphone-fullscreen-modal';
  overlay.className = 'sic-dialog-overlay';
  overlay.style.zIndex = '3000';
  overlay.innerHTML = `
    <div class="sic-dialog-card" style="max-width: 440px;">
      <div class="sic-dialog-icon">📱</div>
      <h2 class="sic-dialog-title">Schermo intero su iPhone</h2>
      <p class="sic-dialog-sub" style="text-align: left; line-height: 1.5; margin-bottom: 16px;">
        Su <strong>iPhone Safari</strong> Apple non consente ai siti web di attivare lo schermo intero con un pulsante.<br><br>
        <strong>Come avere lo schermo intero senza barre:</strong><br>
        1. Tocca il tasto <strong>Condividi</strong> in basso (icona <strong>⎋</strong>)<br>
        2. Scegli <strong>"Aggiungi a Schermata Home"</strong><br>
        3. Avvia Talentopolis direttamente dalla schermata Home in modalità app nativa!
      </p>
      <div class="sic-dialog-buttons">
        <button type="button" class="sic-dialog-btn sic-dialog-btn-pri" id="sic-iphone-close">Ho capito</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('#sic-iphone-close')?.addEventListener('click', () => {
    overlay.remove();
  });
}

export async function toggleFullscreen(): Promise<boolean> {
  if (isIPhone()) {
    showIPhoneFullscreenNotice();
    return false;
  }

  const doc = document as unknown as {
    fullscreenElement?: Element;
    webkitFullscreenElement?: Element;
    exitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
  };
  const docEl = document.documentElement as unknown as {
    requestFullscreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
  };

  try {
    if (isFullscreen()) {
      if (typeof doc.exitFullscreen === 'function') {
        await doc.exitFullscreen();
      } else if (typeof doc.webkitExitFullscreen === 'function') {
        await doc.webkitExitFullscreen();
      }
      return false;
    } else {
      if (typeof docEl.requestFullscreen === 'function') {
        await docEl.requestFullscreen();
      } else if (typeof docEl.webkitRequestFullscreen === 'function') {
        await docEl.webkitRequestFullscreen();
      }
      return true;
    }
  } catch (err) {
    console.warn('Fullscreen non consentito o bloccato dal browser:', err);
    return isFullscreen();
  }
}
