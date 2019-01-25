import React from "react";
import Contact from "./Contact";
import styled from "styled-components";

const ContactList = ({ contacts, user }) => {
  let sorted_contacts = contacts.sort((a,b) => {   
    if(a.last_name < b.last_name) return -1;
    if(a.last_name > b.last_name) return 1;
    return 0;
  }); 

   return (
      <ContactGrid>
         {sorted_contacts.map(contact => (
            <Contact {...contact} key={contact.id} user={user}/>
         ))}
      </ContactGrid>
   );
};

const ContactGrid = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr;
   grid-gap: 1em;
   width: 100%;
   flex: 3;
   margin-left: 1em;
`;

export default ContactList;
