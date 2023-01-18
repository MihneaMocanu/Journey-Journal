import emailjs from 'emailjs-com';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./LoginForm.css";
import { SERVER_URL } from './constants';
import { ToastContainer, toast } from 'react-toastify';
import store from "../store/store";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
emailjs.init("service_q40254f");


function rand(){ 
  return Math.random().toString(36).substring(2);
}

const sendEmail = (email, token) => {
    console.log(token);
    const message = {
        userEmail: email,
        subject: 'Reset Password Token',
        text: `Hi, your token is: ${token} and will expire in 10 minutes`,
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
  const [user, setUser] = useState({})
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypedPassword, setRetypedPassword] = useState('');
  const [sent, setSent] = useState(false);
  const [token, setToken] = useState('')
  const [tokenReceived, setTokenReceived] = useState('')

  const navigate = useNavigate();

  async function handleReset(event){
    event.preventDefault();

    console.log(token)

    if(tokenReceived === ' '){
      toast.error("Empty token field", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        style: {
          marginTop: "5rem"
        }
      });
      return;
    }

    if(tokenReceived !== token){
      toast.error("Invalid token", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        style: {
          marginTop: "5rem"
        }
      });
      return;
    }

    if(newPassword === ''){
      toast.error("Empty new password", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        style: {
          marginTop: "5rem",
          fontSize: "1.2rem"
        }
      });
      return;
    }

    if(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(newPassword) === false){
      toast.error("Password must include at least one upper case, one lower, one digit, one special character", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          marginTop: "5rem"
        }
      });
      return;
    }

    if(retypedPassword === ''){
      toast.error("Empty retyped password", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        style: {
          marginTop: "5rem",
          fontSize: "1.2rem"
        }
      });
      return;
    }

   
    if(user.password === newPassword){
      toast.error("The new password is the same as the old one", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        style: {
          marginTop: "5rem",
          fontSize: "1.2rem"
        }
      });
      return;
    }

    if(retypedPassword !== newPassword){
      toast.error("Passwords do not match", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        style: {
          marginTop: "5rem",
          fontSize: "1.2rem"
        }
      });
      return;
    }

    user.password = newPassword;
    const res = await fetch(`${SERVER_URL}/users/${user.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    
    if(res.status === 200)
    {
      toast.success("Succesfully reseted your password!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        style: {
          marginTop: "5rem",
        }
      });
      setTimeout(() => {
          navigate('/login');
      }, 2000);
    }
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
    
    setUser(await resEmail.json());
    let aux = rand() + rand();
    setToken(aux);
    const timeout = 10 * 60 * 1000;
    setTimeout(() => {
       setToken('');
    }, timeout);
    sendEmail(email, aux);
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
            New Password:
            <input className="input-login" 
              type="password"
              placeholder="Enter your new password" 
              value={newPassword}
              onChange={event => setNewPassword(event.target.value)}
            />
          </label>
            <label>
            Retyped Password:
            <input className="input-login" 
              type="password"
              placeholder="Enter your current password" 
              value={retypedPassword}
              onChange={event => setRetypedPassword(event.target.value)}
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