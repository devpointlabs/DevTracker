import React from "react";
import styled from "styled-components";
import ParticlesContainer from './ParticlesContainer';
import RegisterForm from './RegisterForm';

const Register = () => (
  <Container>
    <RegisterContainer>
      <RegisterForm />
    </RegisterContainer>
    <LogoContainer>
      <ParticlesContainer />
      <h1>DevTracker</h1>
    </LogoContainer>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
`;

const RegisterContainer = styled.div`
  width: 50%;
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  h1 {
    font-weight: lighter;
    color: black;
  }

  p {
    color: rgba(0, 0, 0, 0.8);
    font-size: 14px;
    margin-top: 25px;
  }
`;

const LogoContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #8e2de2, #4a00e0);
  position: relative;

  h1 {
    color: white;
    letter-spacing: 2px;
  }
`;



export default Register;
// import { AuthConsumer, } from "../../providers/AuthProvider";
// import styled from 'styled-components'

// class Register extends React.Component {
//   state = { email: '', password: '', passwordConfirmation: '', };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const { email, password, passwordConfirmation } = this.state;
//     const { auth: { handleRegister, }, history, } = this.props;

//     if (password === passwordConfirmation)
//       handleRegister({ email, password, passwordConfirmation, }, history);
//     else
//       alert('Passwords Do Not Match!')
//   }

//   handleChange = (e) => {
//     const { name, value, } = e.target;
//     this.setState({ [name]: value, });
//   }

//   render() {
//     const {email, password, passwordConfirmation } = this.state;
//         return(
//             <Container>
//                 <Form onSubmit={this.handleSubmit}>
//                     <input
//                         className ="email"
//                         type = "email"
//                         required
//                         placeholder = "Email"
//                         autoComplete = "email"
//                         name="email"
//                         value={email}
//                         onChange={this.handleChange}
//                     />
//                     <input
//                         className = "password"
//                         type = "password"
//                         required
//                         placeholder = "Password"
//                         autoComplete = "password"
//                         name="password"
//                         value={password}
//                         onChange={this.handleChange}
//                     />
//                     <input
//                         className = "passwordConfirm"
//                         type = "password"
//                         required
//                         placeholder = "Password Confirmation"
//                         name="passwordConfirmation"
//                         value={passwordConfirmation}
//                         onChange={this.handleChange}
//                     />
//                     <input
//                         className="login"
//                         type="submit"
//                         value="Sign Up"
//                     />
//                 </Form>
//             </Container>
//         )
//     }
// }

// export default class ConnectedRegister extends React.Component {
//   render() {
//     return (
//       <AuthConsumer>
//         { auth => <Register { ...this.props } auth={auth} /> }
//       </AuthConsumer>
//     )
//   }
// }

// const Container = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     height: 100%;
//     min-height: 100vh;
//     width: 100%;
// `;

// const Form = styled.form`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     .nickName, .email, .password, .passwordConfirm {
//         width: 600px;
//         padding: 20px;
//         margin: 5px 0;
//         font-size: 18px;
//         border: none;
//         background-color: #FFF;
//         border-radius: 5px;
//             &::placeholder {
//             color: #a4b0be;
//     }
//         @media (max-width: 425px) {
//             width: 100%;
//         }
//     }
//     .login {
//         -webkit-appearance: button;
//         margin-top: 5px;
//         width: 100%;
//         padding: 10px 15px;
//         height: 60px;
//         background-color: #E02038;
//         cursor: pointer;
//         border: none;
//         color: white;
//         border-radius: 5px;
//         font-size: 16px;
//         display: flex;
//         flex-direction: column;
//         justify-content: center;
//         align-items: center;
//         &:hover {
//             background-color: #e74b5e;
//         }
//         &:first-child {
//             margin-right: 15px;
//             padding: 0 20px;
//         }
//     }
// `;
