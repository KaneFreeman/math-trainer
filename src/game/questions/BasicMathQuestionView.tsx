import { memo, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { BasicMathQuestion } from '../../interface';

interface BasicMathQuestionViewProps {
  question: BasicMathQuestion;
  answer: string;
}

const BasicMathQuestionView = memo(({ question, answer }: BasicMathQuestionViewProps) => {
  const Icon = useMemo(() => {
    switch (question.type) {
      case 'subtraction':
        return RemoveIcon;
      case 'multiplication':
        return CloseIcon;
      default:
        return AddIcon;
    }
  }, [question.type]);

  return (
    <Typography
      variant="h2"
      sx={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: '70px 100px 24px', height: 86, alignItems: 'center' }}>
        <Box />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>{question.a}</Box>
        <Box />
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: '70px 100px 24px', height: 86, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Icon fontSize="large" sx={{ width: '2em', height: '2em' }} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>{question.b}</Box>
        <Box />
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '70px 100px 24px',
          height: 86,
          alignItems: 'center',
          borderTop: '1px solid gray'
        }}
      >
        <Box />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>{answer}</Box>
        <Box />
      </Box>
    </Typography>
  );
});

export default BasicMathQuestionView;
