/**
 * Rilevamento tipologia dispositivo (Smart TV, Mobile, Desktop).
 * Modulo puro senza dipendenze Phaser/Canvas.
 */

/**
 * Rileva se il client è una Smart TV o un dispositivo TV/Set-Top-Box.
 * Su Smart TV il display è sempre orizzontale (16:9) e non deve MAI comparire
 * il banner che richiede di ruotare lo schermo in verticale.
 */
export function isSmartTV(userAgent?: string): boolean {
  const ua = userAgent ?? (typeof navigator !== 'undefined' ? navigator.userAgent : '') ?? '';
  return /SmartTV|Tizen|webOS|Web0S|Internet\.TV|NetCast|NETTV|AppleTV|boxee|Kylo|Roku|DLNADOC|CE-HTML|HbbTV|GoogleTV|Android.*TV|BRAVIA|Viera|Hisense|AFT[SBM]|MiTV|POV_TV|CrKey/i.test(
    ua
  );
}

/**
 * Rileva se il client è uno smartphone (touchscreen compatto, UA mobile, non Smart TV).
 */
export function isSmartphone(options: {
  vw: number;
  vh: number;
  isTouch?: boolean;
  userAgent?: string;
}): boolean {
  if (isSmartTV(options.userAgent)) return false;
  const ua = options.userAgent ?? (typeof navigator !== 'undefined' ? navigator.userAgent : '') ?? '';
  const isMobileUa = /Mobi|iPhone|iPod|Android.*Mobile/i.test(ua);
  const minDim = Math.min(options.vw, options.vh);
  const touch = options.isTouch ?? (typeof navigator !== 'undefined' && (navigator.maxTouchPoints > 0 || 'ontouchstart' in (typeof window !== 'undefined' ? window : {})));
  return Boolean(touch && isMobileUa && minDim <= 768);
}
