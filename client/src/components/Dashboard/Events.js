import React from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import {Link} from 'react-router-dom';

class Events extends React.Component {
   state = {
      data: []
   };

   componentDidMount() {
      let { user } = this.props;
      axios
         .get(`/api/user/${user.id}/events`)
         .then(res => this.setState({ data: res.data }));
   }

   render() {
      let { data } = this.state;
      data.forEach(e => {
         if (e.hasOwnProperty("interview_date")) {
            e.type = "interview";
         } else if (e.hasOwnProperty("call_id")) {
            e.type = "call";
         }
      });
      data.sort(function(a, b) {
         if (a.date < b.date) return -1;
         if (a.date > b.date) return 1;
         return 0;
      });
      data = data.filter(d => {
         let currentDate = new Date();
         return new Date(d.date) > currentDate;
      });
      return (
         <EventsContainer>
            <SectionTitle>Upcoming Events</SectionTitle>
            <EventsContent>
               {!data.length > 0 ? (
                  <>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="suitcase"
                     >
                        <path
                           fill="#6E54A3"
                           d="M128 480h256V80c0-26.5-21.5-48-48-48H176c-26.5 0-48 21.5-48 48v400zm64-384h128v32H192V96zm320 80v256c0 26.5-21.5 48-48 48h-48V128h48c26.5 0 48 21.5 48 48zM96 480H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48h48v352z"
                        />
                     </svg>
                     <p className="no-events">You have no upcoming events</p>
                     <p className="event-description">
                        You'll see your upcoming events here as you log phone
                        calls and interviews.
                     </p>
                  </>
               ) : (
                  <Table>
                     <thead>
                        <tr>
                           <th>Date</th>
                           <th>Type</th>
                           <th>Company</th>
                           <th>View</th>
                        </tr>
                     </thead>
                     <tbody>
                        {data.map((e, index) => {
                           if (e.type === "call") {
                              return (
                                 <tr key={index}>
                                    <td>
                                       {moment(e.date).format(
                                          "ddd, MMM Do YYYY"
                                       )}
                                    </td>
                                    <td>Phone Call</td>
                                    <td>{e.company_name}</td>
                                    <td>
                                      <Link to={`/applications/${e.application_id}`}>
                                        <GoButton>Go</GoButton>
                                      </Link>
                                    </td>
                                 </tr>
                              );
                           } else {
                              return (
                                 <tr key={index}>
                                    <td>
                                       {moment(e.date).format(
                                          "ddd, MMM Do YYYY"
                                       )}
                                    </td>
                                    <td>Interview</td>
                                    <td>{e.company_name}</td>
                                    <td>
                                      <Link to={`/applications/${e.application_id}`}>
                                        <GoButton>Go</GoButton>
                                      </Link>
                                    </td>
                                 </tr>
                              );
                           }
                        })}
                     </tbody>
                  </Table>
               )}
            </EventsContent>
         </EventsContainer>
      );
   }
}

const GoButton = styled.button`
   width: 100%;
   padding: 10px 15px;
   font-size: 14px;
   border-radius: 5px;
   background: linear-gradient(to right, #8e2de2, #8e2de2, #6E54A3);
   color: white;
   cursor: pointer;
   border: none;
   &:hover {
     opacity: 0.8;
   }
`;

const Table = styled.table`
   width: 100%;
   margin-top: 1em;
   border-collapse: separate;
   border-spacing: 0 10px;
   th {
      text-align: left;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 12px;
      padding: 20px;
      background-color: rgba(0,0,0,0.03);
      color: #666;
      &:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      &:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
   }

   tr {
      padding: 25px;
   }
   td {
      font-size: 14px;
      padding: 10px;
      text-align: left;
   }
   tr:nth-child(even) {
     background-color: rgba(0,0,0,0.02);
   }
   tr:first-child {
     background-color: transparent;
   }
`;

const EventsContent = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   min-height: 200px;

   .suitcase {
      width: 100px;
      height: 100px;
   }

   .no-events {
      font-size: 14px;
      font-weight: bold;
      margin-top: 5px;
   }

   .event-description {
      font-size: 12px;
      max-width: 300px;
      margin-top: 10px;
      text-align: center;
   }
`;

const EventsContainer = styled.div`
   padding: 1.25em;
   background-color: white;
   border-radius: 5px;
   box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.13);
`;

const SectionTitle = styled.h3`
   font-weight: lighter;
   font-family: "Open Sans", sans-serif;
   color: #666;
`;

export default Events;
