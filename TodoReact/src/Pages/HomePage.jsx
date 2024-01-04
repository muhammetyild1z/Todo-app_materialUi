import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

import Login from '../Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';


const HomePage = () => {

 


  return (
    <>
      <Navbar className="my-2" color="secondary" dark>
        <NavbarBrand style={{ float: 'left', display: 'block' }} href="/" >

          Todo App
        </NavbarBrand>

      </Navbar>
      <Login />
      


    </>
  );
};

export default HomePage;
