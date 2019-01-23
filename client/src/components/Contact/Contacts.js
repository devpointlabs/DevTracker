import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteContact, getContacts } from "../../reducers/contacts";
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

   deleteContact = id => {
      let {
         auth: { user },
         dispatch
      } = this.props;
      dispatch(deleteContact(user, id));
   };

   render() {
      let {
         auth: { user },
         contacts
      } = this.props;
      return (
         <>
            <NavBar />
            <ContactContainer>
               <ContactForm user={user} />
               <ContactList contacts={contacts} remove={this.deleteContact} />
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

const ContactContainer = styled.div`
   width: 100%;
   height: 100%;
   min-height: calc(100vh - 90px);
   display: flex;
   flex-direction: row;
   justify-content: flex-start;
   align-items: center;
   padding: 25px 1em;
   max-width: 1400px;
   animation: ${fadeIn} 0.5s linear;
   position: relative;
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
