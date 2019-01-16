import React from "react";
import styled, { keyframes } from "styled-components";
import NavBar from "../Dashboard/NavBar";
import { connect } from "react-redux";
import { AuthConsumer } from "../../providers/AuthProvider";
import { getApplications } from "../../reducers/applications";
import ApplicationForm from "../Dashboard/ApplicationForm";
import ApplicationsTable from "./ApplicationsTable";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { application_status } from "../Dashboard/Options";

class Tracker extends React.Component {
  state = {
    openApplication: false,
    input: "",
    status: ""
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleSelection = e => {
    if(e.value === "None") {
      this.setState({
        status: ''
      })
    } else {
      this.setState({
        status: e.value
      })
    }
    
  };

  componentDidMount() {
    let {
      dispatch,
      auth: { user }
    } = this.props;
    dispatch(getApplications(user.id));
  }

  returnColor = status => {
    switch (status) {
      case "Interested":
        return "rgba(140, 140, 140, 0.3)";
      case "Applied":
        return "rgba(109, 167, 214, 0.3)";
      case "Phone Call":
        return "rgba(213, 103, 245, 0.3)";
      case "Assignment":
        return "rgba(236, 178, 105, 0.3)";
      case "Interview":
        return "rgba(42, 121, 218, 0.3)";
      case "Offer":
        return "rgba(75, 206, 85, 0.3)";
      case "Accepted":
        return "rgba(22, 128, 0, 0.3)";
      case "Withdrawn":
        return "rgba(102, 102, 102, 0.3)";
      case "Not Interested":
        return "#BF5152";
      default:
        return null;
    }
  };

  redirectUser = id => {
    let { history } = this.props;
    history.push(`/applications/${id}`);
  };

  openApplication = () => {
    this.setState(state => ({ openApplication: !state.openApplication }));
  };

  render() {
    let {
      auth: { user },
      applications
    } = this.props;
    let { openApplication, input, status } = this.state;
    if (input.length > 0) {
      applications = applications.filter(app => {
        if (app.company_name.toLowerCase().includes(input.toLowerCase())) {
          return app;
        } else return null;
      });
    }
    if(status.length > 0) {
      applications = applications.filter(app => {
        if(app.status === status) {
          return app
        } else return null
      })
    }
    return (
      <>
        <NavBar />
        <ApplicationsContainer>
          {openApplication ? (
            <ApplicationForm
              closeForm={this.openApplication}
              user={user}
              update={this.updateApplications}
              onChange={this.handleChange}
            />
          ) : null}
          <TableHeader>
            <ApplicationTitle>Job Applications</ApplicationTitle>
            <ButtonContainer>
              <Dropdown
                name="status"
                placeholder="Filter by status"
                options={application_status}
                className="status-selection"
                value={status}
                onChange={this.handleSelection}
              />
              <CompanyFilter
                name="input"
                value={input}
                placeholder="Search by company name..."
                onChange={this.handleChange}
              />
              <Button onClick={this.openApplication}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
                Add Job
              </Button>
            </ButtonContainer>
          </TableHeader>

          <ApplicationsTable
            applications={applications}
            colorPicker={this.returnColor}
            view={this.redirectUser}
          />
        </ApplicationsContainer>
      </>
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

const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .status-selection {
    min-width: 200px;
    border-radius: 5px;
    font-size: 12px;
    
    .Dropdown-placeholder {
      color: #666;
    }

    .Dropdown-control {
      height: 48px;
      line-height: 48px;
      vertical-align: middle;
      padding: 0 10px;
      border-radius: 5px;
      border: none;
      -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }
  }
`;

const CompanyFilter = styled.input`
  min-width: 300px;
  margin: 0 10px;
  font-size: 12px;
  color: #666;
  height: 48px;
  padding: 15px 10px;
  border-radius: 5px;
  outline: none;
  border: none;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  &::placeholder {
    color: #666;
  }
`;

const ApplicationsContainer = styled.div`
  height: 100%;
  min-height: calc(100vh - 90px);
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 25px 1em;
  position: relative;
  animation: ${fadeIn} 0.5s linear;
`;

const ApplicationTitle = styled.h1`
  font-weight: lighter;
  font-family: "Open Sans", sans-serif;
  color: #666;
`;

const Button = styled.button`
  -webkit-appearance: button;
  padding: 15px 30px;
  font-size: 16px;
  color: white;
  background: #6e54a3;
  border: none;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  outline: none;
  justify-content: center;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;

  svg {
    fill: #fff;
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
`;

const mapStateToProps = state => {
  return { applications: state.applications };
};

export class ConnectedTracker extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Tracker {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default connect(mapStateToProps)(ConnectedTracker);
