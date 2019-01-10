import React from "react";
import styled from 'styled-components';
import { AuthConsumer } from "../../providers/AuthProvider";
import { withRouter } from "react-router";


class LoginForm extends React.Component {
  state = { email: "", password: "" };

  handleSubmit = e => {
    const {
      auth: { handleLogin },
      history
    } = this.props;
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    handleLogin({ ...this.state }, history);
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
        <label>Email</label>
        <input
          name="email"
          type="email"
          className="field-input"
          onChange={this.handleChange}
          value={email}
          required
          autoFocus
          autoComplete = "email"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="field-input"
          value={password}
          onChange={this.handleChange}
          required
          autoComplete = "password"
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
    cursor: pointer;
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

class ConnectedLoginForm extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <LoginForm {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default withRouter(ConnectedLoginForm);
