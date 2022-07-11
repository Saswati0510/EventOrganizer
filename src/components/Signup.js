import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email:"", password:"", age:"", phone:""});

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    let history=useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({ name:credentials.name, email: credentials.email, password: credentials.password, age:credentials.age, phone:credentials.phone})
     });
     const json = await response.json()
     console.log(json);
     if(json.success){
        //save the authtoken and redirect
        localStorage.setItem('token',json.authtoken);
        history("/login");
        props.showAlert('User created successfully', 'success')
     }else{
      props.showAlert('Invalid credentials', 'error')
     }
    }

  return (
    <div>
      <h2 className='mt-3'>Please sign up to participate in Events</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' placeholder='Enter your name'  minLength={3} required onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' placeholder='Enetr your email' aria-describedby="emailHelp"  onChange={onChange}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' minLength={5} required onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input type="number" className="form-control" id="age" name='age' required min="12" max="70" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="number" className="form-control" id="phone" name='phone' minLength={10} pattern="[1-9]{1}[0-9]{9}" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup