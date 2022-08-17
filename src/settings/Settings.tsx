import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useAppDispatch } from '../store/hooks';
import { clearScores } from '../store/slices/scores';

const Settings = () => {
  const dispatch = useAppDispatch();

  const [resetting, setResetting] = useState(false);

  const handleOnReset = useCallback(() => {
    setResetting(true);
  }, []);

  const handleOnResetConfirm = useCallback(() => {
    setResetting(false);
    dispatch(clearScores());
  }, [dispatch]);

  const handleResetOnClose = useCallback(() => setResetting(false), []);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', m: 2 }}>
        <Button color="error" onClick={handleOnReset} size="large" variant="contained">
          Reset Progress
        </Button>
      </Box>
      <Dialog
        open={resetting}
        onClose={handleResetOnClose}
        aria-labelledby="restting-progress-title"
        aria-describedby="restting-progress-description"
      >
        <DialogTitle id="restting-progress-title">Reset Progress</DialogTitle>
        <DialogContent>
          <DialogContentText id="restting-progress-description">
            Are you sure you want to reset all progress?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResetOnClose} color="primary" autoFocus>
            Cancel
          </Button>
          <Button onClick={handleOnResetConfirm} color="error">
            Reset Progress
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Settings;
