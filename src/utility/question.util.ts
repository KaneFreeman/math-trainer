import { ADDITION, BasicMathQuestion, BasicMathQuestionType, Question, QuestionType } from '../interface';
import { randomIntFromInterval } from './number.util';

const FULL_RANGE_CHANGE = 0.5;
const LEVEL_INCREMENT = 4;

function generateAdditionQuestion(level: number): BasicMathQuestion {
  let min = 0 + level * LEVEL_INCREMENT;
  if (Math.random() < FULL_RANGE_CHANGE) {
    min = 0;
  }

  const max = LEVEL_INCREMENT + level * LEVEL_INCREMENT;

  const firstNumber = randomIntFromInterval(min, max);
  const secondNumber = randomIntFromInterval(0, Math.min(9, max));

  if (Math.random() < 0.5) {
    return {
      a: firstNumber,
      b: secondNumber,
      answer: firstNumber + secondNumber,
      type: ADDITION
    };
  }

  return {
    a: secondNumber,
    b: firstNumber,
    answer: firstNumber + secondNumber,
    type: ADDITION
  };
}

export function generateQuestion(type: BasicMathQuestionType, level: number): BasicMathQuestion | null;
export function generateQuestion(type: QuestionType, level: number): Question | null {
  switch (type) {
    case ADDITION:
      return generateAdditionQuestion(level);
    default:
      return null;
  }
}
