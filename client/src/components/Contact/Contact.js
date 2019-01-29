import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { updateContact, deleteContact } from "../../reducers/contacts";
import alert from "sweetalert2";

class Contact extends Component {
   state = {
      editing: false,
      first_name: "",
      last_name: "",
      company: "",
      title: "",
      email: "",
      linkedin: "",
      personal_phone: "",
      note_box: ""
   };

   toggleEdit = () => {
      this.setState(state => ({ editing: !state.editing }));
   };

   deleteContact = id => {
      alert
         .fire({
            title: "Are you sure?",
            text: "Are you sure you want to delete this contact?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#10ac84",
            cancelButtonColor: "#ee5253",
            confirmButtonText: "Yes, remove it!"
         })
         .then(res => {
            if (res.value) {
               let { user, dispatch } = this.props;
               dispatch(deleteContact(user, id));
               alert(
                  "Success",
                  "Contact has been deleted successfully",
                  "success"
               );
            }
         });
   };

   componentDidMount() {
      let {
         first_name,
         last_name,
         company,
         title,
         email,
         linkedin,
         personal_phone,
         note_box
      } = this.props;
      this.setState({
         first_name,
         last_name,
         company,
         title,
         email,
         linkedin,
         personal_phone,
         note_box
      });
   }

   handleChange = ({ target: { name, value } }) => {
      this.setState({
         [name]: value
      });
   };

