import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

function UserBrowser() {
    const [users, setUsers] = useState([]);

    useEffect(() =>{
        api.users.getAllUsers().then(data=> {
            setUsers(data)
        });
    }, []);

    function renderUsers() {
        return users.map((user, index) =>{
            return <li key={index}><Link to={`/users/${user}`}>{user}</Link></li>
        });
    };

    return(
        <ul className="user-list">
            {renderUsers()}
        </ul>
    );
};

export default UserBrowser;