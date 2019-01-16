import React from "react";
import styled from "styled-components";
import NavBar from "../Dashboard/NavBar";
import { connect } from "react-redux";
import { AuthConsumer } from "../../providers/AuthProvider";
import { getApplications } from "../../reducers/applications";
import ApplicationForm from "../Dashboard/ApplicationForm";
import ApplicationsTable from "./ApplicationsTable";

class Tracker extends React.Component {
  state = {
    openApplication: false
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
    let { openApplication } = this.state;
    return (
      <>
        <NavBar />
        <ApplicationsContainer>

          <Button onClick={this.openApplication}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>
            Add Job
          </Button>
          {openApplication ? (
            <ApplicationForm closeForm={this.openApplication} user={user}/>
          ) : null}
          <ApplicationTitle>Job Applications</ApplicationTitle>
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

const ApplicationsContainer = styled.div`
  height: 100%;
  min-height: calc(100vh - 90px);
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 50px 1em;
  position: relative;
`;

const ApplicationTitle = styled.h1`
  font-weight: lighter;
  font-family: "Open Sans", sans-serif;
  color: #666;
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin: 50px 16px 0 0;
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
