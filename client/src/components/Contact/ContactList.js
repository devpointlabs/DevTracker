import React from 'react';
import Contact from './Contact';
import ContactForm from './ContactForm';
import axios from 'axios';
import { AuthConsumer } from "../../providers/AuthProvider"

class ContactList extends React.Component {
  state = { contacts: [] };


  componentDidMount() {
    const { auth: { user: { id } } } = this.props
    axios.get(`/api/users/${id}/contacts`)
      .then(res => {
        this.setState({ contacts: res.data })
      })
  }

  deleteContact = (contactId) => {
    const { auth: { user: { id } } } = this.props
    axios.delete(`/api/users/${id}/contacts/${contactId}`)
      .then(res => {
        const contacts = this.state.contacts.filter(contact => {
          if (contact.id !== contactId)
            return contact;

        })
        this.setState({ contacts })
      })
  }

  addContact = (contact) => { 
    const {auth: {user: { id }}} = this.props;
    const {contacts} = this.state; 
    axios.post(`/api/users/${id}/contacts`, contact)
      .then(({ data }) => {
        this.setState({ contacts: [data, ...contacts] })
      })
  };

  render() {
    const { contacts } = this.state;
    return (
      <div>
        <ContactForm addContact={this.addContact} />
        {contacts.map(contact =>
          <Contact key={contact.id} {...contact} deleteContact={this.deleteContact} />
        )}
      </div>
    );
  }
}




export default class ConnectedContactList extends React.Component {
  render() {
    return (
      < AuthConsumer >
        {auth =>
          < ContactList {...this.props} auth={auth} />
        }
      </AuthConsumer>
    )
  }
}
