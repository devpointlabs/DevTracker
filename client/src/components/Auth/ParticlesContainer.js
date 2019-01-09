import React from "react";
import Particles from 'react-particles-js';
import settings from '../../assets/particles.json';
import styled from 'styled-components';

const ParticlesContainer = () => (
  <Container>
    <Particles 
      height="100vh" 
      width="100%" 
      params={settings} 
    />
  </Container>
);

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export default ParticlesContainer;
