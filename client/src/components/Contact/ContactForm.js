import React from "react";
import { connect } from "react-redux";
import { addContact } from "../../reducers/contacts";
import styled from "styled-components";

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
      note_box: ""
   };

   addContact = contact => {
      const { dispatch, user } = this.props;
      dispatch(addContact(user, contact));
   };

   handleSubmit = e => {
      e.preventDefault();
      const contact = { ...this.state };
      this.addContact(contact);
      this.setState({
         first_name: "",
         last_name: "",
         title: "",
         email: "",
         linkedin: "",
         workphone: "",
         personal_phone: "",
         note_box: ""
      });
   };

   handleChange = ({ target: { name, value } }) => {
      this.setState({ [name]: value });
   };

   render() {
      const {
         first_name,
         last_name,
         title,
         email,
         linkedin,
         workphone,
         personal_phone,
         note_box
      } = this.state;
      return (
         <Form onSubmit={this.handleSubmit}>
            <Title>Add Contact</Title>
            <Field
               name="first_name"
               value={first_name}
               onChange={this.handleChange}
               placeholder="First name:"
               required
            />
            <Field
               name="last_name"
               value={last_name}
               onChange={this.handleChange}
               required
               placeholder="Last name:"
            />
            <Field
               name="title"
               value={title}
               placeholder="Title:"
               required
               onChange={this.handleChange}
            />
            <Field
                type="email"
               name="email"
               value={email}
               placeholder="Email:"
               required
               onChange={this.handleChange}
            />
            <Field
               name="linkedin"
               value={linkedin}
               placeholder="Linkedin:"
               onChange={this.handleChange}
            />
            <Field
              type="phone"
               name="workphone"
               value={workphone}
               placeholder="Workphone:"
               onChange={this.handleChange}
            />
            <Field
              type="phone"
               name="personal_phone"
               value={personal_phone}
               placeholder="Personal phone:"
               onChange={this.handleChange}
            />
            {/* Change data type to text field */}
            <textarea
               name="note_box"
               value={note_box}
               placeholder="Write notes for contact.."
               onChange={this.handleChange}
               className="notebox"
            />
            <input type="submit" value="Submit" className="submit" />
         </Form>
      );
   }
}

const Title = styled.h3`
   font-weight: lighter;
   font-family: "Open Sans", sans-serif;
   color: #666;
   margin-bottom: 25px;
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
   /* Change data type to text field  */
   .notebox {
      width: 100%;
      min-height: 100px;
      resize: none;
      padding: 10px;
      border: none;
      font-size: 14px;
      background-color: rgba(0,0,0,0.02);
      color: #666;
      outline: none;
      &::placeholder {
        color: #b3b3b3;
      }
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
   }
`;

const Field = styled.input`
   width: 100%;
   padding: 15px;
   margin-bottom: 10px;
   border: none;
   outline: none;
   font-size: 14px;
   border-bottom: 2px solid #f1f2f6;
   transition: 0.4s linear;
   &::placeholder {
    color: #b3b3b3;
   }
   &:focus {
      border-color: #8e2de2;
   }
`;

export default connect()(ContactForm);
