import React from 'react';
import { connect } from 'react-redux';
import { getContacts } from '../../reducers/contacts';
import styled from 'styled-components';
import { AuthConsumer } from '../../providers/AuthProvider'
import ContactForm from './ContactForm'
import NavBar from '../Dashboard/NavBar';

class ContactList extends React.Component {

  state = { showForm: false, };

  componentDidMount() {
    console.log(this.props);
    let {
      auth: { user }, dispatch
    } = this.props;
    dispatch(getContacts(user.id))
  }

  contacts = () => {
    return this.props.contacts.map(contact =>
      <Contact key={contact.id}>
        <ContactContainer>
          <ContactInfo>
            <ContactHeader>{contact.first_name} {contact.last_name}</ContactHeader>
            <ContactBody>
              {contact.job}
              {contact.title}
              {contact.email}
              {contact.linkedin}
              {contact.workphone}
              {contact.personal_phone}
            </ContactBody>
          </ContactInfo>
        </ContactContainer>
      </Contact>
    )
  }

  render() {
    const { auth: { user }, } = this.props;
    return (
      <>
        <NavBar />
        <PageContainer>
          <InnerContainer>
            <ContactForm user={user} />
            <ContactsGrid>
              {this.contacts()}
            </ContactsGrid>
          </InnerContainer>
        </PageContainer>
      </>
    );
  }
}

const PageContainer = styled.div`
  position: relative;
  height: 100%;
  min-height: calc(100vh - 90px);
  width: 100%;
  padding: 1em;
`;

const InnerContainer = styled.div`
  flex-direction: row;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1em;
  width: 100%;
  `;

const ContactsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1em;
  


`;

const Contact = styled.div`
`;

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

const ContactInfo = styled.div`
   display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1em;
`;

const ContactHeader = styled.h3`
  padding-bottom: 5px;
`;

const ContactBody = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const mapStateToProps = (state) => {
  return { contacts: state.contacts, };
}

export class ConnectedContactList extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <ContactList {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default connect(mapStateToProps)(ConnectedContactList);


