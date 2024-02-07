import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Button } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function MenuAppBar() {
  const navigate=useNavigate();
  const roles = localStorage.getItem('Roles');
  const handleKorisniciClick = () => {
    if (roles.includes("Admin"))
    navigate('/users');
  } 
  const handleMaterijaliClick = () => {
    if (roles.includes("Developer") || roles.includes("Intern"))
    navigate('/learning-materials');
  } 

  const handleLogout = (event) => {
    event.preventDefault(); 
    const token = localStorage.getItem('Token');
    axios.post('http://localhost:9000/jogger/api/v1/auth/logout', "", {
      headers : {
        'Token' : token
      },
    })
    .then((response) => {
      localStorage.clear();
      navigate('/');
    })
    .catch((error) => console.log(error))
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {roles.includes("Developer") || roles.includes("Intern") && <Button color="inherit" onClick={handleMaterijaliClick}>Materijali</Button>}
          {roles.includes("Admin") && <Button color="inherit" onClick={handleKorisniciClick}>Korisnici</Button>}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <IconButton aria-label="delete" size="large">
                <ExitToAppIcon onClick={handleLogout} titleAccess='Odjava' fontSize="inherit" color="inherit"/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
    
  );
}
