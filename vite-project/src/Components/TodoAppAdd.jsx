import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import moment from 'moment';


function TodoAdd()
{
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDesc, setTodoDesc] = useState('');

  const handleTitleChange = (e) => {
    setTodoTitle(e.target.value);
  };

  const handleDescChange = (e) => {
    setTodoDesc(e.target.value);
  };

  const handleDateTodo = async () => {
    const currentDate = moment().format('YYYY-MM-DD');

    try {
      const response = await fetch('https://localhost:7215/api/TodoApp/TodoCreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TodoTitle: todoTitle,
          TodoDesc: todoDesc,
          TodoDate: currentDate,
        }),
      });

      if (response.ok) {
        console.log('Veri başarıyla eklendi!');
      
        setTodoTitle('');
        setTodoDesc('');
      }
    } catch (error) {
      console.error('İstek gönderilirken bir hata oluştu:', error);
    }
  };

  return (
    
    <div>

      <div style={{ marginBottom: '1rem' }}>
        <TextField
          label="Görev Başlık"
          variant="outlined"
          value={todoTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <TextField
          label="Görev Açıklama"
          variant="outlined"
          value={todoDesc}
          onChange={handleDescChange}
        />
      </div>
      <Button variant="contained" color="primary" onClick={handleDateTodo}>
        Görev Ekle
      </Button>

      
    </div>
  );  
  };

  


export default TodoAdd;