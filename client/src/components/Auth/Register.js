import React from "react";
import styled from "styled-components";
import ParticlesContainer from './ParticlesContainer';
import RegisterForm from './RegisterForm';
import logo from '../../assets/logo.png';

const Register = () => (
  <Container>
    <RegisterContainer>
      <RegisterForm />
    </RegisterContainer>
    <LogoContainer>
      <ParticlesContainer />
      <img src={logo} className="logo" alt="site-logo"/>
    </LogoContainer>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
`;

const RegisterContainer = styled.div`
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
    color: black;
  }

  p {
    color: rgba(0, 0, 0, 0.8);
    font-size: 14px;
    margin-top: 25px;
  }
`;

const LogoContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #8e2de2, #4a00e0);
  position: relative;



  .logo {
    max-width: 450px;
  }

  h1 {
    color: white;
    letter-spacing: 2px;
  }
`;


export default Register;

