import React, { useState } from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoAdd from './TodoAdd';
import Swal from 'sweetalert2'
import swal from 'sweetalert';
import { MdOutlineCancel } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { FaPencil } from "react-icons/fa6";
import {
    MDBBadge,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBTooltip,
} from "mdb-react-ui-kit";

export default function todoList(props) {
    //console.log(props.todos.todoTitle)
    const [visible, setVisible] = useState(false);

    const hide = () => {
        setVisible(false);
    };

    const handleDeleteTodo = async (todoID, todoTitle) => {
        Swal.fire({
            title: "Silmek Istedigine Emin Misin?",
            text: `${todoTitle} `,
            icon: "error",
            confirmButtonText: 'Gorevi sil',
            showCancelButton: true,
            cancelButtonText: 'Iptal et',
            dangerMode: true,

        })

            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`https://localhost:7215/api/TodoApp/TodoRemove?id=${todoID}`, {
                        method: 'DELETE'
                    })
                    Swal.fire({
                        title: "Gorev Silindi..",
                        icon: "success",
                        confirmButtonText: 'Tamam',
                    });

                }
            });
    };

    const handleEditTodo = async (todoID, todoTitle, todoDesc, todoDate) => {

        const { value: formValues } = await Swal.fire({
            confirmButtonText: 'Gorevi Guncelle',
            showCancelButton: true,
            cancelButtonText: 'Iptal et',
            title: "Gorev Guncelle",
            html: `
                <input value="${todoTitle}" id="swal-todoTitle" class="swal2-input">             
                <input value="${todoDesc}" id="swal-todoDesc" class="swal2-textarea">      
                `,

            focusConfirm: false,
            preConfirm: () => {
                return [
                    todoTitle = document.getElementById("swal-todoTitle").value,
                    todoDesc = document.getElementById("swal-todoDesc").value,

                ];
            }
        });
        if (formValues) {
            Swal.fire(JSON.stringify(formValues));

            try {
                const response = await fetch('https://localhost:7215/api/TodoApp/TodoEdit/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        TodoTitle: todoTitle,
                        TodoDesc: todoDesc,
                        TodoDate: moment(todoDate).format(),
                        TodoID: todoID,
                    }),
                });

                if (response.ok) {
                    swal("Gorev Guncellendi", "Tamamlamayi Unutma..", "success")
                        .then(props.hide)

                }
            } catch (error) {
                console.error('İstek gönderilirken bir hata oluştu:', error);
            }
        }
    };
    return (
        <section className="gradient-custom-2 vh-100">  
            <MDBContainer className="py-5 h-100"> 
                <MDBRow className="d-flex justify-content-center align-items-center">
                    <MDBCol md="12" xl="10">
                        <MDBCard className="mask-custom">
                        <MDBBadge onClick={() => setVisible(true)}><IoIosAdd  /> Yeni Görev Ekle</MDBBadge>
                        <TodoAdd visible={visible} hide={hide} />
                            <MDBCardBody className="p-4 ">
                                <div className="text-center pt-3 pb-2">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                                        alt="Check"
                                        width="60"
                                    />
                                    <h2 className="my-4">Yapılacak Listesi</h2>
                                </div>                              
                                <MDBTable className="text-white mb-0">
                                    <MDBTableHead>
                                        <tr>
                                            <th scope="col">Gorev No</th>
                                            <th scope="col">Gorev Adi</th>
                                            <th scope="col">Gorev Aciklamasi</th>
                                            <th scope="col">Gorev Guncellenme Tarihi</th>
                                           
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>

                                        {props.todos.map((todo) => (

                                            <tr key={todo.todoID} className="fw-normal">
                                                <th>
                                                    <span className="ms-2">
                                                        {todo.todoID}</span>
                                                </th>
                                                <td className="align-middle">
                                                    <span>
                                                        {todo.todoTitle}
                                                    </span>
                                                </td>
                                                <td className="align-middle">
                                                    <span>
                                                        {todo.todoDesc}
                                                    </span>
                                                </td>
                                                <td className="align-middle">
                                                    <span>
                                                        {moment(todo.todoDate).format('LLL')}
                                                    </span>
                                                </td>
                                                <td>
                                                    <MDBBadge color='success'>
                                                        <FaPencil  onClick={() => handleEditTodo(todo.todoID, todo.todoTitle, todo.todoDesc)}/>
                                                    </MDBBadge>
                                                </td>
                                                <td>
                                                    <MDBBadge color='danger'>
                                                        <MdOutlineCancel  onClick={() => handleDeleteTodo(todo.todoID, todo.todoTitle)}/>
                                                    </MDBBadge>

                                                </td>

                                            </tr>
                                        ))}
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
