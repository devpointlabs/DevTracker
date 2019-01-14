import React from "react";
import styled from "styled-components";
import { AuthConsumer } from "../../providers/AuthProvider";
import { connect } from "react-redux";
import { getApplications } from "../../reducers/applications";
import moment from "moment";

class JobApplications extends React.Component {
  componentDidMount() {
    let {
      auth: { user },
      dispatch
    } = this.props;
    dispatch(getApplications(user.id));
  }

  returnColor = status => {
    switch (status) {
      case "Interested":
        return "rgba(140, 140, 140, 0.1)";
      case "Applied":
        return "rgba(109, 167, 214, 0.1)";
      case "Phone Call":
        return "rgba(213, 103, 245, 0.1)";
      case "Assignment":
        return "rgba(236, 178, 105, 0.1)";
      case "Interview":
        return "rgba(42, 121, 218, 0.1)";
      case "Offer":
        return "rgba(75, 206, 85, 0.1)";
      case "Accepted":
        return "rgba(22, 128, 0, 0.1)";
      case "Withdrawn":
        return "rgba(102, 102, 102, 0.1)";
      case "Not Interested":
        return "#BF5152";
      default:
        return null;
    }
  };

  render() {
    let {
      auth: { user },
      applications
    } = this.props;
    let { openForm } = this.props;
    return (
      <ApplicationsContainer>
        <SectionTitle>Job Applications</SectionTitle>
        <ApplicationsContent>
          {this.props.applications.length === 0 ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="folder"
              >
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8e2de2" />
                    <stop offset="100%" stopColor="#4a00e0" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#grad1)"
                  d="M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z"
                />
              </svg>

              <p className="no-applications">Track your job applications.</p>
              <p className="applications-description">
                Job applications with recent activity will show up here so you
                can see what's going on with your job search.
              </p>
              <button className="new-application" onClick={openForm}>
                New Application
              </button>
            </>
          ) : (
            <ApplicationList>
              <AddNew onClick={openForm}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zm-22.6 22.7c2.1 2.1 3.5 4.6 4.2 7.4H256V32.5c2.8.7 5.3 2.1 7.4 4.2l83.9 83.9zM336 480H48c-8.8 0-16-7.2-16-16V48c0-8.8 7.2-16 16-16h176v104c0 13.3 10.7 24 24 24h104v304c0 8.8-7.2 16-16 16zm-48-180v8c0 6.6-5.4 12-12 12h-68v68c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12v-68h-68c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h68v-68c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v68h68c6.6 0 12 5.4 12 12z" />
                </svg>
                Add new
              </AddNew>
              {applications.map(app => {
                return (
                  <Application key={app.id}>
                    <h4 className="app-status">{app.status}</h4>
                    <UpdatedAt color={this.returnColor(app.status)}>
                      <p>Updated {moment(app.updated_at).fromNow()}</p>
                    </UpdatedAt>
                  </Application>
                );
              })}
            </ApplicationList>
          )}
        </ApplicationsContent>
      </ApplicationsContainer>
    );
  }
}

const AddNew = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  border: 1px solid rgba(74, 0, 224, 0.7);
  background-color: rgba(74, 0, 224, 0.05);
  color: #666;
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;

  &:hover {
    background-color: rgba(74, 0, 224, 0.2);
  }

  svg {
    width: 30px;
    margin-bottom: 5px;
    fill: #666;
  }
`;

const UpdatedAt = styled.div`
  width: 100%;
  text-align: center;
  font-size: 10px;
  padding: 10px 0;
  background-color: ${props => props.color};
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const ApplicationList = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1em;
`;

const Application = styled.div`
  height: auto;
  background-color: white;
  font-weight: lighter;
  cursor: pointer;
  position: relative;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 5px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }

  .app-status {
    font-weight: lighter;
    font-size: 14px;
    color: #666;
    font-family: "Open Sans", sans-serif;
    padding: 20px;
    text-align: center;
  }
`;

const ApplicationsContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;

  .new-application {
    padding: 10px 15px;
    -webkit-appearance: button;
    margin-top: 20px;
    background: #8e2de2;
    color: white;
    border: none;
    transition: 0.3s linear;
    cursor: pointer;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
    &:hover {
      box-shadow: none;
    }
  }

  .folder {
    width: 100px;
    height: 100px;
  }

  .no-applications {
    font-size: 14px;
    font-weight: bold;
    margin-top: 5px;
  }

  .applications-description {
    font-size: 12px;
    max-width: 300px;
    margin-top: 10px;
    text-align: center;
  }
`;

const ApplicationsContainer = styled.div`
  padding: 1.25em;
  background-color: white;
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const SectionTitle = styled.h3`
  font-weight: lighter;
  font-family: "Open Sans", sans-serif;
  color: #666;
`;

const mapStateToProps = state => {
  return { applications: state.applications };
};

export class ConnectedJobApplications extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <JobApplications {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default connect(mapStateToProps)(ConnectedJobApplications);
