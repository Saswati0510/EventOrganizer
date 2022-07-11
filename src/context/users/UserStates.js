import UserContext from "./UserContext";
import { useState } from "react";

const UserStates = (props) => {
    const host = "http://localhost:5000"

    const [users, setUsers] = useState([]);

    

const getUsersbyAdmin = async () => {
    // API Call 
    const response = await fetch(`${host}/api/admin/allUsersByAdmin`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "adminAuth-token": localStorage.getItem('admin-token')
        }
    });
    const json = await response.json()
    //console.log(json)
    setUsers(json)
}

const deleteUserbyAdmin=async (id) => {
    // API Call 
    const response = await fetch(`${host}/api/admin/deleteUserByAdmin/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "adminAuth-token": localStorage.getItem('admin-token')
        }
    });
    const json = await response.json()
    console.log(json)
    const remainingUsers = users.filter((u) => { return u._id !== id })
    setUsers(remainingUsers);
}


    return (
        <UserContext.Provider value={{ users, getUsersbyAdmin, deleteUserbyAdmin}}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserStates;
