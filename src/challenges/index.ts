/**
 * Punto d'ingresso del layer "prove": dato un round, crea la challenge
 * giusta (quiz/immagine → scelta; sort/sequence → ordine; match → abbina).
 */
import type Phaser from 'phaser';
import type { EffectiveConfig } from '../bes/resolver';
import type { Round } from '../content/types';
import { ChoiceChallenge } from './choice';
import { MatchChallenge } from './match';
import { OrderChallenge } from './order';
import { RunnerChallenge, type RunnerWorld } from './runner';
import type { GiocoMode } from '../bes/resolver';
import type { Challenge, ChallengeCallbacks } from './ui';

export * from './ui';
export * from './choice';
export * from './order';
export * from './match';
export * from './runner';

/** Crea e mostra la challenge per il round. La scena gestisce banner e avanzamento. */
export function showChallenge(
  scene: Phaser.Scene,
  round: Round,
  cfg: EffectiveConfig,
  cb: ChallengeCallbacks,
  opts: { mode?: GiocoMode; world?: RunnerWorld | null } = {}
): Challenge {
  // In modalità Runner le prove a scelta diventano cartelli sulla pista.
  // Le altre (riordino, abbinamento) restano come sono: non hanno un
  // equivalente onesto in corsa, e fingersi uguali sarebbe peggio.
  if (opts.mode === 'runner' && (round.type === 'quiz' || round.type === 'image')) {
    return new RunnerChallenge(scene, round, cfg, cb, opts.world ?? null);
  }
  switch (round.type) {
    case 'quiz':
    case 'image':
      return new ChoiceChallenge(scene, round, cfg, cb);
    case 'dragdrop':
      if (round.mode === 'match') return new MatchChallenge(scene, round, cfg, cb);
      return new OrderChallenge(scene, round, cfg, cb);
    case 'sequence':
      return new OrderChallenge(scene, round, cfg, cb);
    default:
      throw new Error(`tipo round non gestito: ${String((round as Round).type)}`);
  }
}
