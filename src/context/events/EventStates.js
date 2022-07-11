import EventContext from "./EventContext";
import { useState } from "react";

const EventStates = (props) => {
    const host = "http://localhost:5000"

    const [events, setEvents] = useState([]);
    const [mainevents, setmainEvents] = useState([]);
    //GET EVENT FROM API

    const getEvents = async () => {
        // API Call 
        const response = await fetch(`${host}/api/events/fetchallevents`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json()
        //console.log(json)
        setEvents(json)
    }
    // ADD A EVENT
  /*   const addEvent = async (main_event_id, event_name, description) => { */
  const addEvent = async (event_name, description) => {
        // API Call 
        const response = await fetch(`${host}/api/events/addEvent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
           /*  body: JSON.stringify({main_event_id, event_name, description }) */
           body: JSON.stringify({ event_name, description })
        });
        const event=await response.json()
        
        setEvents(events.concat(event))

    }
    // DELETE A EVENT
    const deleteEvent = async (id) => {
        const response = await fetch(`${host}/api/events/deleteEvent/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json()
        console.log(json)
        const newEvents = events.filter((event) => { return event._id !== id })
        setEvents(newEvents);
    }
  // Edit a event
  const editEvent = async (id, event_name, description) => {
    // API Call 
    const response = await fetch(`${host}/api/events/updateEvent/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({event_name, description})
    });
    const json = await response.json();
    console.log(json);

    // Logic to edit in client
    let newUpdatedEvents=JSON.parse(JSON.stringify(events))
    for (let index = 0; index < newUpdatedEvents.length; index++) {
      
      if (newUpdatedEvents[index]._id === id) {
        /* console.log(`change title ${newUpdatedNotes[index].title} to ${title}`) */
        newUpdatedEvents[index].event_name=event_name;
        newUpdatedEvents[index].description=description;
     
        break;
      } 
    }
    setEvents(newUpdatedEvents)

  }

  const getmainEvents = async () => {
    // API Call 
    const response = await fetch(`${host}/api/events/fetchallmainevents`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
        }
    });
    const json = await response.json()
    //console.log(json)
    setmainEvents(json)
}

const getmainEventsbyAdmin = async () => {
    // API Call 
    const response = await fetch(`${host}/api/admin/fetchEventsByAdmin`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "adminAuth-token": localStorage.getItem('admin-token')
        }
    });
    const json = await response.json()
    //console.log(json)
    setmainEvents(json)
}

    return (
        <EventContext.Provider value={{ events, getEvents, addEvent, deleteEvent, editEvent, mainevents, getmainEvents, getmainEventsbyAdmin }}>
            {props.children}
        </EventContext.Provider>
    )

}

export default EventStates;