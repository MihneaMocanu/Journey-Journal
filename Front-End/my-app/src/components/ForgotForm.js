import emailjs from 'emailjs-com';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./LoginForm.css";
import { SERVER_URL } from './constants';
import { ToastContainer, toast } from 'react-toastify';
import store from "../store/store";
import 'react-toastify/dist/ReactToastify.css';
import { SignJWT } from 'jose';
emailjs.init("service_q40254f");


function rand(){ 
  return Math.random().toString(36).substring(2);
}

const sendEmail = (email, token) => {

    const message = {
        userEmail: email,
        subject: 'Reset Password Token',
        text: `Your token is: ${token} and will expire in 10 minutes`,
        from: 'JourneyJournal',
    };

    emailjs.send("service_q40254f", 'template_abaz6ub', message,'wu6NVoCH_lkHMX-bw')
        .then(() => {
            console.log('email sent');
        })
        .catch(err => 
            toast.error('Failed to send email. Error: ', err, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                style: {
                  marginTop: "5rem"
                }
              }));
}

function ForgotForm() {
  
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypedPassword, setRetypedPassword] = useState('');
  const [sent, setSent] = useState(false);
  const [token, setToken] = useState('')
  const [tokenReceived, setTokenReceived] = useState('')

  async function handleReset(event){
    event.preventDefault();
  }
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
    
    const resEmail = await fetch(`${SERVER_URL}/users/email/${email}`);
    if(resEmail.status !== 200){
        toast.error("User not found", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            style: {
              marginTop: "5rem"
            }
        });
        return;
    }
    
    const user = await resEmail.json();
    setToken(rand() + rand());
    const timeout = 10 * 60 * 1000;
    setTimeout(() => {
       setToken('');
    }, timeout);
    //sendEmail(email, token);
    setSent(true);
  }

  
  return (
    <div className='container-login'>
      <div className='box'>
        <form className ='form'>
              <label>
              Email:
              <input className="input-login" 
                type="text"
                placeholder="Enter your email" 
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </label>
            <ToastContainer></ToastContainer>
            { sent ? (
            <div>
            <label>
              Token:
              <input className="input-login" 
                type="text"
                placeholder="Enter the token you received" 
                value={tokenReceived}
                onChange={event => setTokenReceived(event.target.value)}
              />
            </label>
            <label>
            Current Password:
            <input className="input-login" 
              type="password"
              placeholder="Enter your current password" 
              value={currentPassword}
              onChange={event => setCurrentPassword(event.target.value)}
            />
          </label>
            <label>
            New Password:
            <input className="input-login" 
              type="password"
              placeholder="Enter your new password" 
              value={newPassword}
              onChange={event => setNewPassword(event.target.value)}
            />
          </label>
            <label>
            Current Password:
            <input className="input-login" 
              type="password"
              placeholder="Enter your current password" 
              value={currentPassword}
              onChange={event => setCurrentPassword(event.target.value)}
            />
          </label> 
          <button type="submit" className="button" onClick={handleReset}>Reset</button>
          </div>) :  <button type="submit" className="button" onClick={handleSubmit}>Submit</button>}
           
        </form>
      </div>
    </div>
  );
}

export default ForgotForm;