import React from "react";
import styled from "styled-components";
import { AuthConsumer } from "../../providers/AuthProvider";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
// unstonishing
// susano (sause-e-no)

class RegisterForm extends React.Component {
  state = {
    email: "",
    password: "",
    passwordConfirmation: "",
    matching: false,
    error: false,
    errorMessage: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      auth: { handleRegister },
      history
    } = this.props;
    handleRegister({ ...this.state }, history, this.handleError);
  };

  handleError = error => {
    console.log(error.response)
    let errors = error.response.data.errors.full_messages[0];
    if (errors) {
      this.setState({
        error: true,
        errorMessage: errors
      });
    }
  };

  checkPasswords = () => {
    const { password, passwordConfirmation } = this.state;
    if (password !== passwordConfirmation && password.length > 0) {
      this.setState({
        matching: false
      });
    } else if (password === passwordConfirmation && password.length > 0) {
      this.setState({
        matching: true
      });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.checkPasswords();
    });
  };

  render() {
    const {
      email,
      password,
      passwordConfirmation,
      matching,
      errorMessage,
      error
    } = this.state;
    let matching_errors;
    if (password.length > 0 && matching === false) {
      matching_errors = true;
    } else if (password.length === 0 && matching === true) {
      matching_errors = true;
    }
    let length_errors;
    if (password.length < 8) {
      length_errors = true;
    }

    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <h1>Sign Up</h1>
          {error ? (
            <Errors>
              <p className="error-message">{errorMessage}</p>
            </Errors>
          ) : null}
          <label>* Email</label>
          <input
            name="email"
            type="email"
            className="field-input"
            onChange={this.handleChange}
            value={email}
            required
            autoFocus
            autoComplete="email"
          />
          <PasswordContainer>
            <div>
              <label>* Password</label>
              <input
                type="password"
                name="password"
                className="password"
                value={password}
                onChange={this.handleChange}
                required
                autoComplete="password"
              />
            </div>
            <div>
              <label>* Password Confirmation</label>
              <input
                type="password"
                name="passwordConfirmation"
                className="password"
                value={passwordConfirmation}
                autoComplete="password"
                onChange={this.handleChange}
                required
              />
            </div>
          </PasswordContainer>
          <input type="submit" value="SIGN UP" className="submit" />
        </Form>
        <TaskList>
          <Task>
            {matching_errors ? (
              <div className="match-errors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z" />
                </svg>
                <p className="match-errors-message">Password must match</p>
              </div>
            ) : (
              <div className="no-match-errors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z" />
                </svg>
                <p className="no-match-errors-message">Password must match</p>
              </div>
            )}
            {length_errors ? (
              <div className="match-errors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z" />
                </svg>
                <p className="match-errors-message">
                  Password must be atleast 8 characters long.
                </p>
              </div>
            ) : (
              <div className="no-match-errors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z" />
                </svg>
                <p className="no-match-errors-message">
                  Password must be atleast 8 characters long.
                </p>
              </div>
            )}
          </Task>
        </TaskList>
        <p>
          Already have an account? <Link to="/login">Sign in!</Link>
        </p>
      </>
    );
  }
}

const Errors = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #e51c23;
  padding: 15px 0;
  color: white;
  width: 100%;
  border-radius: 5px;
  margin-top: 25px;

  .error-message {
    color: white;
    margin: 0;
  }
`;

const TaskList = styled.ul`
  list-style: none;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Task = styled.li`
  .match-errors {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    &:last-child {
      margin-top: 10px;
    }
    .match-errors-message {
      margin: 0 0 0 10px;
      color: #ccc;
    }
    svg {
      width: 25px;
      height: 25px;
      fill: #ccc;
    }
  }
  .no-match-errors {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    &:last-child {
      margin-top: 10px;
    }
    .no-match-errors-message {
      margin: 0 0 0 10px;
      color: #666;
    }
    svg {
      width: 25px;
      height: 25px;
      fill: green;
    }
  }
`;

const PasswordContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 25px;

  div:first-child {
    padding-right: 10px;
    width: 50%;
  }
  div:last-child {
    padding-left: 10px;
    width: 50%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  width: 400px;
  color: #666;

  .password-needed {
    color: red;
    margin-top: 5px;
  }

  label {
    font-size: 14px;
    margin-top: 25px;
  }

  .submit {
    margin: 25px 0;
    width: 100%;
    padding: 20px 0;
    border-radius: 5px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    -webkit-appearance: button;
    border: none;
    outline: none;
    cursor: pointer;
    color: white;
    background: #8e2de2;
    font-size: 14px;
  }

  .field-input {
    width: 100%;
    border: none;
    font-size: 18px;
    color: #666;
    outline: none;
    border-bottom: 1px solid #ccc;
    padding: 10px;
  }
  .password {
    width: 100%;
    border: none;
    color: #666;
    font-size: 18px;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    outline: none;
  }
`;

class ConnectedRegisterForm extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <RegisterForm {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default withRouter(ConnectedRegisterForm);
