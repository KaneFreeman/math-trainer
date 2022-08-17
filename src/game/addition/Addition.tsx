/* eslint-disable react/no-array-index-key */
import Box from '@mui/material/Box';
import { ADDITION } from '../../interface';
import LevelButton from '../components/LevelButton';
import LEVELS from '../levels';

const Addition = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', m: 2 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
        {LEVELS[ADDITION].map((level, index) => (
          <LevelButton key={`${ADDITION}-level-${index}`} section={ADDITION} index={index} name={level.name} />
        ))}
      </Box>
    </Box>
  );
};

export default Addition;
