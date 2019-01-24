import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import { AuthConsumer } from "../../providers/AuthProvider";
import ApplicationInfo from "./ApplicationInfo";
import Activity from "./Activity";
import NewActivity from "./NewActivity";
import Notes from "./Notes";
import { deleteOffer } from "../../reducers/offers";
import { deleteInterview } from "../../reducers/interviews";
import { deleteCall } from "../../reducers/calls";
import alert from "sweetalert2";
import { updateTime, deleteApplication } from "../../reducers/applications";
import {withRouter} from 'react-router-dom';

class Application extends Component {

   routeUser = () => {
      let {history:{push},} = this.props;
      push("/");
   }

   deleteApplication = () => {
    let { 
      dispatch, 
      auth: { user },
      match: {params: {id}}
    } = this.props;
    alert.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this application?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#10ac84',
      cancelButtonColor: '#ee5253',
      confirmButtonText: 'Yes, remove it!'
    }).then(res => {
      if(res.value) {
        dispatch(deleteApplication(user, id, this.routeUser));
        alert(
          "Success",
          "You have removed this application!",
          "success"
        )
      }
    })
   };

   removeActivity = (type, id) => {
      let {
         application,
         dispatch,
         auth: { user }
      } = this.props;
      switch (type) {
         case "offer":
            alert
               .fire({
                  title: "Are you sure?",
                  text: "You will have to create this event again.",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#10ac84",
                  cancelButtonColor: "#ee5253",
                  confirmButtonText: "Yes, remove it!"
               })
               .then(res => {
                  if (res.value) {
                     dispatch(deleteOffer(application[0].id, id));
                     dispatch(updateTime(user, application[0].id));
                     alert("Success", "Offer successfully removed!", "success");
                  }
               });
            break;
         case "interview":
            alert
               .fire({
                  title: "Are you sure?",
                  text: "You will have to create this event again.",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#10ac84",
                  cancelButtonColor: "#ee5253",
                  confirmButtonText: "Yes, remove it!"
               })
               .then(res => {
                  if (res.value) {
                     dispatch(deleteInterview(application[0].id, id));
                     dispatch(updateTime(user, application[0].id));
                     alert(
                        "Success",
                        "Interview successfully removed!",
                        "success"
                     );
                  }
               });
            break;
         case "call":
            alert
               .fire({
                  title: "Are you sure?",
                  text: "You will have to create this event again.",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#10ac84",
                  cancelButtonColor: "#ee5253",
                  confirmButtonText: "Yes, remove it!"
               })
               .then(res => {
                  if (res.value) {
                     dispatch(deleteCall(application[0].id, id));
                     dispatch(updateTime(user, application[0].id));
                     alert(
                        "Success",
                        "Phone call successfully removed!",
                        "success"
                     );
                  }
               });
            break;
         default:
         // do nothing
      }
   };

   render() {
      const {
         auth: { user },
         application,
         offers,
         interviews,
         calls,
         notes,
         initial
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
                        <ApplicationInfo
                           user={user}
                           application={application_data}
                           initial={initial}
                        />
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
                        <Notes
                           user={user}
                           application={application_data}
                           notes={notes}
                        />
                        <DeleteButton onClick={this.deleteApplication}>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                           >
                              <path d="M192 188v216c0 6.627-5.373 12-12 12h-24c-6.627 0-12-5.373-12-12V188c0-6.627 5.373-12 12-12h24c6.627 0 12 5.373 12 12zm100-12h-24c-6.627 0-12 5.373-12 12v216c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12V188c0-6.627-5.373-12-12-12zm132-96c13.255 0 24 10.745 24 24v12c0 6.627-5.373 12-12 12h-20v336c0 26.51-21.49 48-48 48H80c-26.51 0-48-21.49-48-48V128H12c-6.627 0-12-5.373-12-12v-12c0-13.255 10.745-24 24-24h74.411l34.018-56.696A48 48 0 0 1 173.589 0h100.823a48 48 0 0 1 41.16 23.304L349.589 80H424zm-269.611 0h139.223L276.16 50.913A6 6 0 0 0 271.015 48h-94.028a6 6 0 0 0-5.145 2.913L154.389 80zM368 128H80v330a6 6 0 0 0 6 6h276a6 6 0 0 0 6-6V128z" />
                           </svg>
                           Delete
                        </DeleteButton>
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

const DeleteButton = styled.button`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   align-self: flex-end;
   padding: 15px 30px;
   border-radius: 5px;
   font-size: 14px;
   color: #ee5253;
   margin-top: 25px;
   border: 2px solid #ee5253;
   background: transparent;
   cursor: pointer;

   svg {
      width: 20px;
      height: 20px;
      fill: #ee5253;
      margin-right: 10px;
   }
   &:hover {
     background-color: #ee5253;
     color: #fff;
   }
   &:hover > svg {
     fill: #fff;
   }
`;

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
   position: relative;
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

export default connect()(withRouter(ConnectedApplication));
