import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

interface TimeProgressBarProps {
  startTime: number;
  timeToAnswer: number;
  paused?: boolean;
  onTimeUp: () => void;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  width: '100%',
  height: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    transition: 'none',
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'
  }
}));

const TimeProgressBar = ({ startTime, timeToAnswer, paused = false, onTimeUp }: TimeProgressBarProps) => {
  const [progress, setProgress] = useState(0.0);

  const calculateProgress = useCallback(() => {
    const now = Date.now();
    const timeLeft = timeToAnswer - (now - startTime);
    if (timeLeft <= 0) {
      if (progress !== 100) {
        onTimeUp();
        setProgress(100);
      }
      return;
    }

    let newProgress = ((timeToAnswer - timeLeft) / timeToAnswer) * 100.0;
    if (newProgress > 100) {
      newProgress = 100;
    } else if (newProgress < 0) {
      newProgress = 0;
    }

    if (newProgress !== progress) {
      setProgress(newProgress);
    }
  }, [timeToAnswer, startTime, progress, onTimeUp]);

  useEffect(() => {
    if (paused) {
      return () => {};
    }

    const timer = setTimeout(() => {
      calculateProgress();
    }, 10);

    return () => {
      clearTimeout(timer);
    };
  }, [calculateProgress, onTimeUp, paused, progress, startTime, timeToAnswer]);

  return <BorderLinearProgress variant="determinate" value={progress} />;
};

export default TimeProgressBar;
