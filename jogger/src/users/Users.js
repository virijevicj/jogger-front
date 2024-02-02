import * as React from 'react';
import UserTable  from './UsersTable';
import NavBar from '../menu/NavBar';
import Box from '@mui/material/Box';

export default function MenuAppBar() {
  return (
    <Box>
        <NavBar></NavBar>
        <br/>
        <UserTable></UserTable>
    </Box> 
  );
}
