import React, { Component } from "react";
import styled from "styled-components";
import PhoneCallForm from "./PhoneCallForm";
import InterviewForm from "./InterviewForm";
import OfferForm from "./OfferForm";

class NewActivity extends Component {
   state = {
      phone: true,
      interview: false,
      offer: false
   };

   setActive = button => {
      this.setState({
         phone: false,
         interview: false,
         offer: false,
         [button]: true
      });
   };

   render() {
      let { application, user } = this.props;
      let { phone, interview } = this.state;
      return (
         <NewActivityContainer>
            <SectionTitle>New Activity</SectionTitle>
            <FormSelection>
               <Button
                  active={this.state.phone}
                  onClick={() => this.setActive("phone")}
               >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                     <path d="M487.8 24.1L387 .8c-14.7-3.4-29.8 4.2-35.8 18.1l-46.5 108.5c-5.5 12.7-1.8 27.7 8.9 36.5l53.9 44.1c-34 69.2-90.3 125.6-159.6 159.6l-44.1-53.9c-8.8-10.7-23.8-14.4-36.5-8.9L18.9 351.3C5 357.3-2.6 372.3.8 387L24 487.7C27.3 502 39.9 512 54.5 512 306.7 512 512 307.8 512 54.5c0-14.6-10-27.2-24.2-30.4zM55.1 480l-23-99.6 107.4-46 59.5 72.8c103.6-48.6 159.7-104.9 208.1-208.1l-72.8-59.5 46-107.4 99.6 23C479.7 289.7 289.6 479.7 55.1 480z" />
                  </svg>
                  Phone Call
               </Button>
               <Button
                  active={this.state.interview}
                  onClick={() => this.setActive("interview")}
               >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                     <path d="M464 128H352V80c0-26.47-21.53-48-48-48h-96c-26.47 0-48 21.53-48 48v48H48c-26.5 0-48 21.5-48 48v256c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V176c0-26.5-21.5-48-48-48zM192 80c0-8.83 7.19-16 16-16h96c8.81 0 16 7.17 16 16v48H192V80zM96 448H48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48v288zm288 0H128V160h256v288zm96-16c0 8.8-7.2 16-16 16h-48V160h48c8.8 0 16 7.2 16 16v256z" />
                  </svg>
                  Interview
               </Button>
               <Button
                  active={this.state.offer}
                  onClick={() => this.setActive("offer")}
               >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
                     <path d="M139.315 32c6.889 0 12.364 5.787 11.982 12.666l-14.667 264c-.353 6.359-5.613 11.334-11.982 11.334H67.352c-6.369 0-11.628-4.975-11.982-11.334l-14.667-264C40.321 37.787 45.796 32 52.685 32h86.63M96 352c35.29 0 64 28.71 64 64s-28.71 64-64 64-64-28.71-64-64 28.71-64 64-64M139.315 0h-86.63C27.457 0 7.353 21.246 8.753 46.441l14.667 264c.652 11.728 5.864 22.178 13.854 29.665C14.613 357.682 0 385.168 0 416c0 52.935 43.065 96 96 96s96-43.065 96-96c0-30.832-14.613-58.318-37.274-75.894 7.991-7.487 13.203-17.937 13.854-29.665l14.667-264C184.647 21.251 164.548 0 139.315 0z" />
                  </svg>
                  Offer
               </Button>
            </FormSelection>
            {phone ? (
               <PhoneCallForm
                  app={application}
                  app_id={application.id}
                  user={user}
               />
            ) : interview ? (
               <InterviewForm
                  app={application}
                  app_id={application.id}
                  user={user}
               />
            ) : (
               <OfferForm app_id={application.id} user={user} />
            )}
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
   padding: 10px 0;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   fill: ${props => {
      return props.active ? "#fff" : "#666";
   }};
   outline: none;
   font-weight: lighter;
   background-color: ${props => {
      return props.active ? "#8e2de2" : "rgba(0,0,0,0.03)";
   }};
   color: ${props => {
      return props.active ? "#fff" : "#666";
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

   svg {
      width: 25px;
      height: 25px;
      margin-bottom: 5px;
   }
`;

export default NewActivity;
