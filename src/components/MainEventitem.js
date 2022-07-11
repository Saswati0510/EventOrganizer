import React from 'react'

const MainEventitem = (props) => {
    const { m_event } = props;
    return (
        <div className="card my-3" >

            <div className="card-body">
                <div className='d-flex justify-content-between'>
                    <h5 className="card-title">{m_event.name}</h5>
                    <div className='d-flex justify-content-between' style={{ 'width': '15%' }}>
                        <i className="fa-solid fa-trash-can"></i>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                </div>
                <p className="card-text">Description:{m_event.description} {'   '} Time:{m_event.date_time}</p>

            </div>
        </div>

    )
}

export default MainEventitem