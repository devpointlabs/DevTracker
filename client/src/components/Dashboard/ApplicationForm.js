import React from "react";
import styled, { keyframes } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { getCompanies, addCompany } from "../../reducers/companies";
import { addApplication } from "../../reducers/applications";
import states from "./Options";
import { titles } from "./Options";
import { status_list } from "./Options";
import alert from "sweetalert2";
import Dropdown from "react-dropdown";

class ApplicationForm extends React.Component {
   state = {
      app_posting_url: "",
      app_submission_date: new Date(),
      app_city: "",
      app_state: "",
      app_title: "",
      app_status: "",
      company_name: "",
      company_url: "",
      company_id: undefined,
      formPopulated: false,
      error: false,
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
         app_submission_date: date
      });
   };

   handleResultClick = company => {
      this.setState({
         company_name: company.name,
         company_url: company.website_url,
         company_id: company.id,
         formPopulated: true
      });
   };

   filterResults = () => {
      let { companies } = this.props;
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
            className="filtered"
         >
            {company.name}
         </Result>
      ));
   };

   dispatchUpdate = () => {
      let {triggerUpdate} = this.props;
      triggerUpdate();
   }

   handleStateSelect = ({ value }) => {
      this.setState({ app_state: value });
   };

   handleTitleSelect = ({ value }) => {
      this.setState({ app_title: value });
   };

   handleStatusSelect = ({ value }) => {
      this.setState({ app_status: value });
   };

   addApplication = (company_id) => {
      let {user, dispatch } = this.props;
      let {app_posting_url, app_status, app_title, app_city, app_state, app_submission_date } = this.state;
      let newApplication = {
         posting_url: app_posting_url,
         status: app_status,
         title: app_title,
         city: app_city,
         state: app_state,
         company_id: company_id,
         submission_date: app_submission_date
      };
      dispatch(addApplication(newApplication, user.id, this.dispatchUpdate));
      alert(
         "Application Added!",
         "The application you submitted has been successfully created",
         "success"
      );
   }

   handleSubmit = e => {
      e.preventDefault();
      let { closeForm, dispatch, user } = this.props;
      let { company_name, company_url, company_id, app_submission_date, app_title, app_status, app_posting_url, app_city, app_state } = this.state;
      // let filtered = document.querySelector('.filtered');
      // let filterValue = filtered.innerHTML;
      // if (company_name === filterValue) {
      //    this.setState({ error: true, })
      //    alert(
      //       "Error",
      //       `Please select ${filterValue} from the highlighted list.`,
      //       "error"
      //    )
      // } else {
         let companyId = Math.random().toString().substr(2, 8);
         if (!company_id) {
            dispatch(addCompany(companyId, company_name, company_url, this.addApplication));
         } else {
            let newApplication = {
               posting_url: app_posting_url,
               status: app_status,
               title: app_title,
               city: app_city,
               state: app_state,
               company_id: company_id,
               user_id: user.id,
               submission_date: app_submission_date
            };
            dispatch(addApplication(newApplication, user.id));
            alert(
               "Application Added!",
               "The application you submitted has been successfully created",
               "success"
            );
         }
         closeForm();
      // };
   }

   render() {
      let {
         app_posting_url,
         app_submission_date,
         app_city,
         app_state,
         app_title,
         app_status,
         company_name,
         formPopulated,
         company_url,
         error,
      } = this.state;
      let { closeForm } = this.props;
      let filtered = document.querySelector('.filtered');
      console.log(filtered);
      if(filtered) {
         console.log(filtered.innerHTML);
      }
      return (
         <ApplicationContainer>
            <Form onSubmit={this.handleSubmit} autoComplete="off">
               <CloseMenu onClick={closeForm}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                     <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 464c-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216zm94.8-285.3L281.5 256l69.3 69.3c4.7 4.7 4.7 12.3 0 17l-8.5 8.5c-4.7 4.7-12.3 4.7-17 0L256 281.5l-69.3 69.3c-4.7 4.7-12.3 4.7-17 0l-8.5-8.5c-4.7-4.7-4.7-12.3 0-17l69.3-69.3-69.3-69.3c-4.7-4.7-4.7-12.3 0-17l8.5-8.5c4.7-4.7 12.3-4.7 17 0l69.3 69.3 69.3-69.3c4.7-4.7 12.3-4.7 17 0l8.5 8.5c4.6 4.7 4.6 12.3 0 17z" />
                  </svg>
               </CloseMenu>
               <FormTitle>New Application</FormTitle>
               <label>Date Submitted</label>
               <DatePicker
                  name="app_submission_date"
                  selected={app_submission_date}
                  onChange={this.handleDate}
                  className="date-picker"
               />
               <label>Application URL</label>
               <input
                  required
                  name="app_posting_url"
                  value={app_posting_url}
                  onChange={this.handleChange}
                  className="input"
                  placeholder="https://www.sofi.com/careers"
                  autoFocus
               />
               <label>Company</label>
               <SearchContainer>
                  <input
                     type="search"
                     name="company_name"
                     value={company_name}
                     onChange={this.handleChange}
                     className="input"
                     placeholder="Sofi"
                     required
                  />
                  {formPopulated > 0 ? null : (
                     <SearchResults error={error}>
                        {company_name.length > 0
                           ? this.filterResults().slice(0, 5)
                           : null}
                     </SearchResults>
                  )}
               </SearchContainer>
               <label>Company URL</label>
               <input
                  name="company_url"
                  value={company_url}
                  onChange={this.handleChange}
                  className="input"
                  required
                  placeholder="https://www.sofi.com"
               />
               <label>City</label>
               <input
                  name="app_city"
                  value={app_city}
                  onChange={this.handleChange}
                  className="input"
                  required
                  placeholder="Salt Lake City"
               />
               <label>State</label>
               <Dropdown
                  name="app_state"
                  options={states}
                  value={app_state}
                  required
                  onChange={this.handleStateSelect}
                  placeholder="Select"
               />
               <Dropdown
                  name="app_title"
                  options={titles}
                  value={app_title}
                  required
                  onChange={this.handleTitleSelect}
                  placeholder="Job Title"
               />
               <Dropdown
                  name="app_status"
                  options={status_list}
                  value={app_status}
                  required
                  onChange={this.handleStatusSelect}
                  placeholder="Status"
               />
               <input type="submit" value="Submit" className="submit" />
            </Form>
         </ApplicationContainer>
      );
   }
}

