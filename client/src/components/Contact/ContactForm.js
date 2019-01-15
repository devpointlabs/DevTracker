import React from 'react';
import styled from 'styled-components';
import ContactList from './ContactList';
import Contact from './Contact'

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
    }
  
  handleSubmit = (e) => {
    e.preventDefault()
   }


  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({
      contactValues: {
        ...this.state.contactValues,
        [name]: value,
      }
    })
  }


    render() {
      const { first_name, last_name, job, title, email, linkedin, workphone, personal_phone, note_box } = this.state
      return (
        <form onSubmit={this.handleSubmit}>
          <label>First Name</label>
          <input
            label="First Name"
            name="first_name"
            value={first_name}
            onChange={this.handleChange}
          />
          <label>Last Name</label>
          <input
            label="Last Name"
            name="last_name"
            value={last_name}
            onChange={this.handleChange}
          />
          <label>Job</label>
          <input
            label="Job"
            name="job"
            value={job}
            onChange={this.handleChange}
          />
          <label>Title</label>
          <input
            label="Title"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          <label>Email</label>
          <input
            label="Email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <label>Linkedin</label>
          <input
            label="Linkedin"
            name="linkedin"
            value={linkedin}
            onChange={this.handleChange}
          />
          <label>Workphone</label>
          <input
            label="Workphone"
            name="workphone"
            value={workphone}
            onChange={this.handleChange}
          />
          <label>Personal Phone</label>
          <input
            label="Personal Phone"
            name="personal_phone"
            value={personal_phone}
            onChange={this.handleChange}
          />
          <label>Note Box</label>
          <input
            label="Note Box"
            name="note_box"
            value={note_box}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
      )
    }
  }




  export default ContactForm;


