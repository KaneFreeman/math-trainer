/* eslint-disable react/no-array-index-key */
import Box from '@mui/material/Box';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { MAX_APP_WIDTH } from '../../interface';
import LevelButton from '../components/LevelButton';
import LEVELS from '../levels';

const SectionView = () => {
  const { section } = useParams();

  const levels = useMemo(() => (section ? LEVELS[section] ?? [] : []), [section]);

  if (!section) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        m: 2,
        width: '100%',
        maxWidth: MAX_APP_WIDTH
      }}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, width: '100%' }}>
        {levels.map((level, index) => (
          <LevelButton key={`${section}-level-${index}`} section={section} index={index} name={level.name} />
        ))}
      </Box>
    </Box>
  );
};

export default SectionView;
