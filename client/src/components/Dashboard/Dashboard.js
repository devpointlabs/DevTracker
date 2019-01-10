import React from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';

const Dashboard = () => (
    <DashboardContainer>
        <NavBar />
    </DashboardContainer>
)

const DashboardContainer = styled.div`
    height: 100%;   
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #dadee838;
`;


export default Dashboard;