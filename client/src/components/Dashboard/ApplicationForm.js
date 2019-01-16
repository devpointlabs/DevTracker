import React from "react";
import styled, { keyframes } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { getCompanies, addCompany } from "../../reducers/companies";
import {addApplication} from "../../reducers/applications";
import states from "./Options";
import { titles } from "./Options";
import { application_status } from "./Options";
import alert from 'sweetalert2';

class ApplicationForm extends React.Component {
  state = {
    posting_url: "",
    submission_date: new Date(),
    company_name: "",
    company_city: "",
    company_state: "",
    company_zip: "",
    company_url: "",
    company_id: undefined,
    title: "",
    status: "",
    notes: "",
    formPopulated: false
  };

  componentDidMount() {
    this.props.dispatch(getCompanies());
  }

  handleChange = ({ target: { name, value } }) => {
    let { company_name, formPopulated } = this.state;
    if (company_name.length === 0 && formPopulated === true) {
      this.setState({
        formPopulated: false,
        company_id: undefined,
        [name]: value
      });
    } else {
      this.setState(
        {
          [name]: value
        },
        () => {
          if (company_name.length > 0) {
            this.filterResults();
          }
        }
      );
    }
  };

  handleDate = date => {
    this.setState({
      submission_date: date
    });
  };

  handleResultClick = company => {
    this.setState({
      company_name: company.name,
      company_city: company.city,
      company_state: company.state,
      company_zip: company.zip,
      company_url: company.website_url,
      company_id: company.id,
      formPopulated: true
    });
  };

  filterResults = () => {
    let companies = this.props.companies;
    companies = companies.filter(c => {
      return c.name
        .toLowerCase()
        .includes(this.state.company_name.toLowerCase());
    });
    return companies.map(company => (
      <Result
        key={company.id}
        onClick={() => this.handleResultClick(company)}
        populated={this.state.formPopulated}
      >
        {company.name}
      </Result>
    ));
  };

 
  handleSubmit = (e) => {
    e.preventDefault();
    let { closeForm, dispatch, user } = this.props;
    let {company_name, company_city, company_zip, company_url, company_state, company_id, submission_date, title, status, notes, posting_url, } = this.state;
    // if company id is null or undefined, then we are adding a company and an application
    if(!company_id) {
      let newId = Math.random().toString().substr(2, 8);
      let newApplication = {submission_date, notes, title, posting_url, status, company_id: newId, user_id: user.id }
      dispatch(addCompany(newId, company_name, company_zip, company_state, company_city, company_url));
      dispatch(addApplication(newApplication));
      alert(
        'Application Added!',
        'The application you submitted has been successfully created',
        'success'
      )
    } else {
      let newApplication = {submission_date, notes, title, posting_url, status, company_id: company_id, user_id: user.id };
      dispatch(addApplication(newApplication));
      alert(
        'Application Added!',
        'The application you submitted has been successfully created',
        'success'
      )
    }
    closeForm();
  }

  render() {
    let {
      posting_url,
      submission_date,
      company_name,
      company_city,
      company_state,
      company_zip,
      formPopulated,
      company_url,
      title,
      status,
      notes
    } = this.state;
    let {closeForm} = this.props;
    return (
      <ApplicationContainer>
        <Form onSubmit={this.handleSubmit}>
          <CloseMenu onClick={closeForm}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 464c-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216zm94.8-285.3L281.5 256l69.3 69.3c4.7 4.7 4.7 12.3 0 17l-8.5 8.5c-4.7 4.7-12.3 4.7-17 0L256 281.5l-69.3 69.3c-4.7 4.7-12.3 4.7-17 0l-8.5-8.5c-4.7-4.7-4.7-12.3 0-17l69.3-69.3-69.3-69.3c-4.7-4.7-4.7-12.3 0-17l8.5-8.5c4.7-4.7 12.3-4.7 17 0l69.3 69.3 69.3-69.3c4.7-4.7 12.3-4.7 17 0l8.5 8.5c4.6 4.7 4.6 12.3 0 17z"/></svg>
          </CloseMenu>
          <h3>New Application</h3>
          <input
            required
            name="posting_url"
            value={posting_url}
            onChange={this.handleChange}
            className="input"
            placeholder="Job Post Url"
            autoFocus
          />
          <DatePicker
            placeholder="Application Date"
            name="submission_date"
            selected={submission_date}
            onChange={this.handleDate}
            className="date-picker"
          />
          <SearchContainer>
            <input
              type="search"
              name="company_name"
              value={company_name}
              onChange={this.handleChange}
              className="input"
              placeholder="Company Name"
            />
            {formPopulated > 0 ? null : (
              <SearchResults>
                {company_name.length > 0
                  ? this.filterResults().slice(0, 5)
                  : null}
              </SearchResults>
            )}
          </SearchContainer>
          <input
            name="company_city"
            value={company_city}
            onChange={this.handleChange}
            className="input"
            required
            placeholder="Company City"
          />
          <StateZipContainer>
            <State>
              <select
                value={company_state}
                onChange={this.handleChange}
                className="state-dropdown"
                required
                name="company_state"
              >
                <option value="">State</option>
                {states.map((state, index) => {
                  return (
                    <option value={state.value} key={index}>
                      {state.label}
                    </option>
                  );
                })}
              </select>
            </State>
            <Zip>
              <input
                type="number"
                name="company_zip"
                pattern="/[0-9]{5}/"
                onChange={this.handleChange}
                value={company_zip}
                required
                className="zip"
                placeholder="Company Zip Code"
              />
            </Zip>
          </StateZipContainer>
          <input
            name="company_url"
            value={company_url}
            onChange={this.handleChange}
            className="input"
            required
            placeholder="Company Website Url"
          />
          <select
            value={title}
            onChange={this.handleChange}
            className="title-dropdown"
            required
            name="title"
          >
            <option value="">Job Title</option>
            {titles.map((title, index) => {
              return (
                <option value={title.value} key={index}>
                  {title.label}
                </option>
              );
            })}
          </select>
          <select
            value={status}
            onChange={this.handleChange}
            className="status-dropdown"
            required
            name="status"
          >
            <option value="">Status</option>
            {application_status.map((status, index) => {
              return (
                <option value={status.value} key={index}>
                  {status.label}
                </option>
              );
            })}
          </select>
          <textarea
            className="notes"
            name="notes"
            value={notes}
            onChange={this.handleChange}
            placeholder="Additional notes..."
          />
          <input type="submit" value="Submit" className="submit" />
        </Form>
      </ApplicationContainer>
    );
  }
}

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const ApplicationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s linear;
  overflow: hidden;
