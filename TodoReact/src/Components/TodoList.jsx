import React, { useState } from 'react';
import { Alert, Table, Button } from "reactstrap";
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoAdd from './TodoAdd';

function TodoList(props) {
   
    const [visible, setVisible] = useState(false);

    const hide = () => {
        setVisible(false);
    };

    const handleDeleteUser = (todoId) => {
        
        fetch(`https://localhost:7215/api/TodoApp/TodoRemove/${todoId}`, {
            method: 'DELETE'
            
        })
        
        .then(response => {
            
            if (response.ok) {
                props.setTodos(props.todos.filter(todo => todo.todoID !== todoId));
                swal({
                    title: "Silmek Istedigine Emin Misin?",
                    text: `${todo.todoTitle}`,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                      swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                      });
                    } else {
                      swal("Your imaginary file is safe!");
                    }
                  });
            } else {
               
                console.error('Görevi silerken bir hata oluştu!');
            }
        })
        .catch(error => console.error('İstek gönderilirken bir hata oluştu: ', error));
    };

    return (
        <div>
            <Button onClick={() => setVisible(true)} className="btn btn-primary" style={{ float: "right" }}>Yeni Görev Ekle</Button>
            <TodoAdd visible={visible} hide={hide} />
            {props.todos.length > 0 ? (
                <Table className="table table-success table-striped mt-5" style={{ width: "1000px" }}>
                    <thead>
                        <tr>
                            <th scope="col">Görev ID</th>
                            <th scope="col">Görev Başlığı</th>
                            <th scope="col">Görev Açıklaması</th>
                            <th scope="col">Görev Eklenme Tarihi</th>
                            <th></th><th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.todos.map((todo) => (
                            <tr key={todo.todoID}>
                                <td>{todo.todoID}</td>
                                <td>{todo.todoTitle}</td>
                                <td>{todo.todoDesc}</td>
                                <td>{moment(todo.todoDate).format('YYYY-MM-DD HH:mm')}</td>
                                <td><Button className="btn btn-success">Düzenle</Button></td>
                                <td><Button className="btn btn-danger" onClick={() => handleDeleteUser(todo.todoID)}>Sil</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <div>
                    <Alert style={{ width: "1000px" }} color="danger">Görev Yok!</Alert>
                    <Button className="btn btn-primary" style={{ float: "right" }}>Yeni Görev Ekle</Button>
                    <TodoAdd />
                </div>
            )}
        </div>
    );
}

export default TodoList;
