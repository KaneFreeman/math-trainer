import { ADDITION, Level } from '../../interface';

const ADDITION_LEVELS: Level[] = [
  {
    id: 'addition-1',
    name: 'Level 1',
    questions: [
      {
        type: ADDITION,
        a: 1,
        b: 2,
        answer: 3
      },
      {
        type: ADDITION,
        a: 2,
        b: 1,
        answer: 3
      },
      {
        type: ADDITION,
        a: 2,
        b: 4,
        answer: 6
      }
    ]
  },
  {
    id: 'addition-2',
    name: 'Level 2',
    questions: [
      {
        type: ADDITION,
        a: 3,
        b: 4,
        answer: 7
      },
      {
        type: ADDITION,
        a: 2,
        b: 5,
        answer: 7
      },
      {
        type: ADDITION,
        a: 1,
        b: 4,
        answer: 5
      }
    ]
  },
  {
    id: 'addition-3',
    name: 'Level 3',
    questions: [
      {
        type: ADDITION,
        a: 5,
        b: 4,
        answer: 9
      },
      {
        type: ADDITION,
        a: 2,
        b: 6,
        answer: 8
      },
      {
        type: ADDITION,
        a: 4,
        b: 4,
        answer: 8
      }
    ]
  },
  {
    id: 'addition-4',
    name: 'Level 4',
    questions: [
      {
        type: ADDITION,
        a: 5,
        b: 6,
        answer: 11
      },
      {
        type: ADDITION,
        a: 3,
        b: 6,
        answer: 9
      },
      {
        type: ADDITION,
        a: 4,
        b: 10,
        answer: 14
      }
    ]
  }
];

export default ADDITION_LEVELS;
