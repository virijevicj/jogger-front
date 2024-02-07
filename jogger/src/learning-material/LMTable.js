import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LMComments from './LMComments';
import NewComment from './NewComment';
import DeleteLM from './DeleteLM';
import DialogNew from './DialogNew';

function mapLMToTableRows(data) {
    const learningMaterials = [];
    data.map(lm => {
        const comments = [];
        lm.comments.map(comment => {
            comments.push({
                userFirstName : comment.user.firstName,
                userLastName : comment.user.lastName,
                grade : comment.grade,
                text : comment.text
            })
        });
        learningMaterials.push({
            key : lm.keyLearningMaterial,
            description : lm.description,
            link : lm.link,
            area : lm.area.name,
            contentType : lm.contentType.name,
            level : lm.level.name,
            platform : lm.platform.name,
            technology : lm.technology.name,
            comments : comments
        });
    })
    return learningMaterials;
}

export default function LMTable() {
  const [lm, SetLM] = React.useState([]);
  const [areas, SetAreas] = React.useState([]);
  const [contentTypes, SetContentTypes] = React.useState([]);
  const [levels, SetLevels] = React.useState([]);
  const [platforms, SetPlatforms] = React.useState([]);
  const [technologies, SetTechnlogies] = React.useState([]);

  const token = localStorage.getItem('Token');
  React.useEffect(() => {
      axios.get('http://localhost:9000/jogger/api/v1/lm-entities', {
        headers : {
          'Token' : token
        }
    })
    .then((response) => {
        SetAreas(response.data.data.areas);
        SetContentTypes(response.data.data.contentTypes);
        SetLevels(response.data.data.levels);
        SetPlatforms(response.data.data.platforms);
        SetTechnlogies(response.data.data.technologies);
      })
    .catch((error) => console.log(error));  
  }, [])

  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const visibleRows = lm.slice( 
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
    );

  const handleLinkClick = (event) => {
     window.open(event.target.text, '_blank');   
  }

const [selectedArea, SetSelectedArea] = React.useState('');
const handleSelectedArea = event => SetSelectedArea(event.target.value);

const [selectedContentType, SetSelectedContentType] = React.useState('');
const handleSetSelectedContentType = event => SetSelectedContentType(event.target.value);

const [selectedLevel, SetSelectedLevel] = React.useState('');
const handleSetSelectedLevel = event => SetSelectedLevel(event.target.value);

const [selectedPlatform, SetSelectedPlatform] = React.useState('');
const handleSelectedPlatform = event => SetSelectedPlatform(event.target.value);

const [selectedTechnology, SetSelectedTechnology] = React.useState('');
const handleSetSelectedTechnology = event => SetSelectedTechnology(event.target.value);

const getLM = () => {
    const url = 'http://localhost:9000/jogger/api/v1/lm'
                + '?area=' + selectedArea
                + '&contentType=' + selectedContentType
                + '&level=' + selectedLevel
                + '&platform=' + selectedPlatform
                + '&technology=' + selectedTechnology;
    axios.get(url, {
        headers : {
          'Token' : token
        }
    })
    .then((response) => {
        SetLM(mapLMToTableRows(response.data.data));
      })
    .catch((error) => console.log(error));  
  }

  const cleanSearchParams = () => {
    SetSelectedTechnology('');
    SetSelectedPlatform('');
    SetSelectedLevel('');
    SetSelectedContentType('');
    SetSelectedArea('');
  }
  
  const roles = localStorage.getItem('Roles');

    return (
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <Toolbar>
              <DialogNew props={{
                areas : areas,
                contentTypes : contentTypes,
                levels : levels,
                technologies : technologies,
                platforms : platforms
              }}>
              </DialogNew>
            </Toolbar>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size='medium'
              >
                <TableHead>
                  <TableRow sx={{ bgcolor: 'rgba(25, 118, 210, 0.12)' }}>
                  
                    <TableCell align='left' sx={{ minWidth: 280 }}>Opis</TableCell>
                    <TableCell align='left' sx={{ minWidth: 280 }}>Link</TableCell>
                    <TableCell sx={{paddingTop : '0px'}}>
                    <FormControl variant="standard" sx={{ minWidth: 110 }}>
                    <InputLabel sx={{color : "rgba(0, 0, 0, 0.87)"}}>Oblast</InputLabel>
                        <Select value={selectedArea} onChange={handleSelectedArea}>
                        <MenuItem value=""><em><b>Sve oblasti</b></em></MenuItem>
                        {areas.map(area => (
                            <MenuItem value={area}>{area}</MenuItem>
                        ))
                        }
                        </Select>
                    </FormControl>
                    </TableCell>
                    <TableCell sx={{paddingTop : '0px'}}>
                    <FormControl variant="standard" sx={{ minWidth: 110 }}>
                    <InputLabel sx={{color : "rgba(0, 0, 0, 0.87)"}}>Tip sadrzaja</InputLabel>
                        <Select value={selectedContentType} onChange={handleSetSelectedContentType}>
                        <MenuItem value=""><em><b>Svi tipovi</b></em></MenuItem>
                        {contentTypes.map(contentType => (
                            <MenuItem value={contentType}>{contentType}</MenuItem>
                        ))
                        }
                        </Select>
                    </FormControl>
                    </TableCell>
                    <TableCell sx={{paddingTop : '0px'}}>
                    <FormControl variant="standard" sx={{ minWidth: 110 }}>
                    <InputLabel sx={{color : "rgba(0, 0, 0, 0.87)"}}>Nivo</InputLabel>
                        <Select value={selectedLevel} onChange={handleSetSelectedLevel}>
                        <MenuItem value=""><em><b>Svi nivoi</b></em></MenuItem>
                        {levels.map(level => (
                            <MenuItem value={level}>{level}</MenuItem>
                        ))
                        }
                        </Select>
                    </FormControl>
                    </TableCell>
                    <TableCell sx={{paddingTop : '0px'}}>
                    <FormControl variant="standard" sx={{ minWidth: 110}}>
                    <InputLabel sx={{color : "rgba(0, 0, 0, 0.87)"}}>Platforma</InputLabel>
                        <Select value={selectedPlatform} onChange={handleSelectedPlatform}>
                        <MenuItem value=""><em><b>Sve platforme</b></em></MenuItem>
                        {platforms.map(platform => (
                            <MenuItem value={platform}>{platform}</MenuItem>
                        ))
                        }
                        </Select>
                    </FormControl>
                    </TableCell>
                    <TableCell sx={{paddingTop : '0px'}}>
                    <FormControl variant="standard" sx={{ minWidth: 110 }}>
                    <InputLabel sx={{color : "rgba(0, 0, 0, 0.87)"}}>Tehnologija</InputLabel>
                        <Select value={selectedTechnology} onChange={handleSetSelectedTechnology}>
                        <MenuItem value=""><em><b>Sve tehnologije</b></em></MenuItem>
                        {technologies.map(tech => (
                            <MenuItem value={tech}>{tech}</MenuItem>
                        ))
                        }
                        </Select>
                    </FormControl>
                    </TableCell>
                    <TableCell sx={{paddingBottom : "8px", minWidth: 80}}>
                        <SearchIcon titleAccess='Pretraga po kriterijumima' onClick={getLM}></SearchIcon>
                        <ClearIcon titleAccess='Ukloni filtere' onClick={cleanSearchParams}></ClearIcon>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visibleRows.map((row) => {
                    return (
                      <TableRow
                        key={row.key}
                        hover
                        sx={{ cursor: 'pointer' }}
                      > 
                        <TableCell sx={{ width : '25%'}} >{row.description}</TableCell>
                        <TableCell sx={{ width : '25%'}}>
                            <Link href="#" underline="hover" onClick = {handleLinkClick} rel='noreferrer'>
                            {row.link}
                            </Link>
                        </TableCell>
                        <TableCell sx={{ width : '8%'}}>{row.area}</TableCell>
                        <TableCell sx={{ width : '8%'}}>{row.contentType}</TableCell>
                        <TableCell sx={{ width : '8%'}}>{row.level}</TableCell>
                        <TableCell sx={{ width : '8%'}}>{row.platform}</TableCell>
                        <TableCell sx={{ width : '8%'}}>{row.technology}</TableCell>    
                        <TableCell>
                            <LMComments comments={row.comments}></LMComments>
                            {(roles.includes("Developer")) && <NewComment lmKey={row.key}></NewComment>}
                            {(roles.includes("Developer")) &&<DeleteLM lmKey={row.key}></DeleteLM>}
                        </TableCell>
                      </TableRow>
                    );
                  })}              
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={rowsPerPage}
              component="div"
              count={lm.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
          </Paper>
        </Box>
      );
}
