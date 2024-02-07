import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Box } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({comments}) {
  const numberOfGrades = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  comments.map(com => {
    numberOfGrades[com.grade - 1] += 1;
  })
  
  const [imageSrc, setImageSrc] = React.useState('');
  
  const fetchImage = async () => {
    const res = await fetch("https://quickchart.io/chart?chart={\n" +
    "  type: 'bar',\n" +
    "  data: {\n" +
    "    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],\n" +
    "    datasets: [{\n" +
    "      label: 'X - ocene, Y - broj ocena',\n" +
    "      data: [" + numberOfGrades + "]\n" +
    "    }]\n" +
    "  }\n" +
    "}&backgroundColor=white&width=500&height=300&devicePixelRatio=1.0&format=jpeg&version=2.9.3");
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImageSrc(imageObjectURL);
  };
  React.useEffect(() => {
    fetchImage();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment >
      <NotesOutlinedIcon onClick={handleClickOpen} titleAccess='Pregled recenzija' ></NotesOutlinedIcon>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ minWidth: 1000 }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
            <br/><br/>
        <Box component="img" sx={{
            marginLeft : 17,
            height: 300,
            width: 300,
          }} 
          src={imageSrc}> 
        </Box>
        <br/><br/>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>Broj recenzija: {comments.length}</caption>
        <TableHead>
          <TableRow>
            <TableCell align="left"><b>Korisnik</b></TableCell>
            <TableCell align="left"><b>Ocena</b></TableCell>
            <TableCell align="left"><b>Komentar</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comments.map((row) => (
            <TableRow>
              <TableCell align="left" sx={{width : "100px"}}>{row.userFirstName + ' ' + row.userLastName}</TableCell>
              <TableCell align="left" sx={{width : "10px"}}>{row.grade}</TableCell>
              <TableCell align="left">{row.text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
