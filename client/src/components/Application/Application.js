import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import { AuthConsumer } from "../../providers/AuthProvider";
import CompanyInfo from "./CompanyInfo";
import Activity from "./Acitivity";
import NewActivity from "./NewActivity";
import Notes from "./Notes";

class Application extends Component {

  render() {
    const {
      auth: { user }, application
    } = this.props;
    let application_data = application[0];
    if(application_data) {
      return (
        <>
          <ApplicationContainer>
            <ApplicationTitle>{application_data.title} @ {application_data.company_name}</ApplicationTitle>
            <LeftContainer>
              <CompanyInfo user={user} />
              <Activity user={user} />
            </LeftContainer>
            <RightContainer>
              <NewActivity user={user} />
              <Notes user={user} />
            </RightContainer>
          </ApplicationContainer>
        </>
      );
    } else {
      return null;
    }
    
  }
}


const ApplicationTitle = styled.h1``;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LeftContainer = styled.div`
  border-radius: 5px;
  padding: 1em;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-right: 1em;
`;
const RightContainer = styled.div`
  border-radius: 5px;
  padding: 1em;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ApplicationContainer = styled.div`
  height: 100%;
  min-height: calc(100vh - 90px);
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1em;
  animation: ${fadeIn} 0.5s linear;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const mapStateToProps = state => {
  return { application: state.applications };
};


export class ConnectedApplication extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Application {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default connect(mapStateToProps)(ConnectedApplication);
