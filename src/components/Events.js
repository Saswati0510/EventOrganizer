import React, { useContext, useEffect, useRef, useState } from 'react'
import eventContext from '../context/events/EventContext'
import Eventitem from './Eventitem';
import Addevent from './Addevent';
import {useNavigate} from 'react-router-dom'

const Events = (props) => {
    const context = useContext(eventContext);
    const { events, getEvents, editEvent } = context;
    let history=useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getEvents();
        }else{
            props.showAlert('Please login to continue','warning')
            history("/login");
        }
      
        // eslint-disable-next-line
    }, []);
    const ref = useRef(null);
    const refClose = useRef(null);
    const [event, setEvent] = useState({eevent_name:"",edescription:""});
    const updateEvent = (currentevent) => {
        ref.current.click()
        setEvent({id:currentevent._id,eevent_name:currentevent.event_name,edescription:currentevent.description})
        
    }

    const handleUpdateClick=()=>{
        editEvent(event.id,event.eevent_name, event.edescription);
        refClose.current.click()
        props.showAlert('Event Updated successfully', 'success');
    }
    
    const onChange=(e)=>{
        setEvent({...event,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <Addevent showAlert={props.showAlert}/>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Event</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="eevent_name" className="form-label">Event Name</label>
                                    <input type="text" className="form-control" id="eevent_name" name='eevent_name' value={event.eevent_name}  minLength={3} required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={event.edescription} minLength={5} required onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button disabled={event.eevent_name.length<3 || event.edescription.length<5} type="button" className="btn btn-primary" onClick={handleUpdateClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>Your Events</h2>
                <h6 className='mx-1 my-2'>
                    {events.length===0 && 'No events to display!!'}
                </h6>
                {events.map((event) => {
                    return <Eventitem key={event._id} event={event} updateEvent={updateEvent} showAlert={props.showAlert}></Eventitem>
                })}
            </div>
        </div>

    )
}

export default Events