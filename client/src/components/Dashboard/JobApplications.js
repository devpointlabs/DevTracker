import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthConsumer } from "../../providers/AuthProvider";
import { connect } from "react-redux";
import { getApplications } from "../../reducers/applications";
import moment from "moment";

class JobApplications extends React.Component {

  state = {loaded: false}
  
  toggleLoaded = () => {
    this.setState({loaded: true})
  }

  componentDidMount() {
    let {
      auth: { user },
      dispatch
    } = this.props;
    dispatch(getApplications(user.id, this.toggleLoaded));
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

  render() {
    let { applications, openForm } = this.props;
    if(this.state.loaded) {
      return (
        <ApplicationsContainer>
          <SectionTitle>Job Applications</SectionTitle>
          <Link to={"/tracker"}>
            <SeeAllButton>
              See All
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
              </svg>
            </SeeAllButton>
          </Link>
          <ApplicationsContent>
            {!applications ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="folder"
                >
                  <path
                    fill="#6E54A3"
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
                    <Link to={`/applications/${app.id}`} key={app.id} >
                      <Application color={this.returnColor(app.status)}>
                        <ApplicationStatus>
                          <StatusCircle color={this.returnColor(app.status)} />
                          <JobStatus>{app.status}</JobStatus>
                        </ApplicationStatus>
                        <Title>{app.title} @ {app.company_name}</Title>
                        <LastUpdated>
                          Updated {moment(app.updated_at).fromNow()}
                        </LastUpdated>
                      </Application>
                    </Link>
                  );
                })}
              </ApplicationList>
            )}
          </ApplicationsContent>
        </ApplicationsContainer>
      );
    } else return null
  }
}

const Application = styled.div`
  width: 100%;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  border-color: ${props => props.color};
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  position: relative;
  padding: 1em;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const ApplicationStatus = styled.span`
  display: flex;
  width: 100%;
`;

const JobStatus = styled.p`
  font-size: 14px;
  color: #666;
`;

const Title = styled.h3`
  font-size: 14px;
  width: 100%;
  padding: 10px 0 0;
  color: #666;
`;

const LastUpdated = styled.p`
  width: 100%;
  font-size: 12px;
  padding: 5px 0;
  color: rgba(0,0,0,0.3);
`;

const StatusCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 10px;
`;

const SeeAllButton = styled.div`
position: absolute;
top: 0;
right: 0;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
color: #6E54A3;
font-size: 14px;
margin: 1.25em;

svg {
  width: 15px;
  fill: #6E54A3;
  height: 15px;
  margin-left: 5px;
}
`;

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
  padding: 2em;

  &:hover {
    background-color: rgba(74, 0, 224, 0.1);
  }

  svg {
    width: 30px;
    margin-bottom: 5px;
    fill: #666;
  }
`;

const ApplicationList = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
`;

const ApplicationsContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;

  .new-application {
    padding: 15px 30px;
    -webkit-appearance: button;
    margin-top: 20px;
    background: #8E2DE2;
    color: white;
    border: none;
    font-size: 14px;
    border-radius: 5px;
    transition: 0.3s linear;
    cursor: pointer;
    box-shadow: 2px 4px 8px rgba(0,0,0,0.2);
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
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  position: relative;
  min-height: 300px;
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
