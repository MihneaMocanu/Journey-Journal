import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
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

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
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
          </label>
          <Button type="submit">Register</Button>
        </Form>
      </Box>
    </Container>
  );
}

export default RegisterForm;