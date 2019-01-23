import React, { Component } from "react";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import Dropdown from "react-dropdown";

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
         github,
         linkedin,
         resume,
         file
      });
      window.location.reload();
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
      let sex_options = [
         { value: "Male", label: "Male" },
         { value: "Female", label: "Female" },
         { value: "Other", label: "Other", color: "" }
      ];
      let employment_options = [
         { value: "None", label: "None" },
         { value: "Interviewing", label: "Interviewing" },
         { value: "Applying", label: "Applying" },
         { value: "Offer Accepted", label: "Offer Accepted" }
      ];
      let college_options = [
         { value: "None", label: "None" },
         { value: "Bachelors", label: "Bachelors" },
         { value: "Masters", label: "Master" },
         { value: "PHD", label: "PHD" }
      ];
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
            <label>Graduation Date</label>
            <Input
               name="cohort"
               type="date"
               value={cohort}
               disabled={!editing}
               onChange={this.handleChange}
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
               placeholder="Select.."
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
            {editing ? (
               <button type="submit" className="submit">
                  Update
               </button>
            ) : null}
         </Form>
      );
   }
}

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
`;

export default ProfileForm;
