import React from 'react';
import { connect, } from 'react-redux'; 
import { addContact } from '../../reducers/contacts'
import styled from 'styled-components';
// import ContactList from './ContactList';
// import Contact from './Contact'

class ContactForm extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    job: "",
    title: "",
    email: "",
    linkedin: "",
    workphone: "",
    personal_phone: "",
    note_box: "",
  };


  addContact = (contact) => {
    const { dispatch, user } = this.props;
    dispatch(addContact(user, contact));
  };


  handleSubmit = (e) => {
    e.preventDefault();
    const contact = { ...this.state, };
    this.addContact(contact)
    this.setState({ first_name: "", last_name: "", job: "", title: "", email: "", linkedin: "", workphone: "", personal_phone: "", note_box: "", })
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };


  render() {
    const { first_name, last_name, job, title, email, linkedin, workphone, personal_phone, note_box } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <Title>Add Contact</Title>
        <input
          label="First Name"
          name="first_name"
          value={first_name}
          onChange={this.handleChange}
          placeholder="First Name"
          className="field"
        />
        <input
          label="Last Name"
          name="last_name"
          value={last_name}
          onChange={this.handleChange}
          placeholder="Last Name"
          className="field"
        />
        <input
          label="Job"
          name="job"
          value={job}
          onChange={this.handleChange}
          placeholder="Job"
          className="field"
        />
        <input
          label="Title"
          name="title"
          value={title}
          placeholder="Title"
          onChange={this.handleChange}
          className="field"
        />
        <input
          label="Email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={this.handleChange}
          className="field"
        />
        <input
          label="Linkedin"
          name="linkedin"
          value={linkedin}
          placeholder="Linkedin"
          onChange={this.handleChange}
          className="field"
        />
        <input
          label="Workphone"
          name="workphone"
          value={workphone}
          placeholder="Workphone"
          onChange={this.handleChange}
          className="field"
        />
        <input
          label="Personal Phone"
          name="personal_phone"
          value={personal_phone}
          placeholder="Personal Phone"
          onChange={this.handleChange}
          className="field"
        />
        {/* Change data type to text field */}
        <textarea
          label="Note Box"
          name="note_box"
          value={note_box}
          placeholder="Write Notes..."
          onChange={this.handleChange}
          className="notebox"
        />
        <input type="submit" value="Submit" className="submit" />
      </Form>
    )
  }
}


const Title = styled.h1`
  font-weight: lighter;
  font-family: "Open Sans", sans-serif;
  color: #666;
  
  text-align: center;
  
  margin-bottom: 20px; 
  
`;

const Form = styled.form`
  width: 20vw;
  min-height: 100vh;
  min-width: 300px;
  height: 100%;
  background-color: white;
  overflow-y: scroll;
  padding: 20px;
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

  .field {
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
    border: none;
    outline: none;
    font-size: 14px;
    border-bottom: 2px solid #f1f2f6;
    transition: 0.4s linear;
    &:focus {
      border-color: #8e2de2;
    }
  }
  /* Change data type to text field  */
  .notebox {
    width: 100%;
    min-height: 100px;
    resize: none;
    padding: 15px;

  }
  
  .submit {
    margin-top: 15px;
    padding: 15px 30px;
    -webkit-appearance: button;
    background-color: #8e2de2;
    font-size: 16px;
    color: white;
    margin: 15px auto 0;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    &:hover {
      box-shadow: none;
    }
  }`



export default connect()(ContactForm);


