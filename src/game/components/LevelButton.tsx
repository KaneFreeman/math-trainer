import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import useLevel from '../hooks/useLevel';
import { useAppSelector } from '../../store/hooks';
import { selectScoreByLevelId } from '../../store/slices/scores';

interface LevelButtonProps {
  section: string;
  index: number;
  name: string;
}

const LevelButton = ({ section, index, name }: LevelButtonProps) => {
  const navigate = useNavigate();

  const level = useLevel(section, index);
  const levelScore = useAppSelector(useMemo(() => selectScoreByLevelId(level?.id), [level]));

  const handleOnClick = useCallback(() => {
    navigate(`/level/${section}/${index}`);
  }, [index, navigate, section]);

  const color = useMemo(() => {
    if (!levelScore) {
      return 'primary';
    }

    return levelScore.completed ? 'success' : 'warning';
  }, [levelScore]);

  return (
    <Button onClick={handleOnClick} variant={levelScore ? 'contained' : 'outlined'} color={color} size="large">
      {name}
    </Button>
  );
};

export default LevelButton;
