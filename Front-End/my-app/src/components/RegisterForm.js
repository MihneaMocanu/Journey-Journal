import React, { useState } from 'react';
import styled from 'styled-components';
import { SERVER_URL } from './constants';
import { useSelector, useDispatch } from "react-redux";
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

function RegisterForm() {
  //FORM FIELDS
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      const data = await res.json();
      const id = data.id;
      const action = { type: "logIn", idUser: id};
      store.subscribe(() =>  store.dispatch(action));
      console.log(`New user ID: ${id}`);
      console.log(user)
    }else {
      toast.error("Internal server error", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      });
    }
}

  return (
    
      <Container>
        <Box>
        <Form onSubmit={handleSubmit}>
         
          <label>
            First Name:
            <Input
              type="text"
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
            />
          </label>
          <label>
            Last Name:
            <Input
              type="text"
              value={lastName}
              onChange={event => setLastName(event.target.value)}
            />
          </label>
          <label>
            Email:
            <Input
              type="email"
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
          <ToastContainer></ToastContainer>
          </label>
          <Button type="submit">Register</Button>
        </Form>
      </Box>
     </Container>
  );
}

export default RegisterForm;