import React, { useState } from 'react';
import {
    MDBInput,
    MDBRow,   
    MDBBtn
} from 'mdb-react-ui-kit';
import TodoList from '../Components/TodoList';

function Login() {
    const [userName, setuserName] = useState('');
    const [password, setpassword] = useState('');

    const checkLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7215/api/TodoApp/TodoLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserName: userName,
                    PasswordHash: password
                   
                }),
            });

            if (response.ok) {
              
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({

                    icon: "success",
                    title: "Giris Basarili"
                });
                setuserName('');
                setpassword('');
                

            }
            else{
                console.log("tes")
            }
        } catch (error) {
            console.error('İstek gönderilirken bir hata oluştu:', error);
        }
    } 

    return (
        <form onSubmit={checkLogin}>
            <MDBInput className='mb-4' type='text'  placeholder='Kullanici Adi'  onChange={(e) => setuserName(e.target.value)}/>
            <MDBInput className='mb-4' type='password' placeholder='Sifre' name='password' onChange={(e) => setpassword(e.target.value)}/>

            <MDBRow className='mb-4'>
                <MDBBtn type='submit' block >
                    Giris Yap  
                </MDBBtn>

            </MDBRow>
            <MDBBtn type='submit' block>
                Uye Ol
            </MDBBtn>

        </form>
    );

}
export default Login;



