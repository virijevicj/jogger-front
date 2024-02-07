import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import axios from 'axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const defaultTheme = createTheme();

export default function CustomizedDialogs({lmKey}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [message, setMessage] = React.useState('');
  const [messageType, setMessageType] = React.useState('');
  const [showMessage, setShowMessage] = React.useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const comment = {
        keyLearningMaterial : lmKey,
        grade : data.get('grade'),
        text : data.get('text')
    }

    const token = localStorage.getItem('Token');
    axios.post('http://localhost:9000/jogger/api/v1/lm-comments',comment, {
      headers : {
        'Token' : token
      },
    })
    .then((response) => {
      setMessage(response.data.message);
      setShowMessage(true);
      setMessageType('success');
    })
    .catch((error) => {
      setMessage(error.response.data.message);
      setShowMessage(true);
      setMessageType('error');
    })
  }

  return (
    <React.Fragment >
      <AddOutlinedIcon onClick={handleClickOpen} titleAccess='Dodavanje recenzije' ></AddOutlinedIcon>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
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
            <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="grade"
                        label="Ocena"
                        name="grade"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="text"
                        label="Komentar"
                        name="text"
                        />
                    </Grid>
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Dodavanje recenzije
                    </Button>
                    {showMessage && <Alert severity={messageType} sx={{width : "100%"}}>
                        {message}
                    </Alert>}
                </Box>
                </Box>
            </Container>
        </ThemeProvider>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
