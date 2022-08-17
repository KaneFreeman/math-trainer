import { useCallback, useMemo, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useWindowEvent } from './utility/window.util';
import PWAUpdateConfirmEvent from './utility/events/pawUpdateConfirmEvent';
import { useCheckForUpdates } from './utility/pwa.util';
import { persistor, store } from './store';
import Main from './Main';
import './App.css';

const App = () => {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark'
        }
      }),
    []
  );

  const [hasNewVersion, setHasNewVersion] = useState(false);
  const [updating, setUpdating] = useState(false);

  const onUpdate = useCallback(() => {
    setHasNewVersion(true);
  }, []);

  const onUpdateMessageAccept = useCallback(() => {
    setUpdating(true);
    window.dispatchEvent(new PWAUpdateConfirmEvent());
  }, []);

  useWindowEvent('pwaupdateavailable', onUpdate);
  useCheckForUpdates();

  const updateAlert = useMemo(
    () => (
      <Alert severity="info" classes={{ root: 'alert-root', message: 'alert-message' }}>
        <Box>{updating ? 'Updating...' : 'A new version is available'}</Box>
        {!updating ? (
          <Button color="secondary" size="small" onClick={onUpdateMessageAccept}>
            Update
          </Button>
        ) : null}
      </Alert>
    ),
    [onUpdateMessageAccept, updating]
  );

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <BrowserRouter>
              <Main />
            </BrowserRouter>
            <Snackbar open={hasNewVersion}>{updateAlert}</Snackbar>
          </LocalizationProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
