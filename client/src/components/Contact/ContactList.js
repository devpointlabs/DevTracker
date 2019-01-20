import React from 'react';
import styled from 'styled-components';

class ContactList extends React.Component {

  state = {
    showForm: false,
  };


  render() {
    let { contacts} = this.props

    return contacts.map( contact =>
      
      
        <Contact key={contact.id} >
        <ContactInfo>
          <ContactName>{contact.first_name}-{contact.last_name}</ContactName>
          <ContactDetails>
            {contact.title}
            {contact.email}
            {contact.linkedin}
            {contact.workphone}
            {contact.personal_phone}
          </ContactDetails>
        </ContactInfo>
      </Contact>
    )
  }
}
// const PageContainer = styled.div`
//   position: relative;
//   height: 100%;
//   min-height: calc(100vh - 90px);
//   width: 100%;
//   padding: 1em;
// `;

const ContactDetails = styled.div`
  flex-direction: row;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1em;
  width: 100%;
  `;

const ContactName = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1em;
  


`;

const Contact = styled.div`
`;



const ContactInfo = styled.div`
   display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1em;
`;

// 

export default ContactList;


