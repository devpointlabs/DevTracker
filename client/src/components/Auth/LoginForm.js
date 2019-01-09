import React from "react";
import styled from 'styled-components';
import { AuthConsumer } from "../../providers/AuthProvider";


class LoginForm extends React.Component {
  state = { email: "", password: "" };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.auth.handleLogin({ email, password }, this.props.history);
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state; 
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Sign in</h1>
        <label for="email">Email</label>
        <input
          name="email"
          className="field-input"
          onChange={this.handleChange}
          value={email}
          required
          autoFocus
        />
        <label for="password">Password</label>
        <input
          name="password"
          className="field-input"
          value={password}
          onChange={this.handleChange}
          required
        />
        <input type="submit" value="LOGIN" className="submit" />
      </Form>
    );
  }
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  width: 400px;

  label {
    font-size: 14px;
    margin-bottom: 10px;
    margin-top: 25px;
  }

  .submit {
    margin-top: 25px;
    width: 100%;
    padding: 20px 0;
    border-radius: 5px;
    box-shadow: 2px 4px 8px rgba(0,0,0,0.2);
    -webkit-appearance: button;
    border: none;
    outline: none;
    color: white;
    background: #8E2DE2;
    font-size: 14px;
  }

  .field-input {
    width: 100%;
    border: none;
    font-size: 18px;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    outline: none;
  }
`;

export default class ConnectedLoginForm extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <LoginForm {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}
