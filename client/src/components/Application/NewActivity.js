import React from "react";
import styled from "styled-components";

const NewActivity = ({ application, user }) => (
  <NewActivityContainer>
    <SectionTitle>New Activity</SectionTitle>
  </NewActivityContainer>
);

const SectionTitle = styled.h3`
  font-weight: lighter;
  font-family: "Open Sans", sans-serif;
  color: #666;
`;

const NewActivityContainer = styled.div`
  background-color: white;
  padding: 1.25em;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.13);
  width: 100%;
  margin-top: 1em;
`;

export default NewActivity;
