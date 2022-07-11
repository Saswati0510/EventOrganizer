import React, { useEffect, useContext } from 'react'
import userContext from '../context/users/UserContext'
import { useNavigate } from 'react-router-dom'
import User from './User'


const AllUsers = (props) => {
    const context = useContext(userContext);
    const { users, getUsersbyAdmin } = context;
    let history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('admin-token')) {
            getUsersbyAdmin();
        } else {
            props.showAlert('Please login to continue', 'warning')
            history("/adminLogin");
        }

        // eslint-disable-next-line
    }, []);
    return (
        <div>
            {users.map((u) => {
                return <User showAlert={props.showAlert} key={u._id} user={u}></User>
            })}
        </div>
    )
}

export default AllUsers