import React from "react";
import styled from "styled-components";

class JobApplications extends React.Component {
  state = {
    applications: []
  };

  render() {
    return (
      <ApplicationsContainer>
        <SectionTitle>Job Applications</SectionTitle>
        <ApplicationsContent>
          {this.state.applications.length === 0 ? (
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
              <button className="new-application">New Application</button>
            </>
          ) : null}
        </ApplicationsContent>
      </ApplicationsContainer>
    );
  }
}

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
    box-shadow: 3px 3px 5px rgba(0,0,0,0.2);
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

export default JobApplications;
