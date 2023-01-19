import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./LoginForm.css";
import { SERVER_URL } from './constants';
import { ToastContainer, toast } from 'react-toastify';
import store from "../store/store";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

function LoginForm() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();

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
    }
    const resEmail = await fetch(`${SERVER_URL}/users/email/${email}`);
    if(resEmail.status === 200){
      const user = await resEmail.json();
      if(user.password === password){
        const action = { type: "logIn", idUser: user.id};
        store.dispatch(action);
        toast.success("Succesfully logged in!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          style: {
            marginTop: "5rem",
            fontSize: "1.2rem"
          }
        });
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }else{
        toast.error("Invalid password", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          style: {
            marginTop: "5rem"
          }
        });
      }
    }else{
      toast.error("User not found", {
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
        <form className ='form'>
          <label>
            Email:
            <input className='input-login'
              type="text"
              placeholder="Enter your email" 
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </label>
          <label>
            Password:
            <input className='input-login'
              type="password"
              placeholder="Enter your password" 
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </label>
          <ToastContainer></ToastContainer>
          <div className='login'>
            <Link to="/forgotPassword" className="nav-link">
              Forgot password?
            </Link>
          </div>
          <button type="submit" className="button" onClick={handleSubmit}>Log in</button>
          <div className='login'>
            <h2>Don't have an account?</h2>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;