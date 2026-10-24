export type Materia = 'matematica' | 'italiano' | 'scienze' | 'storia';

let materiaAttiva: Materia | null = null;
let livelloAttivo: string | null = null;

export function setMateria(m: Materia): void {
  materiaAttiva = m;
}

export function getMateria(): Materia | null {
  return materiaAttiva;
}

/** Tappa scelta (null = prima tappa del pacchetto). */
export function setLevel(id: string | null): void {
  livelloAttivo = id;
}

export function getLevel(): string | null {
  return livelloAttivo;
}
