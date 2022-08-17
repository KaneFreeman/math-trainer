import { useMemo } from 'react';
import { Level } from '../../interface';
import LEVELS from '../levels';

export default function useLevel(section: string | undefined, index: number): Level | null {
  return useMemo(() => {
    if (!section || !(section in LEVELS)) {
      return null;
    }

    if (LEVELS[section].length <= index || index < 0) {
      return null;
    }

    return LEVELS[section][index];
  }, [index, section]);
}
