import React from "react";
import styled, { keyframes } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { getCompanies } from "../../reducers/companies";
import states from "./Options";
import { titles } from "./Options";

class ApplicationForm extends React.Component {
  state = {
    posting_url: "",
    date: new Date(),
    company_name: "",
    company_city: "",
    company_state: "",
    company_zip: "",
    company_url: "",
    company_id: "",
    job_title: "",
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
      date: date
    });
  };

  handleResultClick = company => {
    console.log(company);
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

  render() {
    let {
      posting_url,
      date,
      company_name,
      company_city,
      company_state,
      company_zip,
      formPopulated,
      company_url,
      job_title,
      status,
      notes
    } = this.state;
    return (
      <ApplicationContainer>
        <Form>
            <h3>New Application</h3>
          <input
            required
            name="posting_url"
            value={posting_url}
            onChange={this.handleChange}
            className="input"
            placeholder="Job Post Url"
          />
          <DatePicker
            placeholder="Application Date"
            name="date"
            selected={date}
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
            value={job_title}
            onChange={this.handleChange}
            className="title-dropdown"
            required
            name="job_title"
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
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s linear;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: white;
  width: 500px;
  border-radius: 5px;
  border: 1px solid #666;
  padding: 2em;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);

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

  .state-select {
    width: 100%;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.03);
    font-size: 14px;
  }
  .input {
    width: 100%;
    padding: 15px 10px;
    border-radius: 5px;
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
  padding: 10px 5px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: #eee;
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
