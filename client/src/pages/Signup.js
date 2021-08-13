import React, { useState } from 'react'
import {MainContainer, WelcomeText, InputContainer, Input,
ButtonContainer, Button, HorizontalRule, GoContainer} from './Login';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

const Signup = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
    return (
        <MainContainer>
        <WelcomeText>Sign Up</WelcomeText>
        <InputContainer>
          <Input name="firstName"
                 type="firstName"
                 id="firstName"
                 placeholder="First name"
                 onChange={handleChange} />
          <Input name="lastName"
                 type="lastName"
                 id="lasttName"
                 placeholder="Last name"
                 onChange={handleChange} />
          <Input name="email"
                 type="email"
                 id="email"
                 placeholder="Email"
                 onChange={handleChange} />
          <Input placeholder="******"
                 name="password"
                 type="password"
                 id="pwd"
                 onChange={handleChange} />
        </InputContainer>
        <ButtonContainer>
          <Button type="submit" onClick={handleFormSubmit} >Sign-up</Button>
        </ButtonContainer>
        <HorizontalRule />
        <GoContainer><Link to="/signup">Go to Login</Link></GoContainer>
      </MainContainer>
    )
}

export default Signup
