import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import "./LoginForm.css";

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
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    // Send a request to the server to verify the username and password
  }

  return (
    <Container>
      <Box>
        <Form onSubmit={handleSubmit}>
          <label>
            Username:
            <Input
              type="text"
              value={username}
              onChange={event => setUsername(event.target.value)}
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
          <Button type="submit">Log in</Button>
        </Form>
      </Box>
    </Container>
  );
}

export default LoginForm;