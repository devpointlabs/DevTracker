import React from "react";
import styled from "styled-components";
import axios from "axios"

// api/users 
class StudentList extends React.Component {
  state = {
    students: []
  }

  componentDidMount() {
    axios.get('/api/studentlist')
      .then(res => {
        this.setState({ students: res.data })
      })

  }
  render() {
    let { students } = this.state;
    if (students) {
      return (
        <>
          <Table>
            <thead>
              <tr>
                <th className="column-title">Image</th>
                <th className="column-title">First Name</th>
                <th className="column-title">Last Name</th>
                <th className="column-title">Cohort</th>
                <th className="column-title">Date of Birth</th>
                <th className="column-title">Employment Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map(u => (
                <tr
                  key={u.id}
                  className="students"
                >
                  <td>{u.image}</td>
                  <td>{u.first_name}</td>
                  <td>{u.cohort}</td>
                  <td>{u.dob}</td>
                  <td>{u.employment_status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      );
    }
  }
}


const Table = styled.table`
    width: 100%;
    margin-top: 25px;
    border-collapse: separate;
    border-spacing: 0 10px;

    .students {
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
            background-color: rgba(0, 0, 0, 0.01);
        }
    }
`;


export default StudentList;