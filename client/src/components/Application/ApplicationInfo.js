import React, { Component } from "react";
import styled from "styled-components";
import { status_list, states, titles } from "../Dashboard/Options";
import Dropdown from "react-dropdown";
import {updateApplication} from '../../reducers/applications';
import {connect} from 'react-redux';
import alert from 'sweetalert2';

class ApplicationInfo extends Component {
   state = {
      editing: false,
      title: "",
      city: "",
      state: "",
      status: "",
      posting_url: ""
   };

   componentDidMount() {
      let {application: {title, city, state, status, posting_url}} = this.props
      this.setState({
         title: title,
         city: city,
         state: state,
         status: status,
         posting_url: posting_url
      })
   }

   toggleEdit = () => this.setState(state => ({ editing: !state.editing }));

   handleChange = ({target: {name, value}}) => {
     this.setState({
      [name]: value
     })
   }

   handleTitle = ({value}) => {
     this.setState({
       title: value
     })
   }

   handleStatus = ({value}) => {
    this.setState({
      status: value
    })
  }

  handleState = ({value}) => {
    this.setState({
      state: value
    })
  }


  handleSubmit = (e) => {
    let {title, city, state, status, posting_url } = this.state;
    let {application: { id }, user, dispatch } = this.props;
    e.preventDefault();
    let updatedApp = {title, city, state, status, posting_url};
    dispatch(updateApplication(updatedApp, user, id));
    this.setState({editing: false})
    alert(
      "Application updated!",
      "Your changes have been saved!",
      "success"
    )
  }

   render() {
      let { application } = this.props;
      let { editing, title, city, state, status, posting_url } = this.state;
      
      if(application !== []) {
         return (
            <CompanyContainer editing={editing}>
               <SectionTitle>
                  {editing ? "Editing Application Info" : "Application Info"}
               </SectionTitle>
               <EditButton onClick={this.toggleEdit}>
                  {editing ? (
                     <p>Editing</p>
                  ) : (
                     <>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 576 512"
                        >
                           <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z" />
                        </svg>
                        Edit
                     </>
                  )}
               </EditButton>
               <Form onSubmit={this.handleSubmit}>
                  <label>Company Name</label>
                  <Input
                     defaultValue={application.company_name}
                     disabled={true}
                     name="company_name"
                     autoFocus
                     className="company-field"
                  />
                  <label>Company Website</label>
                  <Input
                     disabled={true} 
                     defaultValue={application.company_url}
                     className="company-field"
                  />
                  <label>Job Title</label>
                  <Dropdown
                     name="title"
                     options={titles}
                     className="select-menu"
                     value={title}
                     disabled={!editing}
                     onChange={this.handleTitle}
                  />
                  <label>Status</label>
                  <Dropdown
                     name="status"
                     options={status_list}
                     className="select-menu"
                     value={status}
                     disabled={!editing}
                     onChange={this.handleStatus}
   
                  />
                  <label>City</label>
                  <Input
                     name="city"
                     disabled={!editing}
                     value={city}
                     onChange={this.handleChange}
                     className="input"
                  />
                  <label>State</label>
                  <Dropdown
                     name="status"
                     options={states}
                     className="select-menu"
                     value={state}
                     onChange={this.handleState}
                     disabled={!editing}
                  />
                  <label>Application URL</label>
                  <Input
                     name="posting_url"
                     disabled={!editing}
                     value={posting_url}
                     onChange={this.handleChange}
                     className="input"
                  />
                  {editing ? (
                     <SubmitButton type="submit">Save</SubmitButton>
                  ) : null}
               </Form>
            </CompanyContainer>
         );
      } else return null 
   }
}

const SubmitButton = styled.button`
   padding: 15px;
   margin-top: 10px;
   background-color: #8e2de2;
   font-size: 14px;
   font-weight: lighter;
   border: none;
   outline: none;
   color: white;
   border-radius: 5px;
   cursor: pointer;
`;

const EditButton = styled.button`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   position: absolute;
   top: 0;
   right: 0;
   margin: 1.25em;
   padding: 10px 15px;
   cursor: pointer;
   font-size: 14px;
   color: white;
   background-color: #8e2de2;
   border: none;
   outline: none;
   font-weight: lighter;
   border-radius: 5px;

   svg {
      width: 15px;
      height: 15px;
      fill: white;
      margin-right: 5px;
   }
`;

const Form = styled.form`
   display: flex;
   flex-direction: column;
   margin-top: 20px;
   z-index: 2;

   .input {
     color: #666;
   }

   .company-field {
     color: #b3b3b3;
   }

   .select-menu {
      .Dropdown-control {
         background-color: rgba(0, 0, 0, 0.02);
         border: none;
         color: #666;
      }
   }

   label {
      margin: 10px 0;
      font-size: 12px;
   }
`;

const Input = styled.input`
   padding: 10px;
   border: none;
   border-radius: 5px;
   font-size: 16px;
   background-color: rgba(0, 0, 0, 0.02);
   border: none;
`;

const SectionTitle = styled.h3`
   font-weight: lighter;
   font-family: "Open Sans", sans-serif;
   color: #666;
`;

const CompanyContainer = styled.div`
   background-color: white;
   position: relative;
   padding: 1.25em;
   background-color: white;
   border-radius: 5px;
   box-shadow: ${props => {
      if (props.editing) {
         return "0 5px 9px rgba(110, 84, 162, 0.3), 0 5px 9px rgba(110, 84, 162, 0.2)";
      } else {
         return "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.13)";
      }
   }};
   width: 100%;
`;

export default connect()(ApplicationInfo);
