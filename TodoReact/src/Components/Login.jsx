import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Input, Row, Col } from 'reactstrap';
import swal from 'sweetalert';

function Login() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
   

    const Login = async () => {
        try {
            const response = await fetch('https://localhost:7215/api/TodoApp/TodoLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserName: userName,
                    PasswordHash: password,
                   
                }),
            });

            if (response.ok) {
                swal("Giris Basarili", "Yonlendiriliyorsunuz..", "success")
                    .then(props.hide)
                    setUserName('');
                    setPassword('');
            }
        } catch (error) {
            console.error('İstek gönderilirken bir hata oluştu:', error);
        }
    }
      
    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div>
            <Modal isOpen={props.visible}>
                <ModalHeader>Giris Yap</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Input
                                        onChange={handleUserNameChange}
                                        style={{ marginBottom: "15px" }}
                                        id="exampleEmail"
                                        name="userName"
                                        placeholder="Görev Başlık"
                                        type="text"
                                        value={userName}
                                    />
                                    <Input
                                        onChange={handlePasswordChange}
                                        id="exampleEmail1"
                                        name="password"
                                        placeholder="Görev Açıklama"
                                        type="text"
                                        value={password}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    {/* <Button className="btn btn-danger" onClick={props.hide}>Kapat</Button> */}
                    <Button className="btn btn-success" onClick={Login}>Giris Yap</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Login;



