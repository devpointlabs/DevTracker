import React from "react";
import styled from "styled-components";
import NavBar from "../Dashboard/NavBar";
import {connect} from 'react-redux';
import { AuthConsumer } from "../../providers/AuthProvider";
import {getApplications} from '../../reducers/applications';
import ApplicationForm from "../Dashboard/ApplicationForm";

class Tracker extends React.Component {
  state = {
    openApplication: false
  };

  componentDidMount() {
      let {dispatch, auth: {user}} = this.props;
      dispatch(getApplications(user.id));
  }

  openApplication = () => {
    this.setState(state => ({ openApplication: !state.openApplication }));
  };

  render() {
    let {
      auth: { user }
    } = this.props;
    let {openApplication} = this.state;
    return (
      <>
        <NavBar />
        <ApplicationsContainer>
          {openApplication ? (
            <ApplicationForm closeForm={this.openApplication} user={user} />
          ) : null}
          <ApplicationTitle>Job Applications</ApplicationTitle>
        </ApplicationsContainer>
      </>   
    );
  }
}

const ApplicationsContainer = styled.div`
  height: 100%;
  min-height: calc(100vh - 70px);
  width: 100%;
  background-color: #dadee838;
  padding: 1em;
`;

const ApplicationTitle = styled.h1`
  font-weight: lighter;
  font-family: "Open Sans", sans-serif;
  color: #666;
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


