import { memo, useMemo } from 'react';
import Box from '@mui/material/Box';
import { ADDITION, DIVISION, MULTIPLICATION, Question, SUBTRACTION } from '../interface';
import BasicMathQuestionView from './questions/BasicMathQuestionView';
import './QuestionView.css';

interface QuestionViewProps {
  question: Question;
  answer: string;
  shake: boolean;
}

const QuestionView = memo(({ question, answer, shake }: QuestionViewProps) => {
  const renderedQuestion = useMemo(() => {
    switch (question.type) {
      case ADDITION:
      case SUBTRACTION:
      case MULTIPLICATION:
      case DIVISION:
        return <BasicMathQuestionView question={question} answer={answer} />;
      default:
        return null;
    }
  }, [question, answer]);

  return (
    <Box
      sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      className={shake ? 'shake' : undefined}
    >
      {renderedQuestion}
    </Box>
  );
});

export default QuestionView;
