/* eslint-disable no-param-reassign */
import { ADDITION, Level, SUBTRACTION } from '../../interface';
import ADDITION_LEVELS from './addition';
import SUBTRACTION_LEVELS from './subtraction';

const LEVELS: Record<string, Level[]> = {
  [ADDITION]: ADDITION_LEVELS,
  [SUBTRACTION]: SUBTRACTION_LEVELS,
};

export default LEVELS;
