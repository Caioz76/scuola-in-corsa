export type Materia = 'matematica' | 'italiano' | 'scienze' | 'storia';

let materiaAttiva: Materia | null = null;

export function setMateria(m: Materia): void {
  materiaAttiva = m;
}

export function getMateria(): Materia | null {
  return materiaAttiva;
}