const FormTitle = styled.h3`
   margin-bottom: 25px;
   font-family: "Open Sans", sans-serif;
`;

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
   flex-direction: row;
   justify-content: center;
   align-items: center;
   animation: ${fadeIn} 0.3s linear;
   overflow: scroll;
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
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: flex-start;
   height: auto;
   background-color: white;
   border-radius: 5px;
   border: 1px solid #666;
   padding: 2em;
   box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
   position: relative;
   width: 600px;

   .Dropdown-root {
      margin-top: 10px;
      width: 100%;

      .Dropdown-control {
         border: none;
         background-color: rgba(0, 0, 0, 0.03);
         color: #666;
      }
   }

   label {
      margin: 10px 0 0;
      font-size: 14px;
   }

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

   .date-picker {
      height: 40px;
      font-size: 14px;
      color: #666;
      background-color: rgba(0, 0, 0, 0.03);
      border: none;
      padding: 10px;
      border-radius: 5px;
      margin-top: 10px;
   }

   .input {
      width: 100%;
      padding: 10px;
      color: #666;
      border: none;
      background-color: rgba(0, 0, 0, 0.03);
      outline: none;
      font-size: 14px;
      margin: 10px 0 0;
      border-radius: 5px;

      &::placeholder {
         padding-left: 5px;
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
   border: ${props => {
      if (props.error) {
         return "2px solid"
      }
   }};

   border-color: ${props => {
      if (props.error) {
         return "green";
      }
   }};
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

const mapStateToProps = state => {
   return { companies: state.companies };
};

export default connect(mapStateToProps)(ApplicationForm);
