import * as React from 'react';
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
import Dialog from './DialogNewUser'
import axios from 'axios';
import DialogUpdate from './DialogUpdate';
import CheckIcon from '@mui/icons-material/Check';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DialogDelete from './DialogDelete';

let callGet = true;
const headCells = ['Ime', 'Prezime', 'Korisnicki nalog', 'Email', 'Aktivan', 'Uloge', 'Akcije'];

function getRoleNamesForUser(acc, currentValue) {
  if (acc.length)
   return acc + ', ' + currentValue.name  
  else 
    return currentValue.name;
}

function mapUsersToTableRows(data) {
  const users = [];
  data.map(user => {
    users.push(
      {
        key : user.keyUser,
        firstName : user.firstName,
        lastName : user.lastName,
        username : user.username,
        email : user.email,
        active : user.active,
        roles : user.roles.reduce(getRoleNamesForUser, '')
      }
    )
  })
  console.log(users);
  return users;
}

export default function UserTable() {
  const [users, setUsers] = React.useState([]);
  const [roles, setRoles] = React.useState([]);
  const token = localStorage.getItem('Token');
  React.useEffect(() => {
    if (callGet) {
      callGet = false;
      axios.get('http://localhost:9000/jogger/api/v1/users', {
        headers : {
          'Token' : token
        }
    })
    .then((response) => {
        setUsers(mapUsersToTableRows(response.data.data.users));
        setRoles(response.data.data.roles);
      })
    .catch((error) => console.log(error));
    }  
  }, [])

  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const visibleRows = users.slice( 
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
    );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar>
          <Dialog roles={roles}></Dialog>
        </Toolbar>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <TableHead>
              <TableRow sx={{ bgcolor: 'rgba(25, 118, 210, 0.12)' }}>
                {headCells.map((headCell) => (
                <TableCell
                align='left'               
                > 
                {headCell}
                </TableCell>
                ))}
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
                    <TableCell sx={{ width : '17%'}} >{row.firstName}</TableCell>
                    <TableCell sx={{ width : '17%'}}>{row.lastName}</TableCell>
                    <TableCell sx={{ width : '17%'}}>{row.username}</TableCell>
                    <TableCell sx={{ width : '17%'}}>{row.email}</TableCell>
                    <TableCell sx={{align : 'center', width : '8%'}}>{row.active ? <CheckIcon></CheckIcon> : <ClearRoundedIcon></ClearRoundedIcon>}</TableCell>
                    <TableCell sx={{ width : '17%'}}>{row.roles}</TableCell>
                    {row.active && <TableCell sx={{width: "7%"}}>
                        <DialogUpdate props={{user : row, roles : roles}}></DialogUpdate>
                        <DialogDelete user={row} ></DialogDelete>                                       
                    </TableCell> }
                    {!row.active && <TableCell></TableCell>}
                  </TableRow>
                );
              })}              
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPage}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
}
