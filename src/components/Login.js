import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({email:"", password:""});

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    let history=useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email: credentials.email, password: credentials.password})
     });
     const json = await response.json()
     console.log(json);
     if(json.success){
        //save the authtoken and redirect
        localStorage.setItem('token',json.authtoken);
        props.showAlert('Logged in successfylly','success');
        history("/");
     }else{
        props.showAlert('Invalid Credentials','error');
     }
    }

    return (
        <div>
            <h2 className='mt-3'>Login to enroll in event(s)</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form></div>
    )
}

export default Login