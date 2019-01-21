import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import moment from "moment";

const Activity = ({ calls, application, interviews, offers, remove }) => {

   var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0
   });
   let activity = [...calls, ...interviews, ...offers];
   activity.forEach(a => {
      if (a.hasOwnProperty("salary")) {
         a.type = "offer";
      } else if (a.hasOwnProperty("participants")) {
         a.type = "call";
      } else a.type = "interview";
   });
   activity.sort(function(a, b) {
      if (a.updated_at > b.updated_at) return -1;
      if (a.updated_at < b.updated_at) return 1;
      return 0;
   });
   console.log(activity);
   return (
      <ActivityContainer>
         <SectionTitle>Activity for {application.company_name}</SectionTitle>
         {activity.length > 0 ? 
            
         
         <ActivityList>
            {activity.map(a => {
               if (a.type === "offer") {
                  return (
                     <ListItem key={a.id + Math.random()} type={a.type}>
                        <EventIcon type={a.type}>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 192 512"
                           >
                              <path d="M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z" />
                           </svg>
                        </EventIcon>
                        <CreatedAt>
                           {moment(a.created_at).format("l")}
                        </CreatedAt>
                        <Delete onClick={() => remove('offer', a.id)}>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                           >
                              <path d="M381.6 80l-34-56.7C338.9 8.8 323.3 0 306.4 0H205.6c-16.9 0-32.5 8.8-41.2 23.3l-34 56.7H40c-13.3 0-24 10.7-24 24v12c0 6.6 5.4 12 12 12h16.4L76 468.4c2.3 24.7 23 43.6 47.8 43.6h264.5c24.8 0 45.5-18.9 47.8-43.6L467.6 128H484c6.6 0 12-5.4 12-12v-12c0-13.3-10.7-24-24-24h-90.4zm-176-32h100.8l19.2 32H186.4l19.2-32zm182.6 416H123.8L92.6 128h326.7l-31.1 336z" />
                           </svg>
                        </Delete>
                        <AdditionalInfo>
                           <Type>Offer recieved</Type>
                           <Salary>
                              Salary Offered: {formatter.format(a.salary)}
                           </Salary>
                           <Salary>
                              Accepted: {a.accepted ? "Yes" : "No"}
                           </Salary>
                           <Notes>{a.notes}</Notes>
                        </AdditionalInfo>
                     </ListItem>
                  );
               } else if (a.type === "interview") {
                  return (
                     <ListItem key={a.id + Math.random()} type={a.type}>
                        <EventIcon type={a.type}>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                           >
                              <path d="M128 480h256V80c0-26.5-21.5-48-48-48H176c-26.5 0-48 21.5-48 48v400zm64-384h128v32H192V96zm320 80v256c0 26.5-21.5 48-48 48h-48V128h48c26.5 0 48 21.5 48 48zM96 480H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48h48v352z" />
                           </svg>
                        </EventIcon>
                        <CreatedAt>
                           {moment(a.created_at).format("l")}
                        </CreatedAt>
                        <Delete onClick={() => remove('interview', a.id)}>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                           >
                              <path d="M381.6 80l-34-56.7C338.9 8.8 323.3 0 306.4 0H205.6c-16.9 0-32.5 8.8-41.2 23.3l-34 56.7H40c-13.3 0-24 10.7-24 24v12c0 6.6 5.4 12 12 12h16.4L76 468.4c2.3 24.7 23 43.6 47.8 43.6h264.5c24.8 0 45.5-18.9 47.8-43.6L467.6 128H484c6.6 0 12-5.4 12-12v-12c0-13.3-10.7-24-24-24h-90.4zm-176-32h100.8l19.2 32H186.4l19.2-32zm182.6 416H123.8L92.6 128h326.7l-31.1 336z" />
                           </svg>
                        </Delete>
                        <AdditionalInfo>
                           <Type>Interview scheduled</Type>
                           <Date>Date: {moment(a.date).format("LL")}</Date>
                           <Notes>{a.notes}</Notes>
                        </AdditionalInfo>
                     </ListItem>
                  );
               } else {
                  return (
                     <ListItem key={a.id + Math.random()} type={a.type}>
                        <EventIcon type={a.type}>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                           >
                              <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z" />
                           </svg>
                        </EventIcon>
                        <CreatedAt>
                           {moment(a.created_at).format("l")}
                        </CreatedAt>
                        <Delete onClick={() => remove('call', a.id)}>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                           >
                              <path d="M381.6 80l-34-56.7C338.9 8.8 323.3 0 306.4 0H205.6c-16.9 0-32.5 8.8-41.2 23.3l-34 56.7H40c-13.3 0-24 10.7-24 24v12c0 6.6 5.4 12 12 12h16.4L76 468.4c2.3 24.7 23 43.6 47.8 43.6h264.5c24.8 0 45.5-18.9 47.8-43.6L467.6 128H484c6.6 0 12-5.4 12-12v-12c0-13.3-10.7-24-24-24h-90.4zm-176-32h100.8l19.2 32H186.4l19.2-32zm182.6 416H123.8L92.6 128h326.7l-31.1 336z" />
                           </svg>
                        </Delete>
                        <AdditionalInfo>
                           <Type>Phone call scheduled</Type>
                           <Date>Date: {moment(a.date).format("LL")}</Date>
                           <Participants>
                              Participants: {a.participants}
                           </Participants>
                           <Notes>{a.notes}</Notes>
                        </AdditionalInfo>
                     </ListItem>
                  );
               }
            })}
         </ActivityList>
         : <NoResults>Add Interviews, Phone Calls, or Offers to display events here.</NoResults>}
      </ActivityContainer>
   );
};

