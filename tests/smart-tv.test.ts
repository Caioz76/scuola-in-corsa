import { describe, expect, it } from 'vitest';
import { isSmartTV, isSmartphone } from '../src/ui/device';

describe('Rilevamento Smart TV e dispositivi a grande schermo', () => {
  const SMART_TV_UAS = [
    // Samsung Smart TV (Tizen)
    'Mozilla/5.0 (SMART-TV; Linux; Tizen 5.0) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/2.2 Chrome/63.0.3239.84 TV Safari/537.36',
    'Mozilla/5.0 (SMART-TV; Linux; Tizen 6.0) AppleWebKit/538.1 (KHTML, like Gecko) Version/6.0 TV Safari/538.1',
    // LG Smart TV (webOS / Web0S)
    'Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36 WebAppManager',
    'Mozilla/5.0 (webOS; SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.0 Safari/537.36',
    // Sony BRAVIA / Android TV / Google TV
    'Mozilla/5.0 (Linux; Android 10; BRAVIA 4K VH2 Build/QTG3.200305.006.S29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',
    'Mozilla/5.0 (Linux; U; Android 9; en-us; AFTMM Build/PS7273) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.149 Safari/537.36',
    'Mozilla/5.0 (Large Screen; SmartTV; GoogleTV) AppleWebKit/537.36 Chrome/88.0.4324.93',
    // Apple TV
    'AppleTV11,1/11.1',
    // HbbTV / Philips / Hisense
    'HbbTV/1.2.1 (+PVR; Hisense; SMART-TV; ...)',
    // Roku
    'Roku/DVP-9.10 (519.10E04111A)'
  ];

  const NON_TV_UAS = [
    // iPhone
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    // Android Phone
    'Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
    // Desktop macOS Chrome
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    // Desktop Windows Firefox
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0'
  ];

  it('riconosce con precisione tutti i modelli e browser Smart TV', () => {
    const originalNavigator = global.navigator;
    try {
      for (const tvUa of SMART_TV_UAS) {
        Object.defineProperty(global, 'navigator', {
          value: { userAgent: tvUa },
          configurable: true,
          writable: true
        });
        expect(isSmartTV(), `Dovrebbe riconoscere come Smart TV: ${tvUa}`).toBe(true);
      }
    } finally {
      Object.defineProperty(global, 'navigator', {
        value: originalNavigator,
        configurable: true,
        writable: true
      });
    }
  });

  it('non confonde smartphone o browser desktop per Smart TV', () => {
    const originalNavigator = global.navigator;
    try {
      for (const nonTv of NON_TV_UAS) {
        Object.defineProperty(global, 'navigator', {
          value: { userAgent: nonTv },
          configurable: true,
          writable: true
        });
        expect(isSmartTV(), `Non deve identificare come Smart TV: ${nonTv}`).toBe(false);
      }
    } finally {
      Object.defineProperty(global, 'navigator', {
        value: originalNavigator,
        configurable: true,
        writable: true
      });
    }
  });

  it('non classifica una Smart TV con viewport 960x540 come smartphone', () => {
    // Tipica risoluzione logica di una Smart TV 1080p scalata a 540p
    const tvUa = 'Mozilla/5.0 (SMART-TV; Linux; Tizen 6.0) AppleWebKit/537.36 Chrome/68.0 TV Safari/537.36';
    const isPhone = isSmartphone({
      vw: 960,
      vh: 540,
      isTouch: true,
      userAgent: tvUa
    });
    expect(isPhone).toBe(false);
  });

  it('classifica correttamente un vero smartphone in orizzontale', () => {
    const phoneUa = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1';
    const isPhone = isSmartphone({
      vw: 844,
      vh: 390,
      isTouch: true,
      userAgent: phoneUa
    });
    expect(isPhone).toBe(true);
  });
});
