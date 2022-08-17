/* eslint-disable react/destructuring-assignment */
import { ReactNode, useCallback } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface KeyboardButtonProps {
  value: ReactNode;
  onClick: () => void;
}

interface KeyboardButtonPropsWithValue {
  value: string | number;
  onClick: (value: string | number) => void;
}

function hasValue(props: KeyboardButtonProps | KeyboardButtonPropsWithValue): props is KeyboardButtonPropsWithValue {
  const { value } = props;
  return typeof value === 'string' || typeof value === 'number';
}

const KeyboardButton = (props: KeyboardButtonProps | KeyboardButtonPropsWithValue) => {
  const { value } = props;
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
        width: 80,
        height: 80,
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
