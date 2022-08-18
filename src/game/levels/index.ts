/* eslint-disable no-param-reassign */
import { ADDITION, Level, SUBTRACTION } from '../../interface';
import ADDITION_LEVELS from './addition';
import SUBTRACTION_LEVELS from './subtraction';

export interface Levels {
  levels: Level[];
  hasOneMinuteChallenge: boolean;
}

const LEVELS: Record<string, Levels> = {
  [ADDITION]: {
    levels: ADDITION_LEVELS,
    hasOneMinuteChallenge: true
  },
  [SUBTRACTION]: {
    levels: SUBTRACTION_LEVELS,
    hasOneMinuteChallenge: false
  }
};

export default LEVELS;
