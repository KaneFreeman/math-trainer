import { Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from './Header';
import Addition from './game/addition/Addition';
import LevelView from './game/LevelView';
import Settings from './settings/Settings';

const Main = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          boxSizing: 'border-box',
          justifyContent: 'center',
          height: 'calc(100vh - 56px)',
          top: '56px',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            boxSizing: 'border-box',
            justifyContent: 'center'
          }}
        >
          <Routes>
            <Route path="/" element={<Addition />} />
            <Route path="/addition" element={<Addition />} />
            <Route path="/level/:section/:levelId" element={<LevelView />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default Main;
