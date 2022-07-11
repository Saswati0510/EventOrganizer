import React, { useContext, useState, useEffect } from 'react'
import eventContext from '../context/events/EventContext'
import { useNavigate } from 'react-router-dom'

const Addevent = (props) => {

  const context = useContext(eventContext);
  const { addEvent, mainevents, getmainEvents } = context;
  let history = useNavigate();
  const [event, setEvent] = useState({ event_name: "", description: "" });
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getmainEvents();
    } else {
      props.showAlert('Please login to continue', 'warning')
      history("/login");
    }
    // eslint-disable-next-line
  }, []);

  //console.log(mainevents);

  const handleAddEventClick = (e) => {
    e.preventDefault();

    /*     let obj = mainevents.find(o => o.name === event.event_name); */


    console.log(event.event_name, event.description);
    /*  addEvent( obj._id, event.event_name, event.description); */
    addEvent(event.event_name, event.description);
    setEvent({ event_name: "", description: "" })
    props.showAlert('added event successfully', 'success');
  }
  const onChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value })
    //console.log(event);
  }
  return (
    <div className='container my-4'>
      <h2>Add an Event!</h2>
      <form>
        <div className="mb-3">
          {/* <label htmlFor="event_name" className="form-label">Event Name</label>
        <input type="text" className="form-control" id="event_name" name='event_name' minLength={3} required value={event.event_name} onChange={onChange}/> */}
          <select className="form-select" id='event_name' name='event_name' value={event.event_name} aria-label="Default select example" onChange={onChange}>
            <option selected>Open this select menu</option>
            {mainevents.map(ev =>
              <option key={ev._id} value={ev.name}>{ev.name} Date-time: {ev.date_time}</option>
            )};
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name='description' minLength={5} value={event.description} required onChange={onChange} />
        </div>
        <button disabled={event.event_name.length < 3 || event.description.length < 5} type="submit" className="btn btn-primary" onClick={handleAddEventClick}>Add Event</button>
      </form>
    </div>
  )
}

export default Addevent