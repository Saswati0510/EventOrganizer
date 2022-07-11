import React, {useEffect, useContext} from 'react'
import eventContext from '../context/events/EventContext'
import {useNavigate} from 'react-router-dom'
import MainEventitem from './MainEventitem'

const MainEvent = (props) => {
  const context = useContext(eventContext);
  const { mainevents, getmainEventsbyAdmin } = context;
  let history=useNavigate();
  useEffect(() => {
      if(localStorage.getItem('admin-token')){
        getmainEventsbyAdmin();
      }else{
          props.showAlert('Please login to continue','warning')
          history("/adminLogin");
      }
    
      // eslint-disable-next-line
  }, []);

  return (
    <>
      {mainevents.map((me) => {
        return <MainEventitem key={me._id} m_event={me}></MainEventitem>
      })}</>
  )
}

export default MainEvent