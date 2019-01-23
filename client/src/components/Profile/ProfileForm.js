import React, { Component } from "react";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import Dropdown from "react-dropdown";
import {cohorts, sex_options, employment_options, college_options } from '../Dashboard/Options';

class ProfileForm extends Component {
   state = {
      email: "",
      first_name: "",
      last_name: "",
      cohort: "",
      dob: "",
      image: "",
      college_degree: "",
      employment_status: "",
      sex: "",
      github: "",
      linkedin: "",
      resume: "",
      file: ""
   };

   onDrop = files => {
      this.setState({ file: files[0] });
   };

   handleSexSelect = ({ value }) => {
      this.setState({ sex: value });
   };

   handleEmploymentSelect = ({ value }) => {
      this.setState({ employment_status: value });
   };

   handleCohortSelect = ({ value }) => {
      this.setState({cohort: value });
   };

   handleCollegeSelect = ({ value }) => {
      this.setState({ college_degree: value });
   };

   handleChange = ({ target: { name, value } }) => {
      this.setState({ [name]: value });
   };

   componentDidMount() {
      const {
         user: {
            email,
            first_name,
            last_name,
            cohort,
            image,
            dob,
            college_degree,
            employment_status,
            sex,
            github,
            linkedin,
            resume
         }
      } = this.props;
      if (cohort) {
         this.setState({
            email,
            first_name,
            last_name,
            image,
            cohort,
            dob,
            college_degree,
            employment_status,
            sex,
            github,
            linkedin,
            resume
         });
      } else {
         this.setState({
            email,
            first_name,
            last_name,
            image,
            dob,
            college_degree,
            employment_status,
            sex,
            github,
            linkedin,
            resume
         });
      }
   }

   handleSubmit = e => {
      e.preventDefault();
      const {
         email,
         first_name,
         last_name,
         image,
         cohort,
         dob,
         college_degree,
         employment_status,
         sex,
         github,
         linkedin,
         resume,
         file
      } = this.state;
      let {
         user,
         auth: { updateUser }
      } = this.props;
      let github_link = github.replace('https://', '').replace('http://', '');
      let linkedin_link = linkedin.replace('https://', '').replace('http://', '');
      let resume_link = resume.replace('https://', '').replace('http://', '');
      updateUser(user.id, {
         email,
         first_name,
         last_name,
         image,
         cohort,
         dob,
         college_degree,
         employment_status,
         sex,
         github: github_link,
         linkedin: linkedin_link,
         resume: resume_link,
         file
      });
      this.setState({
         editing: false,
         file: ""
      });
   };

