import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useLevelIndex from './hooks/useLevelIndex';
import useLevel from './hooks/useLevel';
import Board from './Board';

const LevelView = () => {
  const { section, levelId } = useParams();
  const levelIndex = useLevelIndex(levelId);
  const level = useLevel(section, levelIndex);

  if (!section || !level) {
    return (
      <Typography variant="h4" sx={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        Level not found
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
        pb: 4,
        boxSizing: 'border-box',
        position: 'relative'
      }}
    >
      <Board section={section} levelIndex={levelIndex} level={level} />
    </Box>
  );
};

export default LevelView;
