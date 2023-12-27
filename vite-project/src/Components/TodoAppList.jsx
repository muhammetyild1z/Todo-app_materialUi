import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function TodoAppList() {
     const [todos, setTodos] = useState([]);
     const fetchData = async () => {

         try {
             const response = await fetch('https://localhost:7215/api/TodoApp/TodoList');
             const result = await response.json();
             setTodos(result);


         } catch (error) {
                     console.log(error);
         }

     }

     useEffect(() => {
        fetchData();
       
     }, [])

   
    
     function TodoTable() {
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Görev Baslık</TableCell>
                <TableCell align="right">Görev Detay</TableCell>
                <TableCell align="right">Görev Eklenme Tarıhı</TableCell>
                <TableCell align="right">Sil</TableCell>
                <TableCell align="right">Yapıldı</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
    
              {todos.map((todo) => (
                <TableRow
                  key={todo.TodoTitle}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {todo.TodoTitle}
                  </TableCell>
                  <TableCell align="right">{todo.TodoDesc}</TableCell>
                  <TableCell align="right">{todo.TodoDate}</TableCell>
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
 }
     




