import React, { Component } from "react";
import styled from "styled-components";
import { status_list, states } from "../Dashboard/Options";
import Dropdown from "react-dropdown";
// import {connect} from 'react-redux';

class ApplicationInfo extends Component {
  state = { 
    editing: false,
    company_name: "",
    title: "", 
    city: "",
    state: "",
    status: "",
    company_url: "", 
    posting_url: "",
  };

  componentDidMount() {
    let {application: {company_name, city, title, state, company_url, posting_url, status}} = this.props
    this.setState({
      company_name: company_name,
      title: title, 
      city: city,
      state: state,
      status: status,
      company_url: company_url, 
      posting_url: posting_url
    })
  }

  toggleEdit = () => this.setState(state => ({ editing: !state.editing }));



  render() {
    let { application } = this.props;
    let { editing } = this.state;
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z" />
              </svg>
              Edit
            </>
          )}
        </EditButton>
        <Form>
          <label>Company Name</label>
          <Input
            value={application.company_name}
            disabled={true}
            name="company_name"
            autoFocus
          />
          <label>Job Title</label>
          <Input name="title" value={application.title} disabled={!editing} />
          <label>Status</label>
          <Dropdown
            name="status"
            options={status_list}
            className="status-selection"
            value={application.status}
            disabled={!editing}
            editing={editing}
          />
          <label>City</label>
          <Input
            name="city"
            disabled={!editing}
            value={application.city}
            editing={editing}
          />
          <label>State</label>
          <Dropdown
            name="status"
            options={states}
            className="status-selection"
            value={application.state}
            disabled={!editing}
            editing={editing}
          />
          <label>Application URL</label>
          <URLContainer>
            <Input
              name="posting_url"
              disabled={!editing}
              value={application.posting_url}
              editing={editing}
              className="posting-url"
            />
          </URLContainer>
          <label>Website URL</label>
          <URLContainer>
            <Input
              disabled={true}
              value={application.company_url}
              className="posting-url"
            />
          </URLContainer>
          {editing ? <SubmitButton type="submit">Save</SubmitButton> : null }
        </Form>
      </CompanyContainer>
    );
  }
}

const SubmitButton = styled.button`
  color: #666;
  padding: 15px;
  margin-top: 10px;
  background-color: #6e54a3;
  font-size: 14px;
  border: none;
  outline: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const URLContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  button {
    -webkit-appearance: button;
    height: 38px;
    padding: 0 20px;
    cursor: pointer;
    background-color: #6e54a3;
    color: white;
    font-size: 14px;
    border: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .posting-url {
    width: 100%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
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
  background-color: #6e54a3;
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

  .status-selection {
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
  color: #666;
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

export default ApplicationInfo;
