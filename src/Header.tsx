import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = useCallback(
    (newDrawerOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawerOpen(newDrawerOpen);
    },
    []
  );

  return (
    <AppBar className="app-header" position="fixed" sx={{ top: 0 }}>
      <Toolbar
        classes={{
          root: 'header-toolbar'
        }}
      >
        <IconButton aria-label="menu" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250, height: '100%', display: 'flex', flexDirection: 'column' }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List disablePadding>
              <ListItem
                button
                key="addition"
                selected={pathname === '/addition' || pathname.startsWith('/addition')}
                onClick={() => navigate('/addition')}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Addition" />
              </ListItem>
            </List>
            <Box sx={{ flexGrow: 1 }} />
            <Divider />
            <List disablePadding>
              <ListItem
                button
                key="settings"
                selected={pathname === '/settings' || pathname.startsWith('/settings')}
                onClick={() => navigate('/settings')}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            ml: 1,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
          }}
        >
          Math Trainer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
