import React from 'react';
import {AuthConsumer} from '../providers/AuthProvider';
import {Link,} from 'react-router-dom';
import styled from 'styled-components';


class Login extends React.Component {
  state = { email: '', password: '' }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, } = this.state;
    this.props.auth.handleLogin({ email, password, }, this.props.history);
  }

  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value, });
  }

  render() {
    const { email, password, } = this.state;

    return (
      <Container>
        <h1 className="signIn">Sign In</h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            className="email"
            type="email"
            required
            placeholder="Email"
            autoComplete="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            className="password"
            type="password"
            required
            placeholder="Password"
            autoComplete="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <input
            className="login"
            type="submit"
            value="Login"
          />
          <Link to="/NoMatch"><h1 className="forgotPassword">Forgot Password?</h1></Link>
        </Form>
      </Container>
    )
  }
}


export default class ConnectedLogin extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Login {...this.props} auth={auth} />}
      </AuthConsumer>
    )
  }
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: 100vh;
    width: 100%;
    padding: 250px;
    .signIn {
        padding: 10px;
        font-size: 16px;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    .forgotPassword {
        font-size: 10px;
        padding: 10px;
    }
    .login {
        -webkit-appearance: button;
        width: 100%;
        padding: 10px 15px;
        height: 25px;
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
    .email, .password {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
`;