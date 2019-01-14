import React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";
import Events from "./Events";
import JobApplications from "./JobApplications";
import Tasks from "./Tasks";
import { AuthConsumer } from "../../providers/AuthProvider";
import ApplicationForm from './ApplicationForm';
import { withRouter } from "react-router-dom";

class Dashboard extends React.Component {
  state = {
    openApplication: false,
    openTask: false
  };

  openApplication = () => {
    this.setState(state => ({openApplication: !state.openApplication}))
  }
    
  render() {
    let {
      auth: { user }
    } = this.props;
    let {openApplication} = this.state;
    return (
      <>
        <NavBar />
        {!user.admin ? (
          <DashboardContainer>
            {openApplication ? <ApplicationForm closeForm={this.openApplication} user={user}/> : null}
            <DashboardTitle>Dashboard</DashboardTitle>
            <TilesContainer>
              <LeftContainer>
                <Tile>
                  <Events />
                </Tile>
                <Tile>
                  <Tasks />
                </Tile>
              </LeftContainer>
              <RightContainer>
                <Tile>
                  <JobApplications openForm={this.openApplication}/>
                </Tile>
              </RightContainer>
            </TilesContainer>
          </DashboardContainer>
        ) : (
          <DashboardContainer>
            <DashboardTitle>Dashboard</DashboardTitle>
            <TilesContainer />
          </DashboardContainer>
        )}
      </>
    );
  }
}

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  margin-left: 0.5em;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  margin-right: 0.5em;
`;

const DashboardContainer = styled.div`
  height: 100%;
  min-height: calc(100vh - 70px);
  width: 100%;
  background-color: #dadee838;
  padding: 1em;
`;

const DashboardTitle = styled.h1`
  font-weight: lighter;
  font-family: "Open Sans", sans-serif;
  color: #666;
`;

const TilesContainer = styled.div`
  margin-top: 2em;
  width: 100%;
  display: flex;
`;

const Tile = styled.div`
  width: 100%;
  margin: 0 1em;
  &:first-child {
    margin-bottom: 1em;
  }
`;

export class ConnectedDashboard extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Dashboard {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default withRouter(ConnectedDashboard);
