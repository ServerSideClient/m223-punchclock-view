import React, {useEffect, useRef, useState} from "react";
import {Button, Table} from "react-bootstrap";
import Popup from "reactjs-popup";
import {fetchUsers} from "./ApiTalker";
import {Redirect} from "react-router-dom";


export default function UsersView() {

    const [activeUser, setActiveUser] = useState();
    const [displayEdit, setDisplayEdit] = useState(false);
    const [authorised, setAuthorised] = useState(true);
    const [users, setUsers] = useState([]);

    const popup = useRef();

    useEffect(() => {
        listUsers();
    });

    function listUsers() {
        fetchUsers().then((response) => response.json())
            .then((users) => setUsers(users))
            .catch(() => setAuthorised(false));
    }

    function leave() {

    }

    function deleteThisUser(userId) {

    }

    function editUser(user) {

    }

    return (
        (authorised === true) ?
            <div className="col-xl-auto container mt-3">
                <Button variant="dark" onClick={leave}>Verlassen</Button>
                <br/>
                <br/>
                <Popup trigger={<Button>Erstellen</Button>} ref={popup} onClose={listUsers} lockScroll
                       modal></Popup>

                <Table striped bordered hover className="mt-3">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th/>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        (users.length > 0) ?
                            users.map((user, key) => (
                                <tr key={key}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td><Button variant="danger"
                                                onClick={() => deleteThisUser(user.id)}>Löschen</Button>
                                    </td>
                                    <td><Button variant="info" onClick={() => editUser(user)}>Bearbeiten</Button>
                                    </td>
                                </tr>
                            ))
                            : <tr key={0}/>
                    }
                    </tbody>
                </Table>

                <Popup open={displayEdit} onClose={() => {
                    setDisplayEdit(false);
                    listUsers();
                }}></Popup>
            </div>
            : <Redirect to="/login" push={false}/>
    )
}