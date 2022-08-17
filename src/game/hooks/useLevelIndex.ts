import { useMemo } from "react";

export default function useLevelIndex(levelIndex: string | undefined): number {
  return useMemo(() => (levelIndex && !Number.isNaN(levelIndex) ? +levelIndex : -1), [levelIndex]);
}
