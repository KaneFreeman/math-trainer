export const MAX_APP_WIDTH = 400;

export const ADDITION = 'addition';
export const SUBTRACTION = 'subtraction';
export const MULTIPLICATION = 'multiplication';
export const DIVISION = 'division';
export type BasicMathQuestionType = typeof ADDITION | typeof SUBTRACTION | typeof MULTIPLICATION | typeof DIVISION;
export type QuestionType = BasicMathQuestionType;

export function toQuestionType(raw: string | undefined): QuestionType | null {
  switch (raw) {
    case ADDITION:
    case SUBTRACTION:
    case MULTIPLICATION:
    case DIVISION:
      return raw;
    default:
      return null;
  }
}

export interface BaseQuestion {
  type: QuestionType;
  answer: number;
}

export interface BasicMathQuestion extends BaseQuestion {
  type: BasicMathQuestionType;
  a: number;
  b: number;
}

export type Question = BasicMathQuestion;

export interface Level {
  id: string;
  name: string;
  questions: Question[];
}

export interface LevelScore {
  levelId: string;
  score: number;
  completed: boolean;
}
