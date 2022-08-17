/* eslint-disable react/destructuring-assignment */
import { ReactNode, useCallback } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface CommonKeyboardButtonProps {
  fullWidth?: boolean;
}

interface KeyboardButtonProps extends CommonKeyboardButtonProps {
  value: ReactNode;
  onClick: () => void;
}

interface KeyboardButtonPropsWithValue extends CommonKeyboardButtonProps {
  value: string | number;
  onClick: (value: string | number) => void;
}

function hasValue(props: KeyboardButtonProps | KeyboardButtonPropsWithValue): props is KeyboardButtonPropsWithValue {
  const { value } = props;
  return typeof value === 'string' || typeof value === 'number';
}

const KeyboardButton = (props: KeyboardButtonProps | KeyboardButtonPropsWithValue) => {
  const { value, fullWidth = false } = props;
  const handleOnClick = useCallback(() => {
    if (hasValue(props)) {
      props.onClick(props.value);
    } else {
      props.onClick();
    }
  }, [props]);

  return (
    <Button
      sx={{
        width: fullWidth ? '100%' : 64,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      variant="contained"
      onClick={handleOnClick}
    >
      {typeof value === 'string' || typeof value === 'number' ? <Typography variant="h4">{value}</Typography> : value}
    </Button>
  );
};

export default KeyboardButton;
