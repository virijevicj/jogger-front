import * as React from 'react';
import NavBar from '../menu/NavBar';
import Box from '@mui/material/Box';
import LMTable from './LMTable';

export default function MenuAppBar() {
  return (
    <Box>
        <NavBar></NavBar>
        <br/>
        <LMTable></LMTable>
    </Box> 
  );
}
