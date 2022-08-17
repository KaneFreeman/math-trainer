import { Route, Routes, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ADDITION } from './interface';
import Header from './Header';
import SectionView from './game/section/SectionView';
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
            <Route path="/" element={<Navigate to={`/levels/${ADDITION}`} replace />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/levels/:section" element={<SectionView />} />
            <Route path="/levels/:section/:levelId" element={<LevelView />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default Main;
