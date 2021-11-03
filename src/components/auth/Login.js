import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Button, Form, Image } from 'react-bootstrap';
import './login_registration.css';
 

const Auth = (props) => {
//    variable name, functionname = initial value
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(true);

const title = () => {
    return !login ? 'Signup' : 'Login'
}

const loginToggle = (e) => {
    e.preventDefault();

    setLogin(!login)

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
}

const signupFields = () => !login ?
(
<div>

                
        <label html4="firstName">First Name:</label>
        <br/>
        <input type='text' id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
        <br/>
        <label html4="lastName">Last Name:</label>
        <br/>
        <input type='text' id='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
        <br/>
    </div>
) : null

const handleSubmit = event => {

    console.log(handleSubmit)
    event.preventDefault();

    let reqBody = login ?
    {
    email: email,
    password: password
    } :
    {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    }

    let url = login ?
    'http://localhost:4000/user/login' :
    'http://localhost:4000/user/register'

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: new Headers({
            'Content-Type' : 'application/json'
        })
    })
    .then(response => response.json())
    .then(json => props.updateToken(json.token))
    .catch(err => console.log(err))

}
    
    return ( 
        <div className="Background_Image">

           <form>
                <button onClick={loginToggle}>Login / Signup Toggle</button>
                <br/>
                <h1>{title()}</h1>
                {signupFields()}
                <label html4="email">Email</label>
                <br/>
                <input type='text' id="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <br/>
                <label html4="password">password</label>
                <br/>
                <input type='text' id='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <br/>
                <button type='submit' onClick={handleSubmit}>Submit</button>

            </form>

        </div>
    )

}

export default Auth;