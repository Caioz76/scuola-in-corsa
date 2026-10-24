/**
 * Gestione dello Schermo Intero per Web App su mobile e desktop.
 * Supporta Fullscreen API standard e prefissi webkit per iOS/Safari.
 */

export function isFullscreen(): boolean {
  const d = document as unknown as {
    fullscreenElement?: Element;
    webkitFullscreenElement?: Element;
  };
  return Boolean(d.fullscreenElement || d.webkitFullscreenElement);
}

export async function toggleFullscreen(): Promise<boolean> {
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
