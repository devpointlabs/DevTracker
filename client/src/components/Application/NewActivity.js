import React, { Component } from "react";
import styled from "styled-components";
import PhoneCallForm from "./PhoneCallForm";
import InterviewForm from "./InterviewForm";
import OfferForm from './OfferForm';

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
      let { application } = this.props;
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                     <path d="M238.4 176.6l83.1-76.2c3-2.7 6.8-4.2 10.8-4.2h101c4.3 0 8.3 1.7 11.4 4.8l60.7 59.1H632c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H518.5l-51.2-49.9c-9.1-9.1-21.1-14.1-33.9-14.1h-101c-10.4 0-20.1 3.9-28.3 10-8.4-6.5-18.7-10.3-29.3-10.3h-69.5c-12.7 0-24.9 5.1-34 14.1L121.4 128H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h126.6l59.3-59.3c3-3 7.1-4.7 11.3-4.7h69.5c.9 2.2.3.7 1.1 2.9l-59 54.1c-28.2 25.9-29.6 69.2-4.2 96.9 14.3 15.6 58.6 39.3 96.9 4.2l22.8-20.9 125.6 101.9c6.8 5.5 7.9 15.7 2.3 22.5l-9.5 11.7c-5.4 6.6-15.4 8.1-22.5 2.3l-17.8-14.4-41.5 51c-7.5 9.3-21 10.2-29.4 3.4l-30.6-26.1-10.4 12.8c-16.7 20.5-47 23.7-66.6 7.9L142 320.1H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h121.2l81.5 78c29.8 24.1 71.8 23.4 101-.2l7.2 6.2c9.6 7.8 21.3 11.9 33.5 11.9 16 0 31.1-7 41.4-19.6l21.9-26.9c16.4 8.9 42.9 9 60-12l9.5-11.7c6.2-7.6 9.6-16.6 10.5-25.7H632c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H486.8c-2.5-3.5-5.3-6.9-8.8-9.8l-121.9-99 28.4-26.1c6.5-6 7-16.1 1-22.6s-16.1-6.9-22.6-1l-75.1 68.8c-14.4 13.1-38.6 12-51.7-2.2-13.5-14.7-12.6-37.9 2.3-51.6z" />
                  </svg>
                  Offer
               </Button>
            </FormSelection>
            {phone ? <PhoneCallForm app_id={application.id}/> : interview ? <InterviewForm app_id={application.id}/> : <OfferForm app_id={application.id}/>}
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
