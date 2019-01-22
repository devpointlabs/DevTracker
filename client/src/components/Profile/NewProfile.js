import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import ProfileForm from "./ProfileForm";
import { AuthConsumer } from "../../providers/AuthProvider";
import NavBar from "../Dashboard/NavBar";

class NewProfile extends Component {
   state = {
      editing: false
   };

   toggleEdit = () => {
      this.setState(state => ({editing: !state.editing}))
   }

   render() {
      let {
         auth: { user}
      } = this.props;
      let {auth} = this.props;
      let { editing } = this.state;
      return (
         <>
            <NavBar />
            <ProfileContainer>
               <EditButton onClick={this.toggleEdit}>
                  {editing ? "Editing Profile" : "Edit Profile"}
               </EditButton>
               <ProfileForm auth={auth} user={user} editing={editing} />
            </ProfileContainer>
         </>
      );
   }
}

const EditButton = styled.button`
   position: absolute;
   top: 0;
   right: 0;
   margin: 25px 1em;
   padding: 15px 30px;
   font-size: 16px;
   background-color: #8e2de2;
   -webkit-appearance: button;
   border-radius: 5px;
   border: none;
   outline: none;
   color: white;
   cursor: pointer;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ProfileContainer = styled.div`
   height: 100%;
   min-height: calc(100vh - 90px);
   width: 100%;
   margin: 0 auto;
   padding: 25px 1em;
   animation: ${fadeIn} 0.5s linear;
   position: relative;
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
`;

const ConnectedNewProfile = props => (
   <AuthConsumer>{auth => <NewProfile {...props} auth={auth} />}</AuthConsumer>
);

export default ConnectedNewProfile;
