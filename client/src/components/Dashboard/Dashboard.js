import React from "react";
import styled, {keyframes} from "styled-components";
import NavBar from "./NavBar";
import Events from "./Events";
import JobApplications from "./JobApplications";
import Tasks from "./Tasks";
import { AuthConsumer } from "../../providers/AuthProvider";
import ApplicationForm from "./ApplicationForm";
import { withRouter } from "react-router-dom";
import UserStats from './UserStats';
import axios from 'axios';

class Dashboard extends React.Component {
  state = {
    openApplication: false,
    openTask: false,
    stats: []
  };

  openApplication = () => {
    this.setState(state => ({ openApplication: !state.openApplication }));
  };

  componentDidMount() {
    axios.get(`/api/user/dashboard/stats`)
    .then(res => this.setState({stats: res.data}));
  }

  triggerUpdate = () => {
    axios.get(`/api/user/dashboard/stats`)
    .then(res => this.setState({stats: res.data}));
  }

  render() {
    let {
      auth: { user }
    } = this.props;
    let { openApplication, stats } = this.state;
    return (
      <>
        <NavBar />
        {!user.admin ? (
          <DashboardContainer>
            {openApplication ? (
              <ApplicationForm closeForm={this.openApplication} user={user} triggerUpdate={this.triggerUpdate}/>
            ) : null}
            <DashboardTitle>Dashboard</DashboardTitle>
            <TilesContainer>
              <LeftContainer>
                <Tile>
                  <Events user={user}/>
                </Tile>
                <Tile>
                  <Tasks user={user}/>
                </Tile>
              </LeftContainer>
              <RightContainer>
                <Tile>
                  <UserStats stats={stats}/>
                </Tile>
                <Tile>
                  <JobApplications openForm={this.openApplication} />
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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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
  min-height: calc(100vh - 90px);
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 25px 1em;
  animation: ${fadeIn} 0.5s linear;
  position: relative;
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
  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
  }
`;

const Tile = styled.div`
  width: 100%;
  margin: 0 1em;
  &:first-child {
    margin-bottom: 1em;
    @media(max-width: 1200px) {
      margin-bottom: 0;
    }
  }
  @media (max-width: 1200px) {
    margin: 0;
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
