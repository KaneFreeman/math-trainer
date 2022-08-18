/* eslint-disable react/no-array-index-key */
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { MAX_APP_WIDTH } from '../../interface';
import LevelButton from '../components/LevelButton';
import LEVELS from '../levels';

const SectionView = () => {
  const { section } = useParams();
  const navigate = useNavigate();

  const sectionDetails = useMemo(() => (section ? LEVELS[section] : undefined), [section]);

  const levels = useMemo(() => sectionDetails?.levels ?? [], [sectionDetails]);

  const handleOneMinuteChallengeClick = useCallback(() => {
    if (sectionDetails?.hasOneMinuteChallenge !== true) {
      return;
    }

    navigate(`/levels/${section}/challenge`);
  }, [navigate, section, sectionDetails?.hasOneMinuteChallenge]);

  if (!section) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
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
      <Box sx={{ flexGrow: 1 }} />
      {sectionDetails?.hasOneMinuteChallenge ? (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Button
            onClick={handleOneMinuteChallengeClick}
            variant="contained"
            color="primary"
            size="large"
            sx={{ pl: 1, pr: 1, flexGrow: 1 }}
            fullWidth
          >
            One Minute Challenge
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};

export default SectionView;