`;

const CloseMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1em;
  cursor: pointer;
  svg {
    width: 25px;
    height: 25px;
    fill: #666;
  }
`;

const Form = styled.form`
  display: block;
  background-color: white;
  border-radius: 5px;
  overflow-y: scroll;
  border: 1px solid #666;
  padding: 2em;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
  position: relative;

  .submit {
    width: 100%;
    -webkit-appearance: button;
    text-align: center;
    margin-top: 1em;
    height: 40px;
    background: #8e2de2;
    color: white;
    font-size: 14px;
    border-radius: 5px;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  }

  .notes {
    resize: none;
    height: 100px;
    min-height: 100px;
    margin-top: 1em;
    padding: 10px;
    border: none;
    background-color: rgba(0, 0, 0, 0.03);
    font-size: 14px;
    width: 100%;

    &::placeholder {
      padding-left: 10px;
      font-size: 14px;
      color: #ccc;
    }
  }

  .date-picker {
    height: 40px;
    font-size: 14px;
    color: #666;
    background-color: rgba(0, 0, 0, 0.03);
    border: none;
    padding: 10px;
    border-radius: 5px;
    margin: 1em 0 0;
  }

  .state-dropdown {
    width: 100%;
    height: 40px;
    border: none;
    font-size: 14px;
    color: #666;
  }

  .title-dropdown {
    width: 100%;
    height: 40px;
    border: none;
    font-size: 14px;
    color: #666;
    margin: 1em 0 0;
  }

  .status-dropdown {
    width: 100%;
    height: 40px;
    border: none;
    font-size: 14px;
    color: #666;
    margin: 1em 0 0;
  }

  .state-select {
    width: 100%;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.03);
    font-size: 14px;
  }
  .input {
    width: 100%;
    padding: 15px 10px;
    color: #666;
    border: none;
    background-color: rgba(0, 0, 0, 0.03);
    outline: none;
    font-size: 14px;
    margin: 1em 0 0;

    &::placeholder {
      padding-left: 10px;
      font-size: 14px;
      color: #ccc;
    }
  }
`;

const SearchContainer = styled.div`
  width: 100%;
`;

const SearchResults = styled.ul`
  list-style: none;
  width: 100%;
`;

const Result = styled.li`
  width: 100%;
  padding: 15px 10px;
  font-size: 15px;
  cursor: pointer;
  background-color: white;
  border: 1px solid #ccc;
  &:hover {
    background-color: #ccc;
  }
`;

const StateZipContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 1em 0 0;
`;

const State = styled.div``;

const Zip = styled.div`
  margin-left: 1em;
  .zip {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    color: #666;
    border: none;
    background-color: rgba(0, 0, 0, 0.03);
    outline: none;
    padding-left: 10px;
    font-size: 14px;

    &::placeholder {
      padding-left: 10px;
      font-size: 14px;
      color: #ccc;
    }
  }
`;

const mapStateToProps = state => {
  return { companies: state.companies };
};

export default connect(mapStateToProps)(ApplicationForm);
