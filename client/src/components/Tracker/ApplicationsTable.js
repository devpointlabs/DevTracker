import React from "react";
import styled from "styled-components";
import moment from "moment";

const ApplicationsTable = ({ applications, colorPicker, view }) => (
    <>
        <Table>
            <thead>
                <tr>
                    <th className="column-title">Company</th>
                    <th className="column-title">Job Title</th>
                    <th className="column-title">Status</th>
                    <th className="column-title">City</th>
                    <th className="column-title">State</th>
                    <th className="column-title">Last Updated</th>
                </tr>
            </thead>
            <tbody>
                {applications.map(app => (
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
                        <td>{app.city}</td>
                        <td>{app.state}</td>
                        <td>{moment(app.updated_at).fromNow()}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </>
);

const StatusCircle = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin-right: 15px;
`;

const Table = styled.table`
    width: 100%;
    margin-top: 25px;
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
            background-color: rgba(0, 0, 0, 0.01);
        }
    }

    .column-title {
        background-color: transparent;
        text-transform: uppercase;
        font-size: 12px;
        font-family: "Sarabun", sans-serif;
        padding: 30px;
        border-radius: 5px;
        text-align: left;
    }

    td {
        padding: 35px;
        font-size: 14px;

        .status {
            display: flex;
            align-items: center;
            text-align: center;
        }
    }
`;

export default ApplicationsTable;