const NoResults = styled.div`
   min-height: 100px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   text-align: center;
   width: 100%;
   font-size: 14px;
   color: #666;
`;

const ActivityContainer = styled.div`
   padding: 1.25em;
   border-radius: 5px;
   width: 100%;
   background-color: white;
   box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.13);
   position: relative;
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: flex-start;
`;

const SectionTitle = styled.h3`
   font-weight: lighter;
   font-family: "Open Sans", sans-serif;
   color: #666;
   width: 100%;
`;

const ActivityList = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr;
   grid-gap: 1em;
   width: 100%;
   margin-top: 1em;
`;

const ListItem = styled.div`
   background-color: rgba(0, 0, 0, 0.01);
   padding: 1em;
   display: flex;
   flex-direction: row;
   align-items: flex-start;
   justify-content: flex-start;
   border-radius: 5px;
   position: relative;
   border: 2px solid;
   border-color: ${props => {
      if (props.type === "call") {
         return "rgba(9, 132, 227, 0.2)";
      } else if (props.type === "offer") {
         return "rgba(0, 184, 148, 0.2)";
      } else return "rgba(108, 92, 231, 0.2)";
   }};
`;

const EventIcon = styled.div`
   padding: 1em;
   border-radius: 5px;
   fill: ${props => {
      if (props.type === "call") {
         return "rgba(9, 132, 227, 1)";
      } else if (props.type === "offer") {
         return "rgba(0, 184, 148, 1)";
      } else return "rgba(108, 92, 231, 1)";
   }};
   background-color: rgba(0, 0, 0, 0.03);
   svg {
      width: 30px;
      height: 30px;
   }
`;

const CreatedAt = styled.p`
   position: absolute;
   top: 0;
   right: 0;
   font-size: 12px;
   padding: 1em;
   color: #b2bec3;
`;

const AdditionalInfo = styled.div`
   display: block;
   width: 100%;
   padding: 0 1em;
`;

const Type = styled.h4`
   color: #666;
`;

const Notes = styled.p`
   font-size: 14px;
   color: #666;
   margin-top: 5px;
`;

const Salary = styled.p`
   font-size: 14px;
   color: #666;
`;

const Date = styled.p`
   font-size: 14px;
`;

const Participants = styled.p`
   font-size: 14px;
`;

const Delete = styled.div`
   position: absolute;
   bottom: 0;
   right: 0;
   margin: 10px;
   fill: #ccc;
   cursor: pointer;
   transition: 0.4s;
   svg {
      width: 15px;
      height: 15px;
   }
   &:hover {
      fill: red;
   }
`;

export default connect()(Activity);
