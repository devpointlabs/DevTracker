import React, { Component } from "react";
import { connect } from "react-redux";
import { getContacts } from "../../reducers/contacts";
import NavBar from "../Dashboard/NavBar";
import styled, { keyframes } from "styled-components";
import { AuthConsumer } from "../../providers/AuthProvider";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

class Contacts extends Component {

   componentDidMount() {
      let {
         auth: { user },
         dispatch
      } = this.props;
      dispatch(getContacts(user.id));
   }

   render() {
      let {
         auth: { user },
         contacts,
      } = this.props;
      return (
         <>
            <NavBar />
            <ContactTitle>Contacts</ContactTitle>
            <ContactContainer>
               <ContactForm user={user} />
               <ContactList contacts={contacts} user={user}/>
            </ContactContainer>
         </>
      );
   }
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ContactTitle = styled.h1`
   font-weight: lighter;
   font-family: "Open Sans", sans-serif;
   color: #666;
   margin: 25px 1em 0;
`;

const ContactContainer = styled.div`
   height: 100%;
   min-height: calc(100vh - 90px);
   width: 100%;
   max-width: 1400px;
   margin: 0 auto;
   padding: 25px 1em;
   animation: ${fadeIn} 0.5s linear;
   position: relative;
   display: flex;
   flex-direction: row;
   align-items: flex-start;
`;

const mapStateToProps = state => {
   return { contacts: state.contacts };
};

export class ConnectedContacts extends React.Component {
   render() {
      return (
         <AuthConsumer>
            {auth => <Contacts {...this.props} auth={auth} />}
         </AuthConsumer>
      );
   }
}

export default connect(mapStateToProps)(ConnectedContacts);
