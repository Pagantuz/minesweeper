import { TCell } from '../types/Cell';

const phases: TCell['icon'][] = [undefined, 'flag', 'question'];

const getNextIcon = (icon: TCell['icon']): TCell['icon'] => {
  const currentIndex = phases.findIndex((phase) => phase === icon);
  const nextIndex = currentIndex + 1 === phases.length ? 0 : currentIndex + 1;
  return phases[nextIndex];
};

export { getNextIcon };
