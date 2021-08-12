import React, { useState } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
        const mutationResponse = await login({
          variables: { email: formState.email, password: formState.password },
        });
        const token = mutationResponse.data.login.token;
        Auth.login(token);
      } catch (e) {
        console.log(e);
      }
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
        <WelcomeText>Welcome</WelcomeText>
        <InputContainer>
          <Input placeholder="Email"
                 name="email"
                 type="email"
                 id="email"
                 onChange={handleChange}
                 />
          <Input placeholder="******"
                 name="password"
                 type="password"
                 id="pwd"
                 onChange={handleChange}
                 />
            {error ? (
            <div>
                <p className="error-text">The provided credentials are incorrect</p>
            </div>
            ) : null}
        </InputContainer>
        <ButtonContainer>
          <Button type="submit" onClick={handleFormSubmit} >Login</Button>
        </ButtonContainer>
        <HorizontalRule />
        <GoContainer><Link to="/signup">Go to Signup</Link></GoContainer>
      </MainContainer>
    )
}

export const MainContainer = styled.div`
  margin: 10rem 0 0 60rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 70vh;
  width: 30vw;
  background: grey;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 1440px) {
    width: 40vw;
    height: 70vh;
    margin: 10rem 0 0 28rem;
    hr {
      margin-bottom: 1rem;
    }
    h4 {
      font-size: medium;
    }
  }
  @media only screen and (max-width: 1024px) {
    width: 40vw;
    height: 70vh;
    margin: 10rem 0 0 20rem;
    hr {
      margin-bottom: 1rem;
    }
    h4 {
      font-size: medium;
    }
  }
  @media only screen and (max-width: 768px) {
    width: 40vw;
    height: 60vh;
    margin: 10rem 0 0 15rem;
    hr {
      margin-bottom: 2rem;
    }
    h4 {
      font-size: small;
    }
  }

  @media only screen and (max-width: 425px) {
    width: 80vw;
    height: 50vh;
    margin: 10rem 0 0 3rem;
    hr {
      margin-bottom: 2rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (max-width: 375px) {
    width: 80vw;
    height: 50vh;
    margin: 10rem 0 0 2.8rem;
    hr {
      margin-bottom: 1.5rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (max-width: 320px) {
    width: 90vw;
    height: 50vh;
    margin: 10rem 0 0 1rem;
    hr {
      margin-bottom: 1.5rem;
    }
    h4 {
      font-size: small;
    }
  }
`;

export const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 30%;
  width: 100%;
`;

export const Input = styled.input`
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border-radius: 2rem;
    width: 80%;
    height: 3rem;
    padding: 1rem;
    border: none;
    outline: none;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
    }
    &::placeholder {
    color: #fff;
    font-weight: 100;
    font-size: 1rem;
    }
`;

export const Button = styled.button`
    background: linear-gradient(to right, #14163c 0%, #03217b 79%);
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 65%;
    height: 3rem;
    border: none;
    color: white;
    border-radius: 2rem;
    cursor: pointer;
`;

export const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;


export const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;


export const GoContainer = styled.h4`
  cursor: pointer;
`;


export default Login
