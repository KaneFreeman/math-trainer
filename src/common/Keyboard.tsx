import { useCallback } from 'react';
import Box from '@mui/material/Box';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardButton from './KeyboardButton';

interface KeyboardProps {
  onClick: (value: string | number) => void;
  onEnter: () => void;
  onBackspace: () => void;
}

const Keyboard = ({ onClick, onEnter, onBackspace }: KeyboardProps) => {
  const handleOnClick = useCallback(
    (value: string | number) => {
      onClick(value);
    },
    [onClick]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: '100%',
        padding: '0 16px',
        boxSizing: 'border-box'
      }}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1 }}>
        <KeyboardButton value={1} onClick={handleOnClick} />
        <KeyboardButton value={2} onClick={handleOnClick} />
        <KeyboardButton value={3} onClick={handleOnClick} />
        <KeyboardButton value={4} onClick={handleOnClick} />
        <KeyboardButton value={5} onClick={handleOnClick} />
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1 }}>
        <KeyboardButton value={6} onClick={handleOnClick} />
        <KeyboardButton value={7} onClick={handleOnClick} />
        <KeyboardButton value={8} onClick={handleOnClick} />
        <KeyboardButton value={9} onClick={handleOnClick} />
        <KeyboardButton value={0} onClick={handleOnClick} />
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 3fr', justifyContent: 'center', gap: 1 }}>
        <KeyboardButton value={<KeyboardDoubleArrowLeftIcon fontSize="large" />} onClick={onBackspace} />
        <KeyboardButton value={<KeyboardReturnIcon fontSize="large" />} onClick={onEnter} />
      </Box>
    </Box>
  );
};

export default Keyboard;
