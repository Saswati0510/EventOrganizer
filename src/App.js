
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import EventStates from './context/events/EventStates';
import UserStates from './context/users/UserStates';
import Alert from './components/Alert';
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import TwentyFourSevenOffice from './components/TwentyFourSevenOffice';
import AdminPage from './components/AdminPage';
import { AdminLogin } from './components/AdminLogin';


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500)
  }
  return (
    <>
    <UserStates>
      <EventStates>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className='container'>
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}></Home>} />
          <Route exact path="/officepage" element={<TwentyFourSevenOffice/>} />
          <Route exact path="/about" element={<About></About>} />
          <Route exact path="/login" element={<Login showAlert={showAlert}></Login>} />
          <Route exact path="/signup" element={<Signup showAlert={showAlert}></Signup>} />
          <Route exact path="/adminLogin" element={<AdminLogin showAlert={showAlert}></AdminLogin>} />
          <Route exact path="/admin" element={<AdminPage showAlert={showAlert}></AdminPage>} />

        </Routes>
        </div>
      </Router>
      </EventStates>
      </UserStates>
    </>
  );
}

export default App;