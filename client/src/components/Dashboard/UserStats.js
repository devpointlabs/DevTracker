import React from "react";
import styled from "styled-components";
import CountUp from 'react-countup';

const UserStats = ({ stats: { applications, interviews, offers } }) => (
   
   <StatsContainer>
      <Stat>
         <Title>Applications</Title>
         <Count>{applications !== undefined ? <CountUp end={applications} duration={2}/>: null}</Count>
      </Stat>
      <Stat>
         <Title>Interviews</Title>
         <Count>{interviews !== undefined ? <CountUp end={interviews} duration={2}/>: null}</Count>
      </Stat>
      <Stat>
         <Title>Offers</Title>
         <Count>{offers !== undefined ? <CountUp end={offers} duration={2}/>: null}</Count>
      </Stat>
   </StatsContainer>
);

const Count = styled.h1`
   padding-top: 10px;
   font-family: "Open Sans", sans-serif;
   font-size: 40px;
   line-height: 1;
   padding: 20px 0;
   color: #666;
`;

const Title = styled.h2`
   text-align: center;
   font-size: 16px;
   font-weight: lighter;
   color: #666;
   width: 100%;
   padding: 10px 0;
   border-top-left-radius: 2px;
   border-top-right-radius: 2px;
   background-color: rgba(0,0,0,0.03);
`;

const Stat = styled.div`
   background-color: white;
   box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
   border-radius: 5px;
   text-align: center;
   &:first-child {
      border: 3px solid rgba(74, 0, 224, 0.2);;
   }
   &:nth-child(2) {
      border: 3px solid rgba(42, 121, 218, 0.2);
   }
   &:nth-child(3) {
      border: 3px solid rgba(75, 206, 85, 0.2);
   }
`;

const StatsContainer = styled.div`
   /* padding: 1.25em; */
   /* background-color: white; */
   /* border-radius: 5px; */
   position: relative;
   /* min-height: 300px; */
   display: grid;
   grid-template-columns: 1fr 1fr 1fr;
   grid-gap: 1em;
   @media(max-width: 1200px) {
      margin: 1em 0;
   }
`;

export default UserStats;
