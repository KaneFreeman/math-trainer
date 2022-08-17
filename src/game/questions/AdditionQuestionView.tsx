import { memo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { BasicMathQuestion } from '../../interface';

interface AdditionQuestionViewProps {
  question: BasicMathQuestion;
  answer: string;
}

const AdditionQuestionView = memo(({ question, answer }: AdditionQuestionViewProps) => (
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
        <AddIcon fontSize="large" sx={{ width: '2em', height: '2em' }} />
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
));

export default AdditionQuestionView;
