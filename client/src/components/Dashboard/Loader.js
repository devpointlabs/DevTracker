import React from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";

const LoadingContainer = () => {
   return (
      <Container>
         <Loader type="Oval" color="#00BFFF" height="100" width="100" />
      </Container>
   );
};

const Container = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   height: 100%;
   min-height: calc(100vh - 90px);
   background-color: rgba(0,0,0,0.4);
   z-index: 9999;
`;

export default LoadingContainer;
