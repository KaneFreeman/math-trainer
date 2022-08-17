import { useCallback } from 'react';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import KeyboardButton from './KeyboardButton';

interface KeyboardProps {
  onClick: (value: string | number) => void;
  onEnter: () => void;
  onClear: () => void;
}

const Keyboard = ({ onClick, onEnter, onClear }: KeyboardProps) => {
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
        gap: 1
      }}
    >
      <Box sx={{ display: 'flex', gap: 1 }}>
        <KeyboardButton value={7} onClick={handleOnClick} />
        <KeyboardButton value={8} onClick={handleOnClick} />
        <KeyboardButton value={9} onClick={handleOnClick} />
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <KeyboardButton value={4} onClick={handleOnClick} />
        <KeyboardButton value={5} onClick={handleOnClick} />
        <KeyboardButton value={6} onClick={handleOnClick} />
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <KeyboardButton value={1} onClick={handleOnClick} />
        <KeyboardButton value={2} onClick={handleOnClick} />
        <KeyboardButton value={3} onClick={handleOnClick} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
        <KeyboardButton value={<ClearIcon fontSize="large" />} onClick={onClear} />
        <KeyboardButton value={0} onClick={handleOnClick} />
        <KeyboardButton value={<KeyboardReturnIcon fontSize="large" />} onClick={onEnter} />
      </Box>
    </Box>
  );
};

export default Keyboard;