   formatPhoneNumber = phoneNumberString => {
      var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
      var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
      if (match) {
         var intlCode = match[1] ? "+1 " : "";
         return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
            ""
         );
      }
      return null;
   };

   handleSubmit = e => {
      let { id, user, dispatch } = this.props;
      let {
         first_name,
         last_name,
         company,
         title,
         personal_phone,
         email,
         linkedin,
         note_box
      } = this.state;
      e.preventDefault();
      let updatedContact = {
         id,
         first_name,
         last_name,
         company,
         title,
         personal_phone,
         email,
         linkedin,
         note_box
      };
      dispatch(updateContact(user, updatedContact));
      alert("Success", "Contact has been updated successfully", "success");
      this.toggleEdit();
   };

   render() {
      let { editing } = this.state;

      let {
         id,
         first_name,
         last_name,
         company,
         title,
         email,
         linkedin,
         personal_phone,
         note_box
      } = this.props;
      let linkedin_url = linkedin
         .replace("https://", "")
         .replace("http://", "");
      return (
         <Container>
            {editing ? (
               <DeleteButton onClick={() => this.deleteContact(id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                     <path d="M381.6 80l-34-56.7C338.9 8.8 323.3 0 306.4 0H205.6c-16.9 0-32.5 8.8-41.2 23.3l-34 56.7H40c-13.3 0-24 10.7-24 24v12c0 6.6 5.4 12 12 12h16.4L76 468.4c2.3 24.7 23 43.6 47.8 43.6h264.5c24.8 0 45.5-18.9 47.8-43.6L467.6 128H484c6.6 0 12-5.4 12-12v-12c0-13.3-10.7-24-24-24h-90.4zm-176-32h100.8l19.2 32H186.4l19.2-32zm182.6 416H123.8L92.6 128h326.7l-31.1 336z" />
                  </svg>
               </DeleteButton>
            ) : null}
            <EditButton onClick={this.toggleEdit}>
               {editing ? "Cancel" : "Edit"}
            </EditButton>
            {editing ? (
               <Form onSubmit={this.handleSubmit}>
                  <NameContainer>
                     <Input
                        name="first_name"
                        placeholder="First Name"
                        value={this.state.first_name}
                        required
                        onChange={this.handleChange}
                     />
                     <Input
                        name="last_name"
                        placeholder="Last Name"
                        value={this.state.last_name}
                        required
                        onChange={this.handleChange}
                        className="last-name"
                     />
                  </NameContainer>
                  <TitleContainer>
                     <Input
                        name="title"
                        placeholder="Title"
                        value={this.state.title}
                        required
                        onChange={this.handleChange}
                     />
                     <Input
                        name="company"
                        placeholder="Company"
                        value={this.state.company}
                        required
                        onChange={this.handleChange}
                        className="company"
                     />
                  </TitleContainer>
                  <Input
                     type="phone"
                     name="personal_phone"
                     placeholder="Phone"
                     value={this.state.personal_phone}
                     required
                     onChange={this.handleChange}
                     className="phone"
                  />
                  <MessageContainer>
                     <textarea
                        name="note_box"
                        placeholder="Notes..."
                        value={this.state.note_box}
                        className="notes"
                        onChange={this.handleChange}
                     />
                  </MessageContainer>
                  <LinkContainer>
                     <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        className="email"
                     />
                     <Input
                        name="linkedin"
                        placeholder="LinkedIn"
                        value={this.state.linkedin}
                        onChange={this.handleChange}
                     />
                  </LinkContainer>
                  <SubmitButton>Save</SubmitButton>
               </Form>
            ) : (
               <>
                  <Name>{`${first_name} ${last_name}`}</Name>
                  <Title>{`${title} @ ${company}`}</Title>
                  <PersonalPhone>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                     >
                        <path d="M487.8 24.1L387 .8c-14.7-3.4-29.8 4.2-35.8 18.1l-46.5 108.5c-5.5 12.7-1.8 27.7 8.9 36.5l53.9 44.1c-34 69.2-90.3 125.6-159.6 159.6l-44.1-53.9c-8.8-10.7-23.8-14.4-36.5-8.9L18.9 351.3C5 357.3-2.6 372.3.8 387L24 487.7C27.3 502 39.9 512 54.5 512 306.7 512 512 307.8 512 54.5c0-14.6-10-27.2-24.2-30.4zM55.1 480l-23-99.6 107.4-46 59.5 72.8c103.6-48.6 159.7-104.9 208.1-208.1l-72.8-59.5 46-107.4 99.6 23C479.7 289.7 289.6 479.7 55.1 480z" />
                     </svg>
                     {this.formatPhoneNumber(personal_phone)}
                  </PersonalPhone>
                  <Notes>{note_box}</Notes>
                  <SocialIcons>
                     {email ? (
                        <SocialLink
                           target="_blank"
                           href={"mailto:" + email}
                           link="email"
                        >
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                           >
                              <path d="M464 64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h416c8.8 0 16 7.2 16 16v41.4c-21.9 18.5-53.2 44-150.6 121.3-16.9 13.4-50.2 45.7-73.4 45.3-23.2.4-56.6-31.9-73.4-45.3C85.2 197.4 53.9 171.9 32 153.4V112c0-8.8 7.2-16 16-16zm416 320H48c-8.8 0-16-7.2-16-16V195c22.8 18.7 58.8 47.6 130.7 104.7 20.5 16.4 56.7 52.5 93.3 52.3 36.4.3 72.3-35.5 93.3-52.3 71.9-57.1 107.9-86 130.7-104.7v205c0 8.8-7.2 16-16 16z" />
                           </svg>
                        </SocialLink>
                     ) : null}
                     {linkedin ? (
                        <SocialLink
                           target="_blank"
                           href={"http://" + linkedin_url}
                           link="linkedin"
                        >
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                           >
                              <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                           </svg>
                        </SocialLink>
                     ) : null}
                  </SocialIcons>
               </>
            )}
         </Container>
      );
   }
}

const DeleteButton = styled.button`
   position: absolute;
   bottom: 0;
   left: 0;
   border: none;
   outline: none;
   cursor: pointer;
   background-color: transparent;
   padding: 1em;
   &:hover > svg {
      fill: red;
   }
   svg {
      width: 15px;
      height: 15px;
      fill: #b3b3b3;
   }
`;

const Form = styled.form`
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: flex-start;

   .last-name,
   .company {
      margin-left: 5px;
   }

   .phone {
      margin-top: 5px;
   }
`;

const SubmitButton = styled.button`
   padding: 10px 20px;
   background-color: #8e2de2;
   color: white;
   font-size: 14px;
   cursor: pointer;
   margin-top: 5px;
   border-radius: 5px;
   border: none;
   outline: none;
   align-self: flex-end;
`;

const MessageContainer = styled.div`
   display: flex;
   width: 100%;
   margin: 5px 0 0;
   .notes {
      font-size: 14px;
      color: #666;
      resize: none;
      background-color: rgba(0, 0, 0, 0.03);
      border: none;
      outline: none;
      border-radius: 5px;
      width: 100%;
      padding: 10px;
      min-height: 75px;
   }
`;

const LinkContainer = styled.div`
   display: flex;
   width: 100%;
   margin-top: 5px;
   .email {
      width: 50%;
      margin-right: 5px;
   }
`;

const NameContainer = styled.div`
   display: flex;
   width: 75%;
`;
const TitleContainer = styled.div`
   display: flex;
   margin-top: 5px;
   width: 100%;
`;

const Input = styled.input`
   width: 100%;
   padding: 10px;
   background-color: rgba(0, 0, 0, 0.03);
   color: #666;
   border-radius: 5px;
   border: none;
   font-size: 15px;
   outline: none;
   &::placeholder {
      color: #b3b3b3;
   }
`;

const SocialLink = styled.a`
   height: 100%;
   height: 30px;

   &:first-child {
      margin-right: 5px;
   }

   svg {
      width: 30px;
      height: 30px;
      fill: ${props => {
         if (props.link === "linkedin") {
            return "#0077B5";
         } else {
            return "#666";
         }
      }};
   }
`;

const SocialIcons = styled.div`
   display: flex;
   align-items: center;
   position: absolute;
   bottom: 0;
   right: 0;
   margin: 10px;
`;

const Notes = styled.p`
   max-width: 75%;
   padding: 10px 0 0;
`;

const PersonalPhone = styled.div`
   display: flex;
   flex-direction: row;
   margin-top: 5px;
   svg {
      width: 20px;
      height: 20px;
      margin-right: 5px;
      fill: #6da7d6;
   }
`;

const Title = styled.p`
   font-size: 16px;
`;

const Name = styled.h2``;

const Container = styled.div`
   width: 100%;
   padding: 1.25em;
   background-color: white;
   border-radius: 5px;
   box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.13);
   position: relative;
`;

const EditButton = styled.button`
   position: absolute;
   top: 0;
   right: 0;
   margin: 10px;
   padding: 5px 15px;
   border: none;
   outline: none;
   background-color: rgba(0, 0, 0, 0.1);
   border-radius: 2px;
   cursor: pointer;
   color: #666;
   font-size: 14px;
   cursor: pointer;
`;

export default connect()(Contact);
