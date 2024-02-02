import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Button } from '@mui/material';

export default function MenuAppBar() {
  const roles = localStorage.getItem('Roles');
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {roles.includes("DEVELOPER") && <Button color="inherit">Materijali</Button>}
          {roles.includes("ADMIN") && <Button color="inherit">Korisnici</Button>}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <IconButton aria-label="delete" size="large">
                <ExitToAppIcon titleAccess='Odjava' fontSize="inherit" color="inherit"/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
    
  );
}
