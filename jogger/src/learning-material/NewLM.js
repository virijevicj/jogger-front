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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

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

export default function NewUser({props}) {
  const [message, setMessage] = React.useState('');
  const [messageType, setMessageType] = React.useState('');
  const [showMessage, setShowMessage] = React.useState(false);
  const [selectedArea, SetSelectedArea] = React.useState('');
  const handleSelectedArea = event => SetSelectedArea(event.target.value);
  
  const [selectedContentType, SetSelectedContentType] = React.useState('');
  const handleSelectedContentType = event => SetSelectedContentType(event.target.value);
  
  const [selectedLevel, SetSelectedLevel] = React.useState('');
  const handleSelectedLevel = event => SetSelectedLevel(event.target.value);
  
  const [selectedPlatform, SetSelectedPlatform] = React.useState('');
  const handleSelectedPlatform = event => SetSelectedPlatform(event.target.value);
  
  const [selectedTechnology, SetSelectedTechnology] = React.useState('');
  const handleSelectedTechnology = event => SetSelectedTechnology(event.target.value);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lm = {
      description : data.get('description'),
      link : data.get('link'),
      area : selectedArea ? selectedArea : null,
      contentType : selectedContentType ? selectedContentType : null,
      level : selectedLevel ? selectedLevel : null,
      platform : selectedPlatform ? selectedPlatform : null,
      technology : selectedTechnology ? selectedTechnology : null
    }
    
    const token = localStorage.getItem('Token');
    axios.post('http://localhost:9000/jogger/api/v1/lm',lm, {
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Opis"
                  name="description"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="link"
                  label="Link"
                  name="link"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" sx={{ width : "100%" }}>
                    <InputLabel>Oblast *</InputLabel>
                        <Select 
                        value={selectedArea}
                        onChange={handleSelectedArea}
                        input={<OutlinedInput label="Oblast *"/>}
                        MenuProps={MenuProps}
                        >
                        {props.areas.map(area => (
                            <MenuItem value={area}>{area}</MenuItem>
                        ))
                        }
                        </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" sx={{ width : "100%" }}>
                    <InputLabel>Nivo *</InputLabel>
                        <Select 
                        value={selectedLevel}
                        onChange={handleSelectedLevel}
                        input={<OutlinedInput label="Nivo *"/>}
                        MenuProps={MenuProps}
                        >
                        {props.levels.map(level => (
                            <MenuItem value={level}>{level}</MenuItem>
                        ))
                        }
                        </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" sx={{ width : "100%" }}>
                    <InputLabel>Tehnologija *</InputLabel>
                        <Select 
                        value={selectedTechnology}
                        onChange={handleSelectedTechnology}
                        input={<OutlinedInput label="Tehnologija *"/>}
                        MenuProps={MenuProps}
                        >
                        {props.technologies.map(tech => (
                            <MenuItem value={tech}>{tech}</MenuItem>
                        ))
                        }
                        </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" sx={{ width : "100%" }}>
                    <InputLabel>Tip sadrzaja *</InputLabel>
                        <Select 
                        value={selectedContentType}
                        onChange={handleSelectedContentType}
                        input={<OutlinedInput label="Tip sadrzaja *"/>}
                        MenuProps={MenuProps}
                        >
                        {props.contentTypes.map(ct => (
                            <MenuItem value={ct}>{ct}</MenuItem>
                        ))
                        }
                        </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" sx={{ width : "100%" }}>
                    <InputLabel>Platforma *</InputLabel>
                        <Select 
                        value={selectedPlatform}
                        onChange={handleSelectedPlatform}
                        input={<OutlinedInput label="Platforma *"/>}
                        MenuProps={MenuProps}
                        >
                        {props.platforms.map(platform => (
                            <MenuItem value={platform}>{platform}</MenuItem>
                        ))
                        }
                        </Select>
                </FormControl>
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
