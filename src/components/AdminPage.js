import React from 'react'
import AllUsers from './AllUsers'
import MainEvent from './MainEvent'


const AdminPage = (props) => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-xs-12 col-lg-6'>
          <h3 className='text-center'>All Events</h3>
          <MainEvent showAlert={props.showAlert}></MainEvent>
        </div>
        <div className='col-xs-12 col-lg-6'>
          <h3 className='text-center'>User Details</h3>
          <AllUsers showAlert={props.showAlert}></AllUsers>
        </div>
      </div>
    </div>
  )
}

export default AdminPage