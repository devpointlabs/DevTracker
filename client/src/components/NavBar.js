import React from 'react';
import {AuthConsumer} from '../providers/AuthProvider';
import {Link, withRouter} from 'react-router-dom';
import styled from 'styled-components';
// import MainLogo from '../assets/main_logo.png';
// import UserLogo from '../assets/user_logo.png';

const NavBar = ({auth: {user, handleLogout, }, history}) => {
    return (
        <>
            <Navigation>
                <Container>
                        {/* <Link to ="/"><img src = {MainLogo} alt="site-logo" /></Link> */}
                      <RightItems>
                        {user ? 
                            <>
                                <button onClick={() => handleLogout(history)} className="logout">Logout</button>    
                            </>     
                        :
                            <>
                                <Link to="/login"><button className="login">Login</button></Link>
                                <Link to="/register"><button className="register">Register</button></Link>
                            </>
                        }
                    </RightItems>
                </Container>
               
            </Navigation>
            
        </>
        
    )
}

export class ConnectedNavBar extends React.Component {
    render() {
        return(
            <AuthConsumer>
                {auth => <NavBar {...this.props} auth={auth} />}
            </AuthConsumer>
        )
    }
}

export default withRouter(ConnectedNavBar);

const Navigation = styled.div`
    width: 100%;
    padding: 20px;
    position: fixed;
    top: 0;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    background-color: white;
    z-index: 999;
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const RightItems = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .profile-image {
        max-width: 35px;
        border-radius: 50%;
        margin-right: 25px;
    }
    .login, .register {
        -webkit-appearance: button;
        padding: 10px 15px;
        height: 35px;
        background-color: #E02038;
        cursor: pointer;
        border: none;
        color: white;
        border-radius: 5px;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &:hover {
            background-color: #e74b5e;
        }
        &:first-child {
            margin-right: 15px;
            padding: 0 20px;
        }
    }
    .logout, .upload {
        -webkit-appearance: button;
        padding: 10px 15px;
        height: 35px;
        background-color: #E02038;
        cursor: pointer;
        border: none;
        color: white;
        border-radius: 5px;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &:hover {
            background-color: #e74b5e;
        }
        &:first-child {
            margin-right: 15px;
            padding: 0 20px;
        }
    }
`;