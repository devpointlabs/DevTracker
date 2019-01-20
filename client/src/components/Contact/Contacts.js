import React, { Component } from "react";
import { connect } from 'react-redux';
import { deleteContact, getContacts } from "../../reducers/contacts";
import NavBar from '../Dashboard/NavBar';
import styled from 'styled-components';
import { AuthConsumer } from "../../providers/AuthProvider";
import ContactForm from './ContactForm';
import ContactList from './ContactList';

class Contacts extends Component {
  
  componentDidMount() {
    console.log(this.props);
    let {
      auth: { user }, dispatch
    } = this.props;
    dispatch(getContacts(user.id))
  }

  deleteContact = (id) => {
    let { auth: { user }, dispatch } = this.props;
    dispatch(deleteContact(user, id));
  }

    render() {
      let { auth: { user }, contacts } = this.props;
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

  const ContactContainer = styled.div`
   width: 100%;
  display: flex;
  margin-top: 25px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;
  
  const mapStateToProps = (state) => {
    return { contacts: state.contacts, };
  }

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