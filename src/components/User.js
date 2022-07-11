import React,  { useContext } from 'react'
import userContext from '../context/users/UserContext'

const User = (props) => {
    const {user}=props;
    const context = useContext(userContext);
    const { deleteUserbyAdmin } = context
    const handleDelete = () => {
      deleteUserbyAdmin(user._id);
        props.showAlert('Note deleted successfully', 'success');
    }
  return (
    <div className="card my-3" >

    <div className="card-body">
        <div className='d-flex justify-content-between'>
            <h5 className="card-title">{user.name}</h5>
            <div className='d-flex justify-content-between' style={{ 'width': '15%' }}>
                <i className="fa-solid fa-trash-can" onClick={handleDelete}></i>
              
            </div>
        </div>
        <p className="card-text">Email: {user.email}</p>
        <p className="card-text">Age: {user.age}</p>
        <p className="card-text">Phone: {user.phone}</p>
        <h6>Events Registered:</h6>
        {user.events.map((ev) => {
                return <div key={ev._id}>
                  <p>{ev.event_name}</p>
                </div>
            })}

    </div>
</div>

  )
}

export default User