import React, { Component } from "react";
import styled from "styled-components";

class NewActivity extends Component {
   state = {
      phone: true,
      interview: false,
      offer: false
   };

   setActive = (button) => {
     
     this.setState({
      phone: false,
      interview: false,
      offer: false,
      [button]: true
     })
   }

   render() {
      let { application, user } = this.props;
      return (
         <NewActivityContainer>
            <SectionTitle>New Activity</SectionTitle>
            <FormSelection>
               <Button active={this.state.phone} onClick={() => this.setActive('phone')}>Phone Call</Button>
               <Button active={this.state.interview} onClick={() => this.setActive('interview')}>Interview</Button>
               <Button active={this.state.offer} onClick={() => this.setActive('offer')}>Offer</Button>
            </FormSelection>
         </NewActivityContainer>
      );
   }
}

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

const FormSelection = styled.div`
   display: flex;
   flex-direction: row;
   width: 100%;
   justify-content: center;
   align-items: center;
   margin-top: 25px;
   border-radius: 5px;
   border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 20px 0;
  outline: none;
  font-weight: lighter;
  background-color: ${props => {
    return props.active ? "#8e2de2" : "rgba(0,0,0,0.03)"
  }};
  color: ${props => {
    return props.active ? "#fff" : "#666"
  }};
  border: none;
  font-size: 14px;
  flex: 1;
  cursor: pointer;
  &:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-right: 1px solid #ccc;
  }
  &:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-left: 1px solid #ccc;
  }
`;

export default NewActivity;
