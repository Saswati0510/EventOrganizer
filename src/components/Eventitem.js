import React, { useContext } from 'react'
import eventContext from '../context/events/EventContext';

const Eventitem = (props) => {
    const { event, updateEvent } = props;
    const context = useContext(eventContext);
    const { deleteEvent } = context
    const handleDelete = () => {
        deleteEvent(event._id);
        props.showAlert('Note deleted successfully', 'success');
    }

    return (
        <div className='col-xs-12 col-lg-4'>
            <div className="card my-3" >

                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <h5 className="card-title">{event.event_name}</h5>
                        <div className='d-flex justify-content-between' style={{ 'width': '15%' }}>
                            <i className="fa-solid fa-trash-can" onClick={handleDelete}></i>
                            <i className="fa-solid fa-pen-to-square" onClick={()=>updateEvent(event)}></i>
                        </div>
                    </div>
                    <p className="card-text">{event.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Eventitem