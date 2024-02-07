import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({lmKey}) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [messageType, setMessageType] = React.useState('');
  const [showMessage, setShowMessage] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('Token');
    const url = 'http://localhost:9000/jogger/api/v1/lm/' + lmKey;
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Token': token,
        }
    };
    fetch(url, requestOptions)
        .then((response) => {
            if (response.status == 200) {
                setMessage('Uspesno obrisan materijal za ucenje');
                setShowMessage(true);
                setMessageType('success');
            } else if (response.status >= 400 && response.status < 600) {
                setMessage('Greska prilikom brisanja materijala za ucenje');
                setShowMessage(true);
                setMessageType('error');
            }       
        })
        .catch((error) => {
            console.log(error);      
        });
  };

  return (
    <React.Fragment>
      <DeleteIcon onClick={handleClickOpen} titleAccess='Brisanje materijala za ucenje' ></DeleteIcon>
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
            <br/><br/>
        <Typography gutterBottom>
            Da li ste sigurni da zelite da obrisete izabrani materijal?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} type="submit" variant="contained">
            Brisanje
          </Button>
        </DialogActions>
        <br/>
          {showMessage && <Alert severity={messageType} sx={{marginLeft : '5px', width : "90%"}}>
                {message}
            </Alert>}
      </BootstrapDialog>
    </React.Fragment>
  );
}
