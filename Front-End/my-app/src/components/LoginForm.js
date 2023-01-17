import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import "./LoginForm.css";
import { SERVER_URL } from './constants';
import { ToastContainer, toast } from 'react-toastify';
import store from "../store/store";
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  position: fixed;
  top: 25%;
  left: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
`;

const Box = styled.div`
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 32px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin-bottom: 16px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 380px;
`;

const Button = styled.button`
  margin-top: 16px;
  padding: 8px;
  font-size: 16px;
  color: white;
  background-color: #333;
  border: none;
  border-radius: 4px;
  width: 100%;
`;

function LoginForm() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const res = await fetch(`${SERVER_URL}/users/email/`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      params: {userEmail: email},
    });

    if(res.status === 200){ //sucess register
    
    }else {
      if(!(email && email.value)){
        toast.error("Empty password", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        });
      }
      if(!(password && password.value)){
        toast.error("Empty password", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        });
      }
      else{
        toast.error("Invalid creditentials", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        });
      }
    }
  }

  return (
    <Container>
      <Box>
        <Form onSubmit={handleSubmit}>
          <label>
            Email:
            <Input
              type="text"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </label>
          <label>
            Password:
            <Input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </label>
          <div className='login'>
            <h2>Don't have an account?</h2>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </div>
          <ToastContainer></ToastContainer>
          <Button type="submit">Log in</Button>
        </Form>
      </Box>
    </Container>
  );
}

export default LoginForm;