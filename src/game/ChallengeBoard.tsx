import { memo, useCallback, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Question, QuestionType } from '../interface';
import Keyboard from '../common/Keyboard';
// import { useAppDispatch } from '../store/hooks';
import { generateQuestion, questionsAreEqual } from '../utility/question.util';
import TimeProgressBar from './components/TimeProgressBar';
import QuestionView from './QuestionView';

const MAX_ANSWER_LENGTH = 4;
const SHAKE_TIME = 300;
const TIME_TO_ANSWER = 60000;

interface ChallengeBoardProps {
  section: QuestionType;
  difficultyLevel: number;
}

const ChallengeBoard = memo(({ section, difficultyLevel }: ChallengeBoardProps) => {
  // const dispatch = useAppDispatch();

  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState(0);
  const [shake, setShake] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [timeUp, setTimeUp] = useState(false);

  const generateNextQuestion = useCallback(
    (oldQuestion: Question | null) => {
      let newQuestion: Question | null;

      do {
        newQuestion = generateQuestion(section, difficultyLevel);
      } while (newQuestion !== null && questionsAreEqual(newQuestion, oldQuestion));

      return newQuestion;
    },
    [difficultyLevel, section]
  );

  const [nextQuestion, setNextQuestion] = useState<Question | null>(() => generateNextQuestion(null));

  const handleOnClick = useCallback(
    (value: string | number) => {
      if (answer.length >= MAX_ANSWER_LENGTH) {
        return;
      }
      setAnswer(`${answer}${value}`);
    },
    [answer]
  );

  const handleWrongAnswer = useCallback(() => {
    setAnswer('');
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, SHAKE_TIME);
  }, []);

  const handleOnEnter = useCallback(() => {
    if (!nextQuestion || answer.length === 0) {
      return;
    }

    if (+answer === nextQuestion.answer) {
      setAnswer('');
      setNextQuestion(generateNextQuestion(nextQuestion));
      setCorrect(correct + 1);
    } else {
      handleWrongAnswer();
    }
  }, [answer, correct, generateNextQuestion, handleWrongAnswer, nextQuestion]);

  const handleOnBackspace = useCallback(() => {
    if (answer.length === 0) {
      return;
    }

    setAnswer(answer.substring(0, answer.length - 1));
    setShake(false);
  }, [answer]);

  const handleTryAgain = useCallback(() => {
    setAnswer('');
    setNextQuestion(generateNextQuestion(null));
    setShake(false);
    setStartTime(Date.now());
    setTimeUp(false);
    setCorrect(0);
  }, [generateNextQuestion]);

  const handleTimeUp = useCallback(() => {
    setTimeUp(true);
  }, []);

  return !timeUp && nextQuestion !== null ? (
    <>
      <TimeProgressBar startTime={startTime} timeToAnswer={TIME_TO_ANSWER} onTimeUp={handleTimeUp} />
      <QuestionView question={nextQuestion} answer={answer} shake={shake} />
      <Keyboard onClick={handleOnClick} onEnter={handleOnEnter} onBackspace={handleOnBackspace} />
    </>
  ) : (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h5" sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        Correct answers: {correct}
      </Typography>
      <Button onClick={handleTryAgain} color="primary" variant="contained" sx={{ mt: 2 }} size="large">
        Try Again
      </Button>
    </Box>
  );
});

export default ChallengeBoard;