   render() {
      let {
         email,
         first_name,
         last_name,
         cohort,
         dob,
         college_degree,
         employment_status,
         sex,
         github,
         linkedin,
         resume
      } = this.state;
      let { editing, user } = this.props;
      let profile_image;
      const defaultImage =
         "https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png";
      profile_image = user.image ? user.image : defaultImage;
      return (
         <Form onSubmit={this.handleSubmit}>
            {editing ? (
               <Dropzone onDrop={this.onDrop} multiple={false}>
                  {({ getRootProps, getInputProps }) => {
                     return (
                        <div {...getRootProps()} className="drop-zone">
                           <input {...getInputProps()} />
                           <p>Please select an image for profile picture</p>
                        </div>
                     );
                  }}
               </Dropzone>
            ) : (
               <ProfileImage src={profile_image} alt="" />
            )}

            <label>Email</label>
            <Input
               name="email"
               value={email}
               disabled={!editing}
               onChange={this.handleChange}
            />
            <label>First Name</label>
            <Input
               name="first_name"
               value={first_name}
               disabled={!editing}
               onChange={this.handleChange}
            />
            <label>Last Name</label>
            <Input
               name="last_name"
               value={last_name}
               disabled={!editing}
               onChange={this.handleChange}
            />
            <label>Cohort</label>
            <Dropdown
               name="cohort"
               options={cohorts}
               value={cohort}
               required
               onChange={this.handleCohortSelect}
               placeholder="Select cohort"
               disabled={!editing}  
            />
            <label>Date of Birth</label>
            <Input
               name="dob"
               type="date"
               value={dob}
               disabled={!editing}
               onChange={this.handleChange}
            />
            <label>College Degree</label>
            <Dropdown
               name="college_degree"
               options={college_options}
               value={college_degree}
               required
               onChange={this.handleCollegeSelect}
               placeholder="Select .."
               disabled={!editing}
            />
            <label>Employment Status</label>
            <Dropdown
               name="employment_status"
               options={employment_options}
               value={employment_status}
               required
               onChange={this.handleEmploymentSelect}
               placeholder="Select.."
               disabled={!editing}
            />
            <label>Sex</label>
            <Dropdown
               name="sex"
               options={sex_options}
               value={sex}
               required
               onChange={this.handleSexSelect}
               placeholder="Select.."
               disabled={!editing}
            />
            
         
            {editing ? 
               <>
               <label>Github</label>
               <Input
                  name="github"
                  value={github}
                  disabled={!editing}
                  onChange={this.handleChange}
               />
               <label>Linkedin</label>
               <Input
                  name="linkedin"
                  value={linkedin}
                  disabled={!editing}
                  onChange={this.handleChange}
               />
               <label>Resume</label>
               <Input
                  name="resume"
                  value={resume}
                  disabled={!editing}
                  onChange={this.handleChange}
               />
               <button type="submit" className="submit">
                  Update
               </button>
               </>
            : 
               <>
                  <SocialLink target="_blank" href={"http://" + github} link='github'>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
                     View Github
                  </SocialLink>
                  <SocialLink target="_blank" href={"http://" + linkedin} link='linkedin'>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>
                     View LinkedIn
                  </SocialLink>
                  <SocialLink target="_blank" href={"http://" + resume} link='resume'>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z"/></svg>
                     View Resume
                  </SocialLink>
               </>
            }
         </Form>
      );
   }
}


const SocialLink = styled.a`
   width: 100%;
   padding: 20px 0;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   text-decoration: none;
   color: white;
   font-size: 16px;
   border-radius: 5px;
   margin-top: 15px;
   background-color: ${props => {
      if(props.link === 'github') {
         return '#333';
      } else if(props.link === 'linkedin') {
         return '#0077b5';
      } else {
         return '#6c5ce7';
      }
   }};
   svg {
      width: 35px;
      height: 35px;
      fill: white;
      margin-right: 10px;
   }
   &:hover {
      opacity: 0.9;
   }
`;

const Form = styled.form`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   background-color: white;
   border-radius: 5px;
   width: 500px;
   padding: 1.25em;
   box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.13);

   .submit {
      margin-top: 15px;
      padding: 20px 0;
      font-size: 16px;
      width: 100%;
      background-color: #8e2de2;
      -webkit-appearance: button;
      border-radius: 5px;
      border: none;
      outline: none;
      color: white;
      cursor: pointer;
   }

   .react-datepicker-wrapper {
      width: 100%;
   }

   .date-picker {
      height: 40px;
      font-size: 14px;
      color: #666;
      background-color: rgba(0, 0, 0, 0.03);
      border: none;
      padding: 10px;
      border-radius: 5px;
      align-self: flex-start;
      color: #666;
   }

   .Dropdown-root {
      width: 100%;

      .Dropdown-control {
         border: none;
         background-color: rgba(0, 0, 0, 0.03);
         color: #666;
      }
   }

   .drop-zone {
      height: 200px;
      background-color: rgba(0, 0, 0, 0.03);
      width: 100%;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
   }

   label {
      font-size: 16px;
      align-self: flex-start;
      margin: 10px 0;
      color: #666;
   }
`;

const Input = styled.input`
   width: 100%;
   padding: 10px;
   font-size: 16px;
   background-color: rgba(0, 0, 0, 0.02);
   border: none;
   outline: none;
   border-radius: 5px;
   color: #666;
`;

const ProfileImage = styled.img`
   max-width: 100%;
   margin-bottom: 15px;
   border-radius: 5px;
`;

export default ProfileForm;
