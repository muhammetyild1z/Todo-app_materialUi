import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import TodoList from '../Components/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';


const HomePage = () => {
  const [todos, setTodos] = useState([]);
  

  useEffect(() => { 
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://localhost:7215/api/TodoApp/TodoList');
        const result = await response.json();
        setTodos(result);
        
      } catch (error) {
        console.error('Bağlantı hatası', error);
      }
    }; 

      fetchTodos();
  }, [todos]);


 
  return (
    <>
      <Navbar className="my-2" color="secondary" dark>
        <NavbarBrand style={{ float: 'left', display: 'block' }} href="/">
          Todo App 
        </NavbarBrand>
       
      </Navbar>

      <TodoList todos={todos} />
      {/* <Login/> */}
     
    </>
  );
};

export default HomePage;
