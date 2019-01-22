import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import { AuthConsumer } from "../../providers/AuthProvider";
import ApplicationInfo from "./ApplicationInfo";
import Activity from "./Activity";
import NewActivity from "./NewActivity";
import Notes from "./Notes";
import {deleteOffer} from '../../reducers/offers';
import {deleteInterview} from '../../reducers/interviews';
import {deleteCall} from '../../reducers/calls';
import alert from 'sweetalert2';
import { updateTime } from "../../reducers/applications";

class Application extends Component {

  removeActivity = (type, id) => {
    let {application, dispatch, auth: {user}} = this.props;
    switch(type) {
      case 'offer':
        alert.fire({
          title: "Are you sure?",
          text: "You will have to create this event again.",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#10ac84',
          cancelButtonColor: '#ee5253',
          confirmButtonText: 'Yes, remove it!'
        }).then(res => {
          if(res.value) {
            dispatch(deleteOffer(application[0].id, id));
            dispatch(updateTime(user, application[0].id));
            alert(
              "Success",
              "Offer successfully removed!",
              "success"
            )
          }
        })
        break;
      case 'interview':
      alert.fire({
        title: "Are you sure?",
        text: "You will have to create this event again.",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#10ac84',
        cancelButtonColor: '#ee5253',
        confirmButtonText: 'Yes, remove it!'
      }).then(res => {
        if(res.value) {
          dispatch(deleteInterview(application[0].id, id));
          dispatch(updateTime(user, application[0].id));
          alert(
            "Success",
            "Interview successfully removed!",
            "success"
          )
        }
      })
      break;
      case 'call':
      alert.fire({
        title: "Are you sure?",
        text: "You will have to create this event again.",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#10ac84',
        cancelButtonColor: '#ee5253',
        confirmButtonText: 'Yes, remove it!'
      }).then(res => {
        if(res.value) {
          dispatch(deleteCall(application[0].id, id));
          dispatch(updateTime(user, application[0].id));
          alert(
            "Success",
            "Phone call successfully removed!",
            "success"
          )
        }
      })
      break;
      default:
      // do nothing
    }
  }

  render() {
    const {
      auth: { user },
      application, offers, interviews, calls, notes, initial
    } = this.props;
    let application_data = application[0];
    if (application_data) {
      return (
        <>
          <ApplicationContainer>
            <ApplicationTitle>
              {application_data.title} @ {application_data.company_name}
            </ApplicationTitle>
            <ColumnContainers>
              <LeftContainer>
                <ApplicationInfo user={user} application={application_data} initial={initial}/>
                <NewActivity 
                  user={user}
                  application={application_data}
                />
              </LeftContainer>
              <RightContainer>
                <Activity 
                  user={user} 
                  application={application_data}
                  calls={calls}
                  interviews={interviews}
                  offers={offers}
                  remove={this.removeActivity}
                />
                <Notes user={user}  application={application_data} notes={notes}/>
              </RightContainer>
            </ColumnContainers>
          </ApplicationContainer>
        </>
      );
    } else {
      return null;
    }
  }
}

const ColumnContainers = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
`;

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
  display: flex;
  padding-top: 25px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-right: 1em;
  flex: 1;
`;
const RightContainer = styled.div`
  border-radius: 5px;
  padding-top: 25px;
  flex: 2;
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
  padding: 25px 1em;
  animation: ${fadeIn} 0.5s linear;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;


export class ConnectedApplication extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Application {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default connect()(ConnectedApplication);
