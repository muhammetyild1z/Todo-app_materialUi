import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Input, Row, Col } from 'reactstrap';
import moment from 'moment';
import Swal from 'sweetalert2';
import HomePage from '../Pages/HomePage';
function TodoAdd(props) {
    const [todoTitle, setTodoTitle] = useState('');
    const [todoDesc, setTodoDesc] = useState('');


    const addTodo = async () => {
        try {
            const response = await fetch('https://localhost:7215/api/TodoApp/TodoCreate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    TodoTitle: todoTitle,
                    TodoDesc: todoDesc,
                    TodoDate: moment().format(),
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
                title: "Gorev Eklendi."
              }).then(props.hide);
              setTodoTitle('');
              setTodoDesc('');
              
        }} catch (error) {
            console.error('İstek gönderilirken bir hata oluştu:', error);
        }
    }

    const handleTitleChange = (e) => {
        setTodoTitle(e.target.value);
    }

    const handleDescChange = (e) => {
        setTodoDesc(e.target.value);
    }

    return (
        <div>
            <Modal isOpen={props.visible}>
                <ModalHeader>Görev Ekle</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Input
                                        onChange={handleTitleChange}
                                        style={{ marginBottom: "15px" }}
                                        id="exampleEmail"
                                        name="todoTitle"
                                        placeholder="Görev Başlık"
                                        type="text"
                                        value={todoTitle}
                                    />
                                    <Input
                                        onChange={handleDescChange}
                                        id="exampleEmail1"
                                        name="TodoDesc"
                                        placeholder="Görev Açıklama"
                                        type="textarea"
                                        value={todoDesc}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-danger" onClick={props.hide}>Kapat</Button>
                    <Button className="btn btn-success" onClick={addTodo}>Ekle</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default TodoAdd;



