import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl';
import {useNavigate} from 'react-router-dom';

const defaultTheme = createTheme();
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function NewUser({roles}) {
  const navigate=useNavigate();
  const [message, setMessage] = React.useState('');
  const [messageType, setMessageType] = React.useState('');
  const [showMessage, setShowMessage] = React.useState(false);
  const [selectedRoles, selectRoles] = React.useState([]);

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    selectRoles(typeof value === 'string' ? value.split(',') : value); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      username : data.get('username'),
      password : data.get('password'),
      passwordConfirm : data.get('passwordConfirm'),
      firstName : data.get('firstName'),
      lastName : data.get('lastName'),
      email : data.get('email')
    }
    user.roles = selectedRoles;

    if (user.password != user.passwordConfirm) {
      setMessage('Pogresna potvrda lozinke. Pokusajte ponovo!');
      setShowMessage(true);
      setMessageType('error');
      return;
    }

    const token = localStorage.getItem('Token');
    axios.post('http://localhost:9000/jogger/api/v1/users/register',user, {
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
      if (error.response.data.statusCode === 401) {
        localStorage.clear();
        navigate('/');
      } 
      setMessage(error.response.data.message);
      setShowMessage(true);
      setMessageType('error');
    })
  };

  return (
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
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Ime"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Prezime"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Korisnicko ime"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel>Uloge *</InputLabel>
                  <Select
                    id="selectUloge"
                    multiple
                    value={selectedRoles}
                    onChange={handleSelectChange}
                    input={<OutlinedInput label="Uloge *" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>
                        <Checkbox checked={selectedRoles.indexOf(role) > -1} />
                        <ListItemText primary={role} />
                      </MenuItem>
                    ))}
                  </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Lozinka"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="Potvrdite lozinku"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Kreiranje
            </Button>
            {showMessage && <Alert severity={messageType} sx={{width : "100%"}}>
                {message}
            </Alert>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
