import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Level, Question } from '../interface';
import Keyboard from '../common/Keyboard';
import { shuffle } from '../utility/array.util';
import QuestionView from './QuestionView';
import IncorrectMarker from './components/IncorrectMarker';
import TimeProgressBar from './components/TimeProgressBar';
import { useAppDispatch } from '../store/hooks';
import { updateScore } from '../store/slices/scores';
import LEVELS from './levels';

const MAX_ANSWER_LENGTH = 4;
const MAX_INCORRECT_ANSWERS = 3;
const SHAKE_TIME = 300;
const TIME_TO_ANSWER = 5000;

interface BoardProps {
  section: string;
  levelIndex: number;
  level: Level;
}

const Board = ({ section, levelIndex, level }: BoardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [answer, setAnswer] = useState('');
  const [incorrect, setIncorrect] = useState(0);
  const [shake, setShake] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [timePaused, setTimePaused] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setQuestions(shuffle(level.questions));
  }, [level]);

  const [nextQuestionId, setNextQuestionId] = useState(0);
  const nextQuestion = useMemo(
    () => (questions.length > nextQuestionId ? questions[nextQuestionId] : null),
    [questions, nextQuestionId]
  );

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
    setIncorrect(incorrect + 1);
    setAnswer('');
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, SHAKE_TIME);
  }, [incorrect]);

  const handleOnEnter = useCallback(() => {
    if (!nextQuestion || answer.length === 0) {
      return;
    }

    if (+answer === nextQuestion.answer) {
      const newNextQuestionId = nextQuestionId + 1;
      if (newNextQuestionId >= questions.length) {
        dispatch(
          updateScore({
            levelId: level.id,
            score: Math.min(level.questions.length - incorrect, 0),
            completed: incorrect < MAX_INCORRECT_ANSWERS
          })
        );
      }

      setNextQuestionId(newNextQuestionId);
      setAnswer('');
      setStartTime(Date.now());
      setTimePaused(false);
    } else {
      handleWrongAnswer();
      setTimePaused(true);
    }
  }, [
    answer,
    dispatch,
    handleWrongAnswer,
    incorrect,
    level.id,
    level.questions.length,
    nextQuestion,
    nextQuestionId,
    questions.length
  ]);

  const handleOnClear = useCallback(() => {
    if (answer.length === 0) {
      return;
    }

    setAnswer('');
    setShake(false);
  }, [answer.length]);

  const hasMoreLevels = useMemo(
    () => section in LEVELS && levelIndex < LEVELS[section].length - 1,
    [levelIndex, section]
  );

  const handleOnNext = useCallback(() => {
    setAnswer('');
    setIncorrect(0);
    setNextQuestionId(0);
    setShake(false);
    setStartTime(Date.now());
    setTimePaused(false);

    if (incorrect >= MAX_INCORRECT_ANSWERS) {
      setQuestions(shuffle(level.questions));
      return;
    }

    setQuestions([]);

    if (hasMoreLevels) {
      navigate(`/levels/${section}/${levelIndex + 1}`);
    } else {
      navigate(`/levels/${section}`);
    }
  }, [hasMoreLevels, incorrect, level.questions, levelIndex, navigate, section]);

  const onNextButtonText = useMemo(() => {
    if (incorrect >= MAX_INCORRECT_ANSWERS) {
      return 'Try Again';
    }

    if (!hasMoreLevels) {
      return 'Main Menu';
    }

    return 'Next Level';
  }, [hasMoreLevels, incorrect]);

  const topDisplay = useMemo(() => {
    if (!nextQuestion) {
      return (
        <Box
          sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Typography variant="h4" sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            Level {incorrect >= MAX_INCORRECT_ANSWERS ? 'Failed' : 'Completed'}
          </Typography>
          <Typography variant="subtitle1" sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            ({incorrect} wrong answers)
          </Typography>
          <Button onClick={handleOnNext} color="primary" variant="contained" sx={{ mt: 2 }} size="large">
            {onNextButtonText}
          </Button>
        </Box>
      );
    }

    return <QuestionView question={nextQuestion} answer={answer} shake={shake} />;
  }, [answer, handleOnNext, incorrect, nextQuestion, onNextButtonText, shake]);

  return (
    <>
      {nextQuestion ? (
        <>
          <TimeProgressBar
            startTime={startTime}
            timeToAnswer={TIME_TO_ANSWER}
            paused={timePaused}
            onTimeUp={handleWrongAnswer}
          />
          <Box sx={{ position: 'absolute', top: 20, display: 'flex', flexDirection: 'row', gap: 1 }}>
            <IncorrectMarker incorrect={incorrect >= 1} />
            <IncorrectMarker incorrect={incorrect >= 2} />
            <IncorrectMarker incorrect={incorrect >= 3} />
          </Box>
        </>
      ) : null}
      {topDisplay}
      {nextQuestion ? <Keyboard onClick={handleOnClick} onEnter={handleOnEnter} onClear={handleOnClear} /> : null}
    </>
  );
};

export default Board;
