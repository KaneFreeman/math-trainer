/* eslint-disable react/no-array-index-key */
import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { toQuestionType } from '../interface';
import ChallengeBoard from './ChallengeBoard';

const MAX_DIFFICULTY_LEVELS = 10;

const ChallengeView = () => {
  const { section } = useParams();

  const [difficultyLevel, setDifficultyLevel] = useState<number | undefined>(0);
  const [started, setStarted] = useState(false);
  const questionType = useMemo(() => toQuestionType(section), [section]);

  const handleDifficultyLevelChange = useCallback((event: SelectChangeEvent<number>) => {
    setDifficultyLevel(+event.target.value);
  }, []);

  const handleStart = useCallback(() => {
    if (difficultyLevel === undefined || difficultyLevel < 0 || difficultyLevel > MAX_DIFFICULTY_LEVELS) {
      return;
    }

    setStarted(true);
  }, [difficultyLevel]);

  if (!questionType) {
    return (
      <Typography variant="h4" sx={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        Section not found
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 56px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pt: 2,
        pb: 2,
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {difficultyLevel === undefined || !started ? (
        <Box
          sx={{
            minWidth: '100%',
            p: 2,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="difficulty-level-label">Difficulty Level</InputLabel>
            <Select
              labelId="difficulty-level-label"
              id="difficulty-level"
              value={difficultyLevel}
              label="Difficulty Level"
              onChange={handleDifficultyLevelChange}
            >
              {[...Array(MAX_DIFFICULTY_LEVELS)].map((_, i) => (
                <MenuItem key={`difficulty-level-${i}`} value={i}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={handleStart} color="primary" variant="contained" sx={{ mt: 2 }} size="large">
            Start Challenge
          </Button>
        </Box>
      ) : (
        <ChallengeBoard section={questionType} difficultyLevel={difficultyLevel} />
      )}
    </Box>
  );
};

export default ChallengeView;
