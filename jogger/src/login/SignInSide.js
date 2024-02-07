import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../image/jogger.png'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Alert from '@mui/material/Alert';

const defaultTheme = createTheme();

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default function SignInSide() {
    const [errorMessage, setErrorMessage] = React.useState('');
    const [showErrorMessage, setShowErrorMessage] = React.useState(false);
    const navigate=useNavigate();
    const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post('http://localhost:9000/jogger/api/v1/auth/login', { 
        username : data.get('username'),
        password : data.get('password')   
    })
    .then((resposne) => {
        const token = resposne.data.data.token;
        const roles = resposne.data.data.roles;
        localStorage.setItem('Token', token);
        localStorage.setItem('Roles', roles);
        if (roles.indexOf("Developer") != -1 || roles.indexOf("Intern") != -1) 
          navigate('/learning-materials');
        else if (roles.indexOf("Admin") != -1)
          navigate('/users');       
    })
    .catch((error) => {
        setErrorMessage(error.response.data.message);
        setShowErrorMessage(true);
        sleep(10000).then(() => setShowErrorMessage(false));
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Logo})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 30,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Korisnicko ime"
                name="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Lozinka"
                type="password"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Prijava
              </Button>
            </Box>
            {showErrorMessage && <Alert severity="error" sx={{width : "100%"}}>
                {errorMessage}
            </Alert>}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
