import React, { useState } from 'react';
import { SERVER_URL } from './constants';
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import store from "../store/store";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import "./RegisterForm.css";

function RegisterForm() {
  //FORM FIELDS
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    let user = {
      firstName,
      lastName,
      email,
      password
    }

    if(firstName === ''){
      toast.error("Empty first name", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          marginTop: "5rem"
        }
      });
      return;
    }
    if(lastName === ''){
      toast.error("Empty name", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          marginTop: "5rem"
        }
      });
      return;
    }
    if(email === ''){
      toast.error("Empty email", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          marginTop: "5rem"
        }
      });
      return;
    }
    if(password === ''){
      toast.error("Empty password", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          marginTop: "5rem"
        }
      });
      return;
    }else if(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(password) === false){
      toast.error("Password must include at least one upper case, one lower, one digit, one special character", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          marginTop: "5rem"
        }
      });
      return;
    }

    const resEmail = await fetch(`${SERVER_URL}/users/email/${email}`);
    if(resEmail.status === 200){
      toast.error("Email already in use", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          marginTop: "5rem"
        }
      });
      return;
    }

    const res = await fetch(`${SERVER_URL}/newUser`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    
    if(res.status === 200){ //sucess register
      toast.success("Succesfully registered your account!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        style: {
          marginTop: "5rem"
        }
      });
      setTimeout(() => {
          navigate('/login');
      }, 1000);
    }else {
      toast.error("Internal server error", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          marginTop: "5rem"
        }
      });
    }
}

  return (
    
      <div className='container-login'>
        <div className='box'>
        <form className='form'>
         
          <label>
            First Name:
            <input className="input-login" 
              type="text"
              placeholder="Enter your first name" 
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
            />
          </label>
          <label>
            Last Name:
            <input className="input-login" 
              type="text"
              placeholder="Enter your last name" 
              value={lastName}
              onChange={event => setLastName(event.target.value)}
            />
          </label>
          <label>
            Email:
            <input className="input-login" 
              type="email"
              placeholder="Enter your email" 
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </label>
          <label>
            Password:
            <input className="input-login" 
              type="password"
              placeholder="Enter your password" 
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          <ToastContainer></ToastContainer>
          </label>
          <button type="submit" className="button" onClick={handleSubmit}>Register</button>
        </form>
      </div>
     </div>
  );
}

export default RegisterForm;