import React from "react";
import {Link,} from 'react-router-dom';
import styled from "styled-components";
import ParticlesContainer from './ParticlesContainer';
import LoginForm from './LoginForm';

const Login = () => (
    <Container>
        <LoginContainer>
          <LoginForm />
          <p>New to Dev Tracker? <Link to="/register">Sign up for free!</Link></p>
        </LoginContainer>
        <LogoContainer>
          <ParticlesContainer/>
          <h1>DevTracker</h1>
        </LogoContainer>
      </Container>
)

export default Login;



const LoginContainer = styled.div`
  width: 50%;
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  h1 {
    font-weight: lighter;
  }

  p {
    color: rgba(0,0,0,0.8);
    font-size: 14px;
    margin-top: 25px;
  }
`;

const LogoContainer = styled.div`
  width: 50%;
  background-color: red;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #8E2DE2, #4A00E0);
  position: relative;

  h1 {
    color: white;
    letter-spacing: 2px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
`;


