import React, {Component} from "react";
import styled from "styled-components";
import moment from "moment";

class ApplicationsTable extends Component {
  // state to handle table sorting
  state = {
    company: false,
    title: false,
    status: false,
    city: false,
    state: false,
    applied: false
  }

  sortTable = (column) => {
    if(this.state[column] && this.state.reversed) {
      this.setState({
        [column]: false
      })
    }
    else if(this.state[column]) {
      this.setState({reversed: true})
    } 
    else {
      this.setState({
        company: false,
        title: false,
        status: false,
        city: false,
        state: false,
        applied: false,
        [column]: true,
        reversed: false
      })
    }
    
  }

  render() {
    let {applications, colorPicker, view} = this.props;
    let sortedApplications = applications;
    // console.log(typeof(sortedApplications));
    // let {company, title, status, city, state, applied, reversed} = this.state;
    // if(company && !reversed) {
    //   sortedApplications = sortedApplications.sort((a,b) => a.company_name > b.company_name
    //   })
    //   console.log(sortedApplications);
    // }

    // arr.sort((a, b) =&gt; a - b);
    
    // else if (company && reversed) {
    //   sortedApplications = sortedApplications.sort((a,b) => {
    //     console.log(a,b);
    //     return b.company_name > a.company_name
    //   })
    //   console.log(sortedApplications);
    // } else {
    //   sortedApplications = applications;
    // }

    return(
    <>
      <Table>
        <thead>
          <tr>
            <th className="column-title" onClick={() => this.sortTable('company')}>Company</th>
            <th className="column-title" onClick={() => this.sortTable('title')}>Job Title</th>
            <th className="column-title" onClick={() => this.sortTable('status')}>Status</th>
            <th className="column-title" onClick={() => this.sortTable('city')}>City</th>
            <th className="column-title" onClick={() => this.sortTable('state')}>State</th>
            <th className="column-title" onClick={() => this.sortTable('applied')}>Applied</th>
          </tr>
        </thead>
        <tbody>
          {sortedApplications.map(app => (
            <tr
              key={app.id}
              className="application"
              onClick={() => view(app.id)}
            >
              <td>{app.company_name}</td>
              <td>{app.title}</td>
              <td>
                <span className="status">
                  <StatusCircle color={colorPicker(app.status)} />
                  {app.status}
                </span>
              </td>
              <td>{app.company_city}</td>
              <td>{app.company_state}</td>
              <td>{moment(app.submission_date).fromNow()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
    )
  }
}

const StatusCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 15px;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 50px;
  border-collapse: separate;
  border-spacing: 0 10px;

  .application {
    width: 100%;
    background-color: white;
    cursor: pointer;
    border-radius: 5px;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    td:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    td:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    &:hover {
        background-color: rgba(0,0,0,0.01);
    }
  }

  .column-title {
    background-color: transparent;
    text-transform: uppercase;
    font-size: 12px;
    font-family: "Sarabun", sans-serif;
    padding: 30px;
    text-align: center;
  }

  td {
    padding: 25px;
    font-size: 14px;

    .status {
      display: flex;
      align-items: center;
      text-align: center;
    }
  }
`;

export default ApplicationsTable;
